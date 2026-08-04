import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  chunkNarration,
  extractArticleBody,
  loadPosts,
  MAX_CHARS,
} from './generate-narration.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('every registered post has extractable narration text', async () => {
  const posts = await loadPosts();
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  assert.equal(posts.length, 4);

  for (const post of posts) {
    const sourcePath = path.join(
      projectRoot,
      'app/blog',
      post.slug,
      'page.tsx',
    );
    const body = await extractArticleBody(sourcePath);

    assert(body.length > 500, `${post.slug} narration is unexpectedly short`);
    assert(!body.includes('<p'), `${post.slug} narration contains JSX`);
    assert(!body.includes('&apos;'), `${post.slug} narration contains HTML entities`);
  }
});

test('narration chunks stay below the API budget and preserve all words', () => {
  const text = Array.from(
    { length: 240 },
    (_, index) => `Paragraph ${index} has a complete thought and enough words to exercise packing.`,
  ).join('\n\n');
  const chunks = chunkNarration(text);

  assert(chunks.length > 1);
  assert(chunks.every((chunk) => chunk.length <= MAX_CHARS));
  assert.deepEqual(
    chunks.join(' ').match(/\S+/gu),
    text.replace(/\s+/gu, ' ').match(/\S+/gu),
  );
});

test('a single oversized paragraph is split on safe text boundaries', () => {
  const text = `${'A careful sentence. '.repeat(400)}Done.`;
  const chunks = chunkNarration(text, 200);

  assert(chunks.length > 1);
  assert(chunks.every((chunk) => chunk.length <= 200));
  assert.equal(chunks.at(-1).endsWith('Done.'), true);
});
