import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

export const MAX_CHARS = 3_800;

const execFileAsync = promisify(execFile);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const postsPath = path.join(projectRoot, 'content/posts.json');
const manifestPath = path.join(projectRoot, 'app/generated/audio-manifest.json');
const audioDirectory = path.join(projectRoot, 'public/audio');

function decodeEntities(value) {
  const namedEntities = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi,
    (entity, name) => {
      if (name.startsWith('#x')) {
        return String.fromCodePoint(Number.parseInt(name.slice(2), 16));
      }
      if (name.startsWith('#')) {
        return String.fromCodePoint(Number.parseInt(name.slice(1), 10));
      }
      return namedEntities[name.toLowerCase()] ?? entity;
    },
  );
}

function jsxTagName(element) {
  const opening = ts.isJsxElement(element)
    ? element.openingElement
    : element;
  return opening.tagName.getText();
}

function jsxChildren(node) {
  if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
    return node.children;
  }
  return [];
}

function inlineText(node) {
  if (ts.isJsxText(node)) {
    return node.getText();
  }

  if (ts.isJsxExpression(node)) {
    const expression = node.expression;
    if (
      expression
      && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression))
    ) {
      return expression.text;
    }
    return '';
  }

  if (ts.isJsxElement(node)) {
    const tag = jsxTagName(node);
    if (tag === 'ul' || tag === 'ol') {
      return '';
    }
    return node.children.map(inlineText).join('');
  }

  if (ts.isJsxFragment(node)) {
    return node.children.map(inlineText).join('');
  }

  return '';
}

function cleanBlock(value) {
  return decodeEntities(value)
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?])/g, '$1')
    .trim();
}

function collectBlocks(node, blocks) {
  if (!ts.isJsxElement(node) && !ts.isJsxFragment(node)) {
    return;
  }

  if (ts.isJsxElement(node)) {
    const tag = jsxTagName(node);

    if (['p', 'h1', 'h2', 'h3', 'h4'].includes(tag)) {
      const value = cleanBlock(inlineText(node));
      if (value) blocks.push(value);
      return;
    }

    if (tag === 'ul' || tag === 'ol') {
      for (const child of node.children) {
        if (!ts.isJsxElement(child) || jsxTagName(child) !== 'li') continue;

        const value = cleanBlock(inlineText(child));
        if (value) blocks.push(value);

        for (const nestedChild of child.children) {
          if (
            ts.isJsxElement(nestedChild)
            && ['ul', 'ol'].includes(jsxTagName(nestedChild))
          ) {
            collectBlocks(nestedChild, blocks);
          }
        }
      }
      return;
    }
  }

  for (const child of jsxChildren(node)) {
    collectBlocks(child, blocks);
  }
}

