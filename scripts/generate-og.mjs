// Generates the Open Graph card images in public/og/.
//
// Run `npm run og` after adding a post (add its entry to PAGES below first),
// then commit the PNGs. Uses the installed Google Chrome headless; Georgia is
// a system font, so no packages are needed. Cards are drawn at 1200x630 with
// a 2x device scale factor for crisp text.

import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = new URL('../public/og/', import.meta.url).pathname;

const PAGES = [
  {
    slug: 'home',
    title: 'Gareth MacLeod',
    line: 'Founder · Engineer · Waterloo, Ontario',
  },
  {
    slug: 'its-the-money-silly',
    title: 'It’s the money, silly',
    line: 'Gareth MacLeod · November 2025',
  },
  {
    slug: 'i-worked-with-a-man-who-faked-his-own-death',
    title: 'I worked with a man who faked his own death',
    line: 'Gareth MacLeod · June 2024',
  },
  {
    slug: 'how-to-feel-when-your-startup-feels-easy',
    title: 'How to feel when your startup feels easy',
    line: 'Gareth MacLeod · March 2024',
  },
  {
    slug: 'surviving-five-years-in-the-most-dangerous-market',
    title: 'Thriving in the presence of risk — Crypto 2013–17',
    line: 'Gareth MacLeod · August 2019',
  },
];

// The card is a book's title page: title centered on the paper, the site's
// fleuron beneath it, the author and date in italic, and the address as a
// printer's imprint at the foot.
function card({ title, line }) {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; }
  body {
    width: 1200px;
    height: 630px;
    background: #fffdf8;
    color: #1a1a1a;
    font-family: Georgia, 'Times New Roman', Times, serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
  }
  .title {
    font-size: 64px;
    font-weight: normal;
    line-height: 1.25;
    max-width: 980px;
    margin: 0;
    text-wrap: balance;
  }
  .fleuron {
    color: #c0392b;
    font-size: 30px;
    line-height: 1;
    margin: 44px 0;
  }
  .line {
    font-style: italic;
    font-size: 31px;
    margin: 0;
  }
  .imprint {
    position: absolute;
    bottom: 52px;
    left: 0;
    right: 0;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }
</style>
</head>
<body>
  <h1 class="title">${title}</h1>
  <div class="fleuron">&#10086;</div>
  <p class="line">${line}</p>
  <div class="imprint">garethdmm.com</div>
</body>
</html>`;
}

const work = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(OUT_DIR, { recursive: true });

for (const page of PAGES) {
  const htmlPath = join(work, `${page.slug}.html`);
  writeFileSync(htmlPath, card(page));
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=2',
    '--window-size=1200,630',
    `--screenshot=${join(OUT_DIR, `${page.slug}.png`)}`,
    `file://${htmlPath}`,
  ]);
  console.log(`og/${page.slug}.png`);
}

rmSync(work, { recursive: true, force: true });
