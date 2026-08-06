// Postbuild: remove the Next.js client runtime from the static export.
//
// Every page on this site is static text with plain <a> links — there are no
// client components, so the ~90KB (gzipped) of hydration JS that `next export`
// attaches does nothing but re-render what the HTML already says. This script
// strips the runtime <script> tags, the RSC payload that feeds them, and the
// now-orphaned chunk files, leaving each page as the plain HTML document it
// actually is. Third-party scripts (the Cloudflare beacon) are left alone.
//
// The one contract this creates: if a client component ("use client") is ever
// added, it will render but not hydrate in production. The check below fails
// the build loudly instead of letting that break silently.

import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'out';

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

// Refuse to strip if any client component exists — hydration would be needed.
const sources = [...walk('app')].filter((p) => /\.(tsx|ts|jsx|js)$/.test(p));
for (const file of sources) {
  if (/^\s*['"]use client['"]/.test(readFileSync(file, 'utf8'))) {
    console.error(
      `strip-js: ${file} is a client component; it needs the runtime this script removes.\n` +
        'Remove it from the build script (package.json) before shipping interactive pages.'
    );
    process.exit(1);
  }
}

let pages = 0;
for (const file of [...walk(OUT)].filter((p) => p.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  const stripped = html
    // External runtime chunks: <script src="/_next/..."> in all variants
    // (async, defer, nomodule polyfills).
    .replace(/<script[^>]*\ssrc="\/_next\/[^"]*"[^>]*><\/script>/g, '')
    // Inline RSC payload: <script>self.__next_f.push(...)</script> et al.
    .replace(/<script>(?:(?!<\/script>)[\s\S])*?__next_f[\s\S]*?<\/script>/g, '')
    // Preload hints for the chunks we just removed.
    .replace(/<link[^>]*\sas="script"[^>]*\/?>/g, '');
  if (stripped !== html) {
    writeFileSync(file, stripped);
    pages += 1;
  }
}

// The chunks are now unreferenced; don't deploy them. The build/ssg manifests
// were only ever loaded by those chunks, so they go too.
rmSync(join(OUT, '_next', 'static', 'chunks'), { recursive: true, force: true });
for (const file of [...walk(join(OUT, '_next'))].filter((p) => p.endsWith('.js'))) {
  rmSync(file);
}

// RSC prefetch payloads (blog/foo.txt, index.txt) exist only for the client
// router. Identified by their flight-data shape so real text files survive.
let payloads = 0;
for (const file of [...walk(OUT)].filter((p) => p.endsWith('.txt'))) {
  if (/^\d+:/.test(readFileSync(file, 'utf8'))) {
    rmSync(file);
    payloads += 1;
  }
}

console.log(`strip-js: cleaned ${pages} pages, removed chunks and ${payloads} RSC payloads`);