export async function extractArticleBody(sourcePath) {
  const sourceText = await readFile(sourcePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  let narrationArticle;

  function visit(node) {
    if (narrationArticle) return;

    if (ts.isJsxElement(node) && jsxTagName(node) === 'article') {
      const isNarrationSource = node.openingElement.attributes.properties.some(
        (attribute) => (
          ts.isJsxAttribute(attribute)
          && attribute.name.getText(sourceFile) === 'data-narration-source'
        ),
      );

      if (isNarrationSource) {
        narrationArticle = node;
        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert(narrationArticle, `No <article data-narration-source> found in ${sourcePath}`);

  const blocks = [];
  collectBlocks(narrationArticle, blocks);
  assert(blocks.length > 0, `No narratable blocks found in ${sourcePath}`);
  return blocks.join('\n\n');
}

function splitOversizedUnit(unit, maxChars) {
  if (unit.length <= maxChars) return [unit];

  const sentences = unit.split(/(?<=[.!?])\s+/u);
  const pieces = [];
  let current = '';

  function flush() {
    if (current) pieces.push(current);
    current = '';
  }

  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      flush();
      const words = sentence.split(/\s+/u);
      let wordBuffer = '';

      for (const word of words) {
        if (word.length > maxChars) {
          if (wordBuffer) pieces.push(wordBuffer);
          wordBuffer = '';
          for (let index = 0; index < word.length; index += maxChars) {
            pieces.push(word.slice(index, index + maxChars));
          }
          continue;
        }

        const candidate = wordBuffer ? `${wordBuffer} ${word}` : word;
        if (candidate.length > maxChars) {
          pieces.push(wordBuffer);
          wordBuffer = word;
        } else {
          wordBuffer = candidate;
        }
      }

      if (wordBuffer) pieces.push(wordBuffer);
      continue;
    }

    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length > maxChars) {
      flush();
      current = sentence;
    } else {
      current = candidate;
    }
  }

  flush();
  return pieces;
}

export function chunkNarration(text, maxChars = MAX_CHARS) {
  assert(maxChars > 0, 'maxChars must be positive');

  const paragraphs = text
    .split(/\n{2,}/u)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const units = paragraphs.flatMap((paragraph) => splitOversizedUnit(paragraph, maxChars));
  const chunks = [];
  let current = '';

  for (const unit of units) {
    const separator = current ? '\n\n' : '';
    if (current.length + separator.length + unit.length > maxChars) {
      chunks.push(current);
      current = unit;
    } else {
      current += `${separator}${unit}`;
    }
  }

  if (current) chunks.push(current);
  assert(chunks.every((chunk) => chunk.length <= maxChars), 'Chunk exceeds maxChars');
  return chunks;
}

function parseArguments(argv) {
  const arguments_ = { dryRun: false, post: 'all' };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--dry-run') {
      arguments_.dryRun = true;
    } else if (argument === '--post') {
      arguments_.post = argv[index + 1];
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${argument}`);
    }
  }

  return arguments_;
}

async function requestAudio({
  apiKey,
  chunks,
  chunkIndex,
  modelId,
  voiceId,
}) {
  const text = chunks[chunkIndex];
  const url = new URL(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,
  );
  url.searchParams.set('output_format', 'mp3_44100_128');

  const payload = {
    text,
    model_id: modelId,
  };

  if (chunkIndex > 0) {
    payload.previous_text = chunks[chunkIndex - 1].slice(-500);
  }
  if (chunkIndex < chunks.length - 1) {
    payload.next_text = chunks[chunkIndex + 1].slice(0, 500);
  }

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    let response;

    try {
      response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(180_000),
      });
    } catch (error) {
      if (attempt === 4) {
        throw new Error(
          `ElevenLabs request failed after ${attempt} attempts`,
          { cause: error },
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 1_000 * (2 ** (attempt - 1))));
      continue;
    }

    if (response.ok) {
      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('audio')) {
        throw new Error(`ElevenLabs returned unexpected content type: ${contentType}`);
      }

      const audio = Buffer.from(await response.arrayBuffer());
      if (audio.length < 1_000) {
        throw new Error(`ElevenLabs returned an unexpectedly small audio response (${audio.length} bytes)`);
      }
      return audio;
    }

    const responseText = (await response.text()).slice(0, 500);
    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 4) {
      throw new Error(
        `ElevenLabs request failed (${response.status}): ${responseText}`,
      );
    }

    const retryAfter = Number.parseInt(response.headers.get('retry-after') ?? '', 10);
    const delayMs = Number.isFinite(retryAfter)
      ? retryAfter * 1_000
      : 1_000 * (2 ** (attempt - 1));
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error('ElevenLabs request exhausted retries');
}

async function concatenateChunks({ chunkPaths, destination, title }) {
  const concatFile = path.join(path.dirname(chunkPaths[0]), 'chunks.txt');
  const concatContents = chunkPaths
    .map((chunkPath) => `file '${chunkPath.replaceAll("'", "'\\''")}'`)
    .join('\n');
  await writeFile(concatFile, `${concatContents}\n`);

  await execFileAsync('ffmpeg', [
    '-hide_banner',
    '-loglevel', 'error',
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatFile,
    '-map_metadata', '-1',
    '-c:a', 'libmp3lame',
    '-b:a', '128k',
    '-ar', '44100',
    '-metadata', `title=${title}`,
    '-metadata', 'artist=Gareth MacLeod',
    '-id3v2_version', '3',
    destination,
  ]);
}

async function audioDuration(audioPath) {
  const { stdout } = await execFileAsync('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=noprint_wrappers=1:nokey=1',
    audioPath,
  ]);
  const duration = Number.parseFloat(stdout.trim());
  assert(Number.isFinite(duration) && duration > 0, `Invalid duration for ${audioPath}`);
  return Math.round(duration);
}

async function generatePost({ apiKey, modelId, post, voiceId }) {
  const sourcePath = path.join(projectRoot, 'app/blog', post.slug, 'page.tsx');
  const body = await extractArticleBody(sourcePath);
  const narration = `${post.title}.\n\nBy Gareth MacLeod.\n\n${body}`;
  const chunks = chunkNarration(narration);
  const tempDirectory = await mkdtemp(path.join(tmpdir(), `narration-${post.slug}-`));

  try {
    const chunkPaths = [];

    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex += 1) {
      process.stdout.write(
        `Generating ${post.slug}: chunk ${chunkIndex + 1}/${chunks.length}\n`,
      );
      const audio = await requestAudio({
        apiKey,
        chunks,
        chunkIndex,
        modelId,
        voiceId,
      });
      const chunkPath = path.join(
        tempDirectory,
        `${String(chunkIndex).padStart(3, '0')}.mp3`,
      );
      await writeFile(chunkPath, audio);
      chunkPaths.push(chunkPath);
    }

    await mkdir(audioDirectory, { recursive: true });
    const temporaryOutput = path.join(tempDirectory, `${post.slug}.mp3`);
    await concatenateChunks({
      chunkPaths,
      destination: temporaryOutput,
      title: post.title,
    });

    const destination = path.join(audioDirectory, `${post.slug}.mp3`);
    const stagedDestination = path.join(
      audioDirectory,
      `.${post.slug}.${process.pid}.tmp`,
    );
    const audio = await readFile(temporaryOutput);
    const fileStats = await stat(temporaryOutput);
    const durationSeconds = await audioDuration(temporaryOutput);
    try {
      await copyFile(temporaryOutput, stagedDestination);
      await rename(stagedDestination, destination);
    } finally {
      await rm(stagedDestination, { force: true });
    }

    return {
      src: `/audio/${post.slug}.mp3`,
      bytes: fileStats.size,
      durationSeconds,
      generatedAt: new Date().toISOString(),
      model: modelId,
      sha256: createHash('sha256').update(audio).digest('hex'),
    };
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
}

export async function loadPosts() {
  return JSON.parse(await readFile(postsPath, 'utf8'));
}

async function main() {
  const arguments_ = parseArguments(process.argv.slice(2));
  const posts = await loadPosts();
  const selectedPosts = arguments_.post === 'all'
    ? posts
    : posts.filter((post) => post.slug === arguments_.post);

  assert(
    selectedPosts.length > 0,
    `Unknown post "${arguments_.post}". Choose "all" or a slug from content/posts.json.`,
  );

  if (arguments_.dryRun) {
    for (const post of selectedPosts) {
      const body = await extractArticleBody(
        path.join(projectRoot, 'app/blog', post.slug, 'page.tsx'),
      );
      const narration = `${post.title}.\n\nBy Gareth MacLeod.\n\n${body}`;
      const chunks = chunkNarration(narration);
      process.stdout.write(
        `${post.slug}: ${narration.length.toLocaleString()} characters, ${chunks.length} chunks\n`,
      );
    }
    return;
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
  assert(apiKey, 'ELEVENLABS_API_KEY is required');
  assert(voiceId, 'ELEVENLABS_VOICE_ID is required');

  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

  for (const post of selectedPosts) {
    manifest[post.slug] = await generatePost({
      apiKey,
      modelId,
      post,
      voiceId,
    });
  }

  const sortedManifest = Object.fromEntries(
    Object.entries(manifest).sort(([left], [right]) => left.localeCompare(right)),
  );
  const temporaryManifest = `${manifestPath}.tmp`;
  await writeFile(temporaryManifest, `${JSON.stringify(sortedManifest, null, 2)}\n`);
  await rename(temporaryManifest, manifestPath);
}

const isMain = process.argv[1]
  && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  main().catch((error) => {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  });
}
