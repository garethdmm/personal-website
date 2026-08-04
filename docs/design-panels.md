# Design panel reports

Two three-agent design panels were run while developing the site's style, each
agent reviewing independently from an assigned lens before the results were
synthesized. Full reports are preserved here verbatim (lightly formatted).

- **Panel 1 (2026-08-01): press-style title typography** — prompted by the owner
  finding the private-press titles "less readable." Outcome: the core package
  (real letterspaced capitals replacing synthesized small caps; roman post
  titles at 1.45rem with italic dates) was implemented on `idea/private-press-titles`.
  Still open: masthead size, centered title block, muted dates.
- **Panel 2 (2026-08-01): the raw 1995 browser-defaults style** — an authenticity,
  device-behavior, and rhetoric audit of the competing style. The 1995 style was
  later archived (branch `idea/browser-defaults`, PR #14) in favor of press, but
  several panel ideas transplant to the chosen direction and remain TODO:
  the RSS feed, the hand-typed "last updated" line, the signed footer, and
  handing dark mode to the browser via `color-scheme`.

---

## Panel 1 — Press title typography

Question: why do the press-style titles feel less readable, and how should they
be fixed without losing the private-press character?

### The press historian

**Assessment.** The titles fail for one root reason, with two accomplices — and it is worth being precise, because the obvious suspects (letterspacing, centering, smallness per se) are not the culprits. ROOT CAUSE: the titles are LIGHTER in color than the text they govern. System Georgia — the versions macOS and Windows actually ship — carries no OpenType smcp table (only the paid Georgia Pro does), so every browser synthesizes `font-variant-caps: small-caps` by scaling the full capitals to roughly 80%, which scales the stroke weight down with them. True small caps are drawn with fuller stems and a wider fit precisely so they match the color of the lowercase; scaled-down capitals are starved. Georgia aggravates this: it was designed for screens with a large x-height and unusually dark, even color, so the pale fake caps sit beside notably sturdy lowercase. On this site the masthead 'Gareth MacLeod' therefore prints grayer than the italic subtitle beneath it, and the running head is a ghost. This is precisely the fault Emery Walker and Cobden-Sanderson founded the Doves Press to eliminate — uneven color on the page. The eye reads dark-vs-light before big-vs-small, so the hierarchy inverts: the furniture outweighs the titles. ACCOMPLICE 1 — no real size step. The h1 at 1.05rem against 1rem body is a 5% difference, below the threshold of intent; it reads as an accident, not understatement. The classical title pages this site wants to echo were quiet in WEIGHT and ornament, never in size: Doves and Ashendene title lines sit a full scale step or more above the text, at text weight. Understatement is not imperceptibility. ACCOMPLICE 2 — italic in the title slot. In the whole classical canon italic is the second voice: subtitles, mottoes, imprint lines. Titles are roman, often capitals. Georgia's italic is also narrower and lighter than its roman, so on a post page the strongest-looking line of the opening is the DATE, set upright below a pale italic title — hierarchy inverted again. What is NOT the problem: the 0.08em letterspacing is the correct instinct (capitals and small caps must always be letterspaced; 'a man who would letterspace lowercase would steal sheep,' but caps demand it) — spacing merely spreads the paleness out once the letterforms are starved. Nor is flush-left inherently wrong; though the page does mix axes — a centered fleuron amid an otherwise flush setting — which is a composure fault, not a readability one. Minor note: line-height 1.4 on headings is a body-text habit; short display lines want 1.2–1.25 with the air placed around them, not inside them.

#### Idea 1: Honest letterspaced capitals in place of synthesized small caps (the Doves solution)

```
/* globals.css — replace the .small-caps rule. System Georgia cannot produce true
   small caps; the browser fakes them by shrinking capitals, starving their stroke
   weight. Set honest full capitals, letterspaced, as the Doves Press titled. */
.small-caps {
  text-transform: uppercase;
  font-variant-caps: normal;        /* kill the synthesis */
  letter-spacing: 0.12em;
  font-variant-numeric: lining-nums; /* an all-caps line takes lining figures */
}

/* Markup (app/page.tsx):
   <h1 className="small-caps mt-0 mb-1 text-[1.2rem]">Gareth MacLeod</h1>
   <h2 className="small-caps mt-0 mb-6 text-base tracking-[0.16em]">Writing</h2>
   Blog running head (app/blog/STAR/page.tsx):
   <Link href="/" className="small-caps no-underline text-[0.8rem] tracking-[0.14em]">Gareth MacLeod</Link>
   — the running head MAY sit below text size: in bookwork it is quiet furniture
   and a slightly lighter line there is correct; the masthead and heads must not be. */
```

**Rationale.** Full capitals at or above text size keep Georgia's true stroke weight — no synthesis, no gray. Letterspaced full capitals ARE the private-press title idiom: Doves and Ashendene title pages are spaced roman capitals at text weight, not small caps. Smaller caps take slightly wider tracking (hence 0.16em on 'Writing'), a classical refinement. The masthead moves to 1.2rem so the name finally outweighs its own subtitle.

**Tradeoffs.** Full caps are marginally slower to read than true small caps for long strings — irrelevant for a name and one-word heads. The line becomes more formal and slightly larger-looking than the current treatment; anyone attached to the delicacy of the fake small caps loses it (but that delicacy was the defect). text-transform leaves source text and screen-reader output unchanged, so no accessibility cost.

#### Idea 2: Roman title at a true classical size step; italic demoted to the date line

```
/* globals.css */
.post-title {
  font-style: normal;      /* roman: the title is the principal voice */
  font-size: 1.45rem;      /* ~26px over 18px text — one classical step (×1.44) */
  line-height: 1.25;       /* display leading, not body leading */
  text-wrap: balance;      /* even two-line titles, e.g. the faked-death post */
  margin: 0 0 0.4rem;
}
.post-date {
  font-style: italic;      /* italic is the second voice: the imprint line */
  margin: 0;
}

/* Markup (each app/blog/STAR/page.tsx):
   <h1 className="post-title mt-0">It's the money, silly</h1>
   <p className="post-date">November 2025</p> */
```

**Rationale.** This restores the canonical title-page relationship: roman title above, italic subordinate line below — Bringhurst's 'second voice' used where the tradition used it. 1.45rem at font-weight normal is still far quieter than any default web h1 (which would be 32–40px bold); the confidence now lives in size-at-quiet-weight, exactly how classical title pages asserted themselves. The tighter 1.25 leading lets a wrapped title read as one unit.

**Tradeoffs.** The most visible change of the set — the owner must accept that a real size step IS the understated tradition, not a violation of it. Existing posts each need the two class edits (four files). `text-wrap: balance` is safe to ship — long supported in all evergreen browsers — and harmless where unsupported.

#### Idea 3: Unite the axes: center the title block over the already-centered fleuron

```
/* globals.css */
.title-block { text-align: center; }
.title-block .small-caps {
  /* letter-spacing adds a space AFTER the last letter, shoving a tracked line
     left of true center; compensate: */
  margin-right: -0.12em;
}

/* Markup (each app/blog/STAR/page.tsx):
   <header className="title-block mb-14">
     <Link href="/" className="small-caps no-underline text-[0.8rem] tracking-[0.14em]">Gareth MacLeod</Link>
   </header>
   <main>
     <div className="title-block">
       <h1 className="post-title mt-0">It's the money, silly</h1>
       <p className="post-date">November 2025</p>
     </div>
     <div className="fleuron" aria-hidden="true">❦</div>
     ...text stays flush-left...
   </main> */
```

**Rationale.** Today the fleuron centers while everything around it sets flush — two axes on one page, which is why the opening feels vaguely unsettled. Centered title matter over flush text is THE classical book arrangement: running head, title, date, and fleuron form a proper title opening down a single spine, and the fleuron stops looking like a stray ornament and starts looking like a printer's device where it belongs. Costs one wrapper div and two classes per post.

**Tradeoffs.** Centered openings read more formal and old-fashioned — which is the brief, but it is a stronger flavor. I would center only the blog openings, where the fleuron already establishes the axis; the homepage masthead can stay flush-left (a flush masthead over a flush bio is also coherent — the fault is only mixing axes within one composition, and the homepage fleuron sits between two flush blocks where it reads as a section divider, an accepted convention).

#### Idea 4: STRETCH (webfont, clearly outside the system-font constraint): one face with TRUE small caps

```
/* Self-host EB Garamond (SIL OFL) via next/font/local — two files only, roman + italic.
   app/fonts.ts:
     import localFont from 'next/font/local';
     export const garamond = localFont({
       src: [
         { path: './EBGaramond-Regular.woff2', weight: '400', style: 'normal' },
         { path: './EBGaramond-Italic.woff2',  weight: '400', style: 'italic' },
       ],
       display: 'swap',
     });

   globals.css:
     html { font-size: 20px; }  /* Garamond runs small on the em; Georgia's 18px look ≈ 20px here */
     body { font-family: var(--font-garamond), Georgia, serif; }
     .small-caps {
       font-variant-caps: small-caps;  /* now REAL smcp glyphs, full color */
       letter-spacing: 0.06em;         /* true small caps need less added space; they are fitted wider */
     }
*/
```

**Rationale.** EB Garamond is the one webfont that genuinely serves this site's stated inspiration: a revival of the classical book face itself, with true drawn small caps, true oldstyle figures, and the right historical register for a private-press conceit. With real smcp glyphs the original small-caps design intent finally works as imagined — full-color small caps that match the lowercase.

**Tradeoffs.** Violates the project's system-font preference and adds ~120–150KB and a flash-of-fallback on first load; the Georgia fallback has a much larger x-height, so the swap is visible. Every size on the site must be re-tuned because the two faces differ so much in apparent size. Only worth it if the owner decides the small-caps idiom specifically — rather than the spaced-capitals idiom — is essential to the site's identity. Ship ideas 1–3 first; this replaces idea 1 if adopted.

**Recommendation.** Ship ideas 1 and 2 together as one small change — they repair the two distinct failures (starved letterform color from synthesized small caps; inverted roman/italic and size hierarchy) and neither is sufficient alone: bigger pale caps are still pale, and a roman title over a ghost running head still reads unevenly. Then add idea 3 on the blog post openings only, where the centered fleuron has already committed to the axis, so the fix costs one wrapper div per post and completes the classical title-opening. Total change: one rewritten CSS rule, two new CSS rules, and a handful of className edits across five files — no new dependencies, no webfonts, and the page moves closer to the Doves ideal (even color, quiet weight, real hierarchy) rather than away from it. Hold idea 4 in reserve; it is only warranted if, after living with spaced capitals, the owner decides true small caps are essential to the site's identity.

---

### The screen pragmatist

**Assessment.** The synthesized-small-caps claim is CONFIRMED, and the mechanism is worse than "strokes a bit light." I dumped the actual system font: Georgia v5.00 (/System/Library/Fonts/Supplemental/Georgia.ttf, identical family repertoire on Windows) has GSUB features `aalt` and `locl` only — no `smcp`, no `c2sc`. So `font-variant-caps: small-caps` is synthesized in every browser: the engine substitutes UPPERCASE outlines scaled down for the lowercase letters only, at 70% of the element's font-size in Blink and WebKit, 80% in Gecko.

The measured pixel math at the masthead's 1.05rem (18.9px): Georgia's cap stem is 213/2048em = 0.104em. The real initials G and M render at full size — 13.1px cap height, 1.97px stems. The synthesized "aretH/acLeod" letters render at 18.9 × 0.7 = 13.23px — 9.2px cap height, 1.38px stems. That is a 30% stroke-weight discontinuity INSIDE one word. On any 1x display (macOS post-Mojave is grayscale-AA with hinting ignored), a ~2px stem rasterizes near-solid black while a 1.38px stem antialiases to roughly 70% gray — so "Gareth MacLeod" literally mixes black initials with gray shrunken caps. Uniformly light text reads as intentional; mixed-weight text reads as broken, and that mix is the "less readable" feeling. Bonus inconsistency: Firefox's 80% synthesis makes the small caps 14% taller than Chrome/Safari's, so the masthead has different proportions per browser. On Windows, Georgia's famously good TrueType delta-hinting mitigates the grayness (stems snap to pixels) but cannot fix the intra-word weight mismatch, and 13.23px is a fractional ppem the hinting was never tuned for.

letter-spacing: 0.08em is NOT the culprit — tracking caps/small caps 8–12% is correct practice and should stay. It mildly amplifies the problem (more white space between already-gray glyphs lowers overall text blackness, and Safari may round the 1.51px to whole device pixels at 1x), but removing it would make the caps worse, not better.

Font weights: system Georgia has exactly 400 and 700, nothing else. Per CSS font-matching, requesting 500 silently resolves to 400 and 600 resolves to 700 — no browser synthesizes intermediate weights when real faces bracket the request. So the only real levers are regular and bold. (Georgia Pro, which has real smcp and weights 300–900, is an Office cloud font under a different family name — `font-family: Georgia` can never reach it. And `@supports` cannot detect font features, so there is no way to serve small-caps only where genuine. Hoefler Text on macOS has true small caps but has no Windows counterpart. All dead ends.)

The italic post h1 at 1.15rem is a DESIGN problem, not a rendering one. Georgia Italic is a true cut (separate outlines, x-height 1009 vs roman's 986), fully hinted, no synthesis involved — it rasterizes cleanly at 20.7px. The problem is hierarchy: the title is only 15% larger than body text, and italic at near-body size reads as the emphasis convention, not as a title; its slanted, slightly lighter texture gives it less visual authority than the paragraphs below it. The title is optically subordinate to its own body copy.

Minor confirmed no-op: `font-variant-numeric: oldstyle-nums` does nothing on system Georgia (no onum/lnum features — its figures are inherently oldstyle, which is what you want anyway). Harmless; keep it as documentation of intent. One warning: do NOT add `-webkit-font-smoothing: antialiased` while chasing this — it thins strokes further on macOS and would aggravate exactly this complaint.

#### Idea 1: Letterspaced real capitals — the honest replacement for fake small caps (primary fix)

```
/* globals.css — replace the .small-caps rule entirely: */
.caps {
  text-transform: uppercase;
  font-size: 0.78rem;      /* 14px: cap height 9.7px, ~11% above the body's 8.7px x-height — true small-caps proportion */
  letter-spacing: 0.12em;  /* 1.7px; full caps want slightly more air than the current 0.08em */
  font-weight: normal;
}

/* Markup (keep source text mixed-case for screen readers and copy/paste): */
/* app/page.tsx:      <h1 className="caps mt-0 mb-1">Gareth MacLeod</h1>   (drop text-[1.05rem]) */
/*                    <h2 className="caps mt-0 mb-6">Writing</h2>          (drop text-base) */
/* app/blog/*/page.tsx: <Link href="/" className="caps no-underline">Gareth MacLeod</Link> */
```

**Rationale.** The stroke-weight argument, precisely: uppercase at 14px has 1.42px stems — almost identical thickness to the synthesized glyphs (1.38px) — so this is not about making strokes thicker. It is about making them UNIFORM: every glyph in the line gets the same 1.42px stem instead of 1.97px initials against 1.38px shrunken caps. Uniform-and-slightly-light reads as engraved/letterpress restraint (exactly the private-press intent); mixed-weight reads as an error. You also take back control from the browser: one exact size (14px, a ppem Georgia's screen hinting was actually tuned for, so Windows 1x renders it crisp) instead of a hidden 70%-vs-80% multiplier that differs between Chrome and Firefox. Cap height at 14px is 9.7px, sitting just above the body's x-height — the classical small-caps relationship. One unified size for masthead, section head, and running head is the confident private-press move; the masthead's authority comes from position and the italic subtitle, not from a 0.9px size difference nobody perceives.

**Tradeoffs.** You lose the two-tier cap look (tall G and M) — the line becomes even-height capitals, slightly more 'label-like.' The heading is still ~14% lighter in stroke than body text (inherent to any caps-smaller-than-body treatment); on 1x macOS it will read quiet, which matches the brief, but if the owner wants more presence see idea 4. Do NOT try to recreate the two-tier look with manual spans (G<span>ARETH</span> at 0.7em) — that reintroduces the identical stroke mismatch you are fixing.

#### Idea 2: Blog post h1: upright roman at 1.4rem, move the italic to the date line

```
/* app/blog/*/page.tsx — markup change: */
<h1 className="mt-0 mb-1 text-[1.4rem] leading-[1.3]">It's the money, silly</h1>
<p className="m-0 italic">November 2025</p>

/* Or centralize in globals.css instead of per-page utilities: */
main > h1 { font-size: 1.4rem; line-height: 1.3; font-style: normal; }
```

**Rationale.** Georgia Italic renders fine — the fix is hierarchical, not rasterization. Roman at 25.2px (stems ~1.9px, solid black at 1x) gives the title unambiguous authority over 18px body text; this is precisely the Bitter-Lesson/faculty-page register the CLAUDE.md cites. Swapping the italic onto the date preserves the page's one-italic-line rhythm established by the masthead subtitle. line-height 1.3 (down from the global 1.4) is correct at display size and keeps two-line titles tight; even the longest current title ('I worked with a man who faked his own death', ~410px at this size) stays on one line within the 34em measure.

**Tradeoffs.** Loses the demure italic-title conceit. If the owner is attached to it, the acceptable variant is italic at >=1.4rem — Georgia Italic at 25px is genuinely handsome and the size alone repairs the hierarchy; below ~1.35rem italic will always read as emphasis rather than title. Do not keep italic at 1.15rem and just bold it: bold italic Georgia at near-body size reads as shouting inside a paragraph.

#### Idea 3: The faculty-page alternative: plain bold mixed-case masthead, no caps treatment at all

```
/* app/page.tsx: */
<h1 className="mt-0 mb-1 font-bold text-[1.05rem]">Gareth MacLeod</h1>
/* No .small-caps/.caps class, and critically no letter-spacing — tracking bold mixed-case makes it gappy. */
/* Same for the blog running head: <Link href="/" className="font-bold no-underline">Gareth MacLeod</Link> */
/* 'Writing' h2 can stay regular mixed-case at 1rem, or bold to match. */
```

**Rationale.** Georgia Bold is a real drawn cut (cap stem 355/2048em = 3.3px at 18.9px — 67% heavier than regular), superbly hinted, zero synthesis, identical on every platform. This is literally what Sutton-style faculty pages do: bold heading, nothing else. It is the maximum-readability, minimum-cleverness option and it deletes the entire class of caps-rendering problems rather than managing them.

**Tradeoffs.** Abandons the letterpress/private-press flavor entirely — the site becomes plainer and more 'CS department.' Georgia Bold is dark and unsubtle; at 18.9px next to the italic subtitle it can feel loud against 'confident understatement.' Choose this only if the verdict is that the caps conceit itself, not its execution, is the problem.

#### Idea 4: If the caps must hold their color: small bold capitals, color-matched to body text

```
/* globals.css — variant of idea 1 for owners who find 14px regular caps too light: */
.caps {
  text-transform: uppercase;
  font-size: 0.67rem;      /* 12px bold: cap height 8.3px ~= body x-height; stems 2.08px vs body's 1.64-1.87px */
  font-weight: bold;
  letter-spacing: 0.14em;
}
```

**Rationale.** Measured trick: Georgia Bold's cap stem (0.1733em) at 12px yields 2.08px stems — at or slightly above body-text darkness (regular lowercase stems 1.64px, caps 1.87px at 18px). The heading no longer reads lighter than the paragraph at any pixel density; on 1x displays the stems rasterize fully solid. This is the traditional print-masthead formula — small, dark, well-spaced capitals — and is the only Georgia recipe where reduced-size caps match body color, since only 400 and 700 exist and 400 caps below body size are mathematically always lighter.

**Tradeoffs.** 12px is small; on Windows ClearType, bold at 12 ppem gets chunky and the counters of E/R/A tighten. Reads more 'newspaper section head' than 'private press.' The masthead as the page's first element at 12px is a statement of extreme understatement — arguably on-brand, but test it before committing. Don't split the difference at 13px regular-bold mixtures; pick idea 1 or this.

**Recommendation.** Ship idea 1 + idea 2 together — they are one coherent fix touching different headings, and neither works fully without the other. Idea 1 replaces every `.small-caps` use (masthead h1 in /Users/garethmacleod/Documents/code/garethdmmcom-idea-press/app/page.tsx, the Writing h2, and the running-head links in app/blog/*/page.tsx) with real letterspaced capitals at 0.78rem/0.12em — eliminating the intra-word 30% stroke mismatch and the 70%-vs-80% cross-browser lottery, which is the actual source of the 'less readable' complaint. Idea 2 fixes the only other heading on the site, whose problem is hierarchy rather than rasterization: roman 1.4rem title, italic date. Keep the existing 0.08em-style tracking philosophy (bumped to 0.12em for full caps), keep `oldstyle-nums` (a harmless no-op on Georgia), and add nothing else — specifically never `-webkit-font-smoothing: antialiased`. Ideas 3 and 4 are the escape hatches if, after seeing it rendered, the owner decides the caps conceit should be louder (4) or dropped entirely (3); I would not lead with either, because uniform quiet caps plus a confident roman title is exactly the 'nothing to prove' register the project brief asks for.

---

### The reader's advocate

**Assessment.** The page fails at the pre-attentive layer, not the reading layer. A first-time visitor's eyes build a salience map before reading a single word, and that map is made almost entirely of size and stroke-darkness contrast. Here every heading sits within 5-15% of body size at normal weight, so the map is blank: the page presents as one continuous gray column, and the only thing that pops is the vermillion fleuron — the ornament outranks the name. Second, both differentiation channels in use — tracked caps and italic — are "quieter than body" channels in Georgia. Web-served Georgia has no OpenType smcp feature, so `font-variant-caps: small-caps` is synthesized: full capitals scaled to roughly 70-80%, thinning strokes proportionally and bypassing hinting at the target size. The masthead — the owner's name, already set near body size at 1.05rem — therefore renders visibly lighter and slightly fuzzier than the paragraph beneath it. The most important line on the page is the visually weakest text on it; the eye skips "Gareth MacLeod" and lands on "I've been building startups...". Third, the post h1's italic occupies the exact channel the body uses for <em> — and these posts use <em> constantly (verified in its-the-money-silly/page.tsx) — so the title has no unique identity. Italic Georgia is also narrower and optically lighter, and at 1.15rem an italic line sitting above a fleuron scans as an epigraph or citation, not a title. That matters most for visitors arriving from a shared link, where the title is the page's only anchor. Ranked by harm: (1) homepage masthead — the identity function fails outright; (2) blog post h1 — reads as epigraph, shares the emphasis channel; (3) "Writing" h2 — section labels are allowed to be quiet, but synthesis makes it gray rather than deliberate; (4) running head — least harmed, since a small-caps running head is a legitimate book convention and only the synthesis lightness is wrong. Two honest caveats: (a) the oft-cited "all-caps slows word recognition" effect is real for continuous text but second-order for a two-word name — the actual damage here is stroke weight and salience, not Bouma word-shape; (b) the semantic structure (h1/h2) is correct, so screen-reader users currently get better hierarchy than sighted scanners. The failure is purely visual.

#### Idea 1: Title-page scale: size does the work, weight stays normal

```
/* app/globals.css */
h1, h2, h3 { font-weight: normal; line-height: 1.3; margin-top: 2rem; margin-bottom: 0.5rem; }  /* was line-height: 1.4 */

/* app/page.tsx — masthead: drop .small-caps, roman, mixed case */
<h1 className="mt-0 mb-1 text-[1.6rem]">Gareth MacLeod</h1>

/* app/blog/*/page.tsx — post title: drop italic */
<h1 className="mt-0 mb-1 text-[1.5rem]">It's the money, silly</h1>
```

**Rationale.** The private-press tradition never used bold for hierarchy — book title pages are larger roman type with space around it, which is exactly the quiet channel this site permits. 1.6rem (28.8px) against 18px body is a 1.6x ratio: enough for peripheral pop and an instant answer to "whose page is this," still far below the browser-default 2em-bold shout. Mixed case restores word shape and, critically, full stroke weight — the name finally renders as dark as the body instead of lighter. Line-height 1.3 keeps two-line wraps of long titles compact.

**Tradeoffs.** The owner's name becomes the most prominent element on the homepage — which is precisely its job, but may feel immodest to this owner; 1.4rem is the floor at which the hierarchy still functions. Long titles ("I worked with a man who faked his own death") wrap to two lines around 400px viewports — fine at lh 1.3, but preview on mobile.

#### Idea 2: Replace synthesized small caps with true letterspaced capitals (same class, no markup churn)

```
/* app/globals.css — replace the .small-caps rule body */
.small-caps {
  text-transform: uppercase;   /* real cap glyphs, hinted at target size */
  font-size: 0.85em;
  letter-spacing: 0.14em;      /* was 0.08em; true caps want more air */
}
```

**Rationale.** Kills the browser synthesis entirely: synthesis scale factors vary by engine, strokes are thinned by geometric scaling, and outlines are scaled past their hinting. Georgia's real capitals set at 0.85em are darker, crisper, and identical across browsers. The DOM text stays mixed-case (text-transform is presentational), so screen readers are unaffected. This fixes the "Writing" h2 and the blog running head in one edit — both are legitimately quiet caps labels and should stay small; they just shouldn't look faded.

**Tradeoffs.** Typographically these are spaced small capitals faked from full caps, not true small caps — cap-height sits a touch above x-height; purists notice, readers don't. The class must be removed from the masthead when Idea 1 lands (0.85em would shrink the name further). Letter-spacing adds a trailing space after the last glyph, marginally widening the running-head link's hover box — invisible in practice.

#### Idea 3: Demote italic to the metadata layer; the date gets its own voice

```
/* app/globals.css */
.post-date {
  font-size: 0.89rem;
  font-style: italic;
  color: rgba(26, 26, 26, 0.66);  /* ~#686866 on #fffdf8 ≈ 5.5:1 — passes WCAG AA */
}

/* app/blog/*/page.tsx */
<h1 className="mt-0 mb-1 text-[1.5rem]">It's the money, silly</h1>
<p className="post-date m-0">November 2025</p>
```

**Rationale.** Italic currently does three jobs — post titles, the homepage subtitle, and in-text emphasis — and a channel doing three jobs distinguishes nothing. Reserving italic for subordinate text restores its meaning, and shrinking + muting the date makes the title/date pair parse in a single fixation: large roman = what this is, small gray italic = when it was written. This is the standard scholarly/book convention the site is already gesturing at.

**Tradeoffs.** Introduces the site's first gray text — a small step away from pure two-ink austerity. Alpha 0.66 is the safe floor (about 5.5:1 contrast); do not go lighter. The homepage subtitle line should keep full-ink italic — only post metadata needs muting.

#### Idea 4: Fallback masthead if a bigger name is vetoed: full-size spaced capitals

```
/* app/globals.css */
.masthead {
  text-transform: uppercase;
  font-size: 1.05rem;
  letter-spacing: 0.18em;
}

/* app/page.tsx */
<h1 className="masthead mt-0 mb-1">Gareth MacLeod</h1>
```

**Rationale.** Letterspaced full capitals at text size is the historically correct private-press imprint line (Bringhurst: "letterspace all strings of capitals"). Unlike synthesized small caps, full caps at 1.05rem keep Georgia's complete stroke weight — the name reads dark and deliberate instead of gray and shrunken, while staying at body scale.

**Tradeoffs.** Still no size pop: the visitor finds the name by position (first line of the page), not by salience, so this works only because the masthead sits at the very top. All-caps recognition cost becomes real if the string ever grows past a few words. Strictly worse than Idea 1 for scanning; strictly better than the status quo.

**Recommendation.** Ship Ideas 1 + 2 + 3 together — they are one coherent move, not three changes. Masthead at 1.6rem roman mixed-case; post titles at 1.5rem roman with the date muted to small gray italic; and the .small-caps class rewritten as true letterspaced capitals for the "Writing" label and the running head. The result is exactly one salient element per page — the name on the homepage, the title on a post — which is the minimum a scanning reader needs to build a page map, while everything else stays at whisper volume. Net effect is arguably quieter than today, because the headings stop looking accidentally faded and start looking deliberately restrained: the difference between understatement and under-rendering. Hold Idea 4 in reserve only if the owner sees his name at 1.6rem and refuses it.

---

## Panel 2 — The raw 1995 style

Question: audit the browser-defaults pastiche — authenticity of the imitation,
real device behavior in 2026, and on whom the rhetoric lands — and propose
charm-preserving improvements.

### The period historian

**Assessment.** First, credit where due: the link colors are exactly right. #0000EE / #551A8B are the true Mosaic-lineage defaults that Netscape canonized and every modern browser still ships; hardcoding them (necessary because Tailwind preflight strips them) is invisible fidelity of the best kind. And the visited-purple is already functioning as a feature on the homepage essay list — a returning reader can see which essays they have read. That is period utility, not decoration.

Now the tells, ranked by how loudly they betray modern hands.

(1) The centered measure. max-width did not exist in 1995 — CSS1 shipped December 1996 without it, max-width is CSS2 (1998), usable circa 2001+. But the deeper tell is not the cap, it is the CENTERING. 'margin: 0 auto' on an em-capped column is the signature move of the 2010s reading web (Medium, personal blogs). Period documents — Sutton's page included — hug the left margin and reflow to full window width. A centered column says 'designed to look raw'; a left-anchored one says 'raw'.

(2) The asterism. The ⁂ is a print-literary flourish beloved by tasteful modern blogs, and it is literally impossible on a 1995 page: U+2042 is not in Latin-1, and HTML 2.0 numeric character references only covered Latin-1. The 1995 divider was <hr> — every NCSA-guide-following author scattered chiseled rules across their pages; it was arguably the most-used presentational element of the era. The stylesheet even confesses ('The one flourish') inside a comment whose whole thesis is having none.

(3) The missing signature. The canonical 1995 page ended with <hr>, an <address> block with the author's name and a mailto-linked email address, and a hand-typed 'Last modified' date. This came straight from NCSA's 'A Beginner's Guide to HTML' and the CERN style pages, and it is why the <address> element exists. This site has no footer signature at all — essays end mid-air with a lone '← Home' link (the ← arrow, U+2190, is also outside Latin-1). The absence of hr/address/last-modified culture is the largest structural anachronism.

(4) Punctuation and link manners. 'Founder • Engineer • Waterloo, ON' and the ' · ' separators are modern typographic idiom; the period forms were slashes, pipes, and brackets — [ github | linkedin | email ]. target="_blank" as a habit is a 2000s marketing tic; the 1995 navigation model was the Back button. And 'email' as link text is modern coyness — 1995 authors displayed the address itself.

(5) White background. Historically wrong — Mosaic and Netscape (through 4.x) painted #c0c0c0 gray, and setting bgcolor="#FFFFFF" was itself a deliberate designer act of 1995-96. BUT the site's actual model is not 'a page in Netscape', it is 'unstyled HTML rendered by today's browser' (the Sutton model), and today's browser says white. White is defensible as the browser's own decision, and the owner has already litigated backgrounds (ivory, reverted). Leave it.

(6) Hardcoded 'Times New Roman'. In 1995 authors could not specify fonts at all; the page rendered in the reader's configured proportional font. The generic keyword 'serif' hands that decision back to the browser — identical rendering for virtually every desktop visitor, philosophically purer.

Not worth fixing: line-height 1.5 (period was ~1.2 single-spacing; tightening it would be authenticity that punishes the reader), the SVG favicon (anachronistic but invisible utility), overflow-x on pre. And a note in the Georgia wrapper's defense: Georgia was designed by Matthew Carter in 1993 and shipped as a Microsoft core web font in 1996 — the essay-page reading optimization is accidentally period-adjacent to 1996-97, not a betrayal of the frame.

Finally, a distinction the owner should hold onto: there were two 1995s. The Geocities vernacular (badges, counters, 'Best viewed in Netscape', under-construction GIFs) and the academic document web (CERN, NCSA, faculty pages). This site correctly targets the latter. Every proposal below stays inside it.

#### Idea 1: Replace the asterism with the browser-default <hr>

```
In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/globals.css, delete the .asterism block and add the one rule needed to undo Tailwind preflight's hr reset:

hr {
  border: 1px inset;
  margin: 0.5em auto;
}

(Preflight flattens hr to a currentColor top border; 'border: 1px inset; margin: 0.5em auto' restores the UA stylesheet values, giving the classic chiseled gray rule.) Then in app/page.tsx and each app/blog/*/page.tsx, replace <p className="asterism">⁂</p> with <hr />.
```

**Rationale.** The <hr> was the divider of 1995 — ubiquitous, functional, and rendered by the browser without any authorial choice. The ⁂ is a modern literary flourish that was literally unencodable in Latin-1. After this change the stylesheet's comment ('we restore its defaults and stop there') becomes true: zero flourishes remain, every rule is pure preflight-reversal. That is the strongest possible version of the conceit.

**Tradeoffs.** The owner may be attached to the asterism as a personal signature; ⁂ is undeniably prettier than a gray line. But his revert history shows he rewards raw over pretty, and the asterism is the single most modern fingerprint on the page. Fallback if he balks: a centered '* * *' typed as three asterisks, which a 1995 author actually could and did do — still more period than ⁂.

#### Idea 2: The canonical signed footer — <hr> + <address> + hand-typed Last modified

```
In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/blog/layout.tsx:

<footer>
  <hr />
  <address>
    Gareth MacLeod / <a href="mailto:gareth.macleod@gmail.com">gareth.macleod@gmail.com</a>
  </address>
  <p><Link href="/">Back to home</Link></p>
</footer>

Optionally add the same <hr /> + <address> to the bottom of app/page.tsx with a hand-typed 'Last modified: August 2026' line. No CSS needed — <address> renders italic by browser default (preflight does not touch it), which is exactly how these blocks looked in 1995. Dates are typed by hand per page, like the existing date lines; no build machinery.
```

**Rationale.** This is the single most authentic structural addition available: NCSA's Beginner's Guide to HTML told every author to sign pages this way, which is why the convention — and the <address> element itself — exists. It also carries real utility: essays get shared as direct links, and right now a visitor landing on one finds no author identity or contact at the bottom of a several-thousand-word read. For a site whose purpose is 'increase public presence', a name and reachable email at the foot of every essay is not a joke, it is the job. The 'Last modified' line signals freshness on the homepage.

**Tradeoffs.** Hand-typed dates go stale — which is itself period-authentic, but a two-year-old date on the homepage of a man seeking public influence reads as neglect, so only add 'Last modified' where he will actually maintain it (homepage yes, essays optional since they already carry publication dates). Exposing the raw email invites some scraping, but it is already in the mailto href, git history, and this footer merely displays what is public.

#### Idea 3: Left-anchor the column: drop the auto-centering, keep the measure

```
One-line change in /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/globals.css:

body {
  max-width: 37em;
  margin: 0;          /* was: 0 auto */
  padding: 0 1em;
  font-family: 'Times New Roman', Times, serif;
  line-height: 1.5;
}

Identical on mobile and any window under ~40em; on desktop the column hugs the left edge instead of floating centered.
```

**Rationale.** max-width did not exist until CSS2, but the louder tell is the centering — a centered em-capped column is the house style of the 2010s reading web. Period documents, Sutton's page among them, start at the left margin. Keeping max-width is the right invisible compromise (truly authentic full-width lines run 90+ characters on desktop and would be a genuine barrier), but the centering is a visible act of design the browser never performed. Left-anchored, the page reads as 'someone wrote HTML and stopped'; centered, it reads as 'someone styled a page to look like 1995'.

**Tradeoffs.** This is the riskiest proposal. On wide monitors the reader sits off-axis with dead space to the right, and some people find that uncomfortable rather than charming — it can read as 'forgot to center' instead of 'never considered it'. It is a one-line revert, so trial it for a week. If it grates, centered-with-measure is the concession most defensible under the owner's stated readability principle.

#### Idea 4: Small-tells sweep: period punctuation, no target=_blank, generic serif

```
In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/page.tsx: subtitle becomes <p>Founder / Engineer / Waterloo, ON</p>; the links line becomes bracketed-pipe navigation, the deep 1995 idiom: [ <a href="...">github</a> | <a href="...">linkedin</a> | <a href="mailto:...">email</a> ] — literal square brackets and pipes as text. Remove target="_blank" from all anchors (two on the homepage). In app/blog/layout.tsx change '← Home' to 'Back to home' (U+2190 is not Latin-1 either). In globals.css, change font-family to the generic keyword: font-family: serif; — on Windows that resolves to Times New Roman, on macOS/iOS to Times, so rendering is unchanged for essentially every desktop visitor.
```

**Rationale.** Each item is a fingerprint: mid-line bullets and middots are modern typographic idiom (period pages used slashes, pipes, brackets); forced new-window links are a 2000s habit foreign to the Back-button navigation model of 1995 — removing them also hands control back to the reader, which matches the site's philosophy; and in 1995 authors could not name fonts at all, so 'serif' is the closest CSS can come to the truth that the reader's browser chose the face. All free, all invisible-or-better to a desktop visitor.

**Tradeoffs.** The bracketed [ a | b | c ] nav is the one item here with visible flavor — it is authentically academic-1995 but flirts with costume; if the owner finds it too cute, plain slash separation (github / linkedin / email) is quieter and equally period. font-family: serif yields a less polished face on some Linux/Android setups (Noto Serif, Liberation Serif) — acceptable variance, arguably the point, but worth knowing. Losing target="_blank" means the GitHub/LinkedIn links navigate away; in 2026 readers who want a new tab middle-click, as they always have.

**Recommendation.** Ship in this order. First, ideas 1 and 2 together as one change — they are a single cultural unit (the <hr>/signature complex was how a 1995 page ended, and the same hr rule serves both). This is the highest ratio of authenticity gained to risk taken: it deletes the page's most modern fingerprint (the asterism), makes the stylesheet's own manifesto literally true, and adds genuine utility — author identity and contact at the foot of every essay, which serves the site's actual purpose when essays get shared as bare links. Second, the small-tells sweep (idea 4), starting with slash punctuation, target=_blank removal, and 'Back to home'; offer the bracketed-pipe nav and font-family: serif as options rather than defaults. Third, trial the left-anchored column (idea 3) for a week — it is the most historically pointed observation but the most matter-of-taste change, and it is a one-line revert either way.

Explicitly do NOT do: (a) the #c0c0c0 Netscape-gray canvas — it is the most historically accurate single move available and I am telling you not to make it; the site's model is 'unstyled HTML in today's browser', today's browser says white, and the owner already reverted a background experiment — gray would be the aesthetic joke placed squarely between reader and content; (b) tightening line-height toward the period's ~1.2 single-spacing — authenticity that taxes the reader of 4,000-word essays; (c) removing max-width entirely for true full-bleed lines — same reason; (d) anything from the other 1995 — hit counters, 'Best viewed in Netscape' badges, under-construction signs, <blink>, <table>/<font> markup stunts. Those belong to the Geocities vernacular, not the faculty-page tradition this site imitates, and any one of them converts confident understatement into an ironic costume; (e) do not fight the decided Georgia/18px essay wrapper — Carter designed Georgia in 1993 and Microsoft shipped it as a core web font in 1996, so the reading layer is period-adjacent anyway.

---

### The device pragmatist

**Assessment.** What the raw choices actually do in 2026, verified against the real files and built output (/Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/out/index.html):

MOBILE / FONTS. Next.js emits `<meta name="viewport" content="width=device-width, initial-scale=1"/>` automatically (confirmed in the built HTML), and Tailwind preflight sets `-webkit-text-size-adjust: 100%`, so the site does NOT get the 980px-zoomed-out or landscape-inflated fate of a genuinely untouched 1995 page — text renders at true 16 CSS px everywhere. On iOS this is real Times New Roman (Apple ships TNR on iOS, all four styles), crisp at 3x DPR, but visually small: TNR's x-height is roughly 0.45em versus ~0.50–0.52 for Georgia/system UI fonts, so 16px Times reads like ~14px of a modern font. That is precisely the problem the already-decided 18px-Georgia essay layer solves, on the pages where it matters. On Android the conceit quietly breaks: Android ships neither 'Times New Roman' nor 'Times', so the stack falls through to generic `serif`, which Chrome/Android maps to Noto Serif — larger x-height, wider set, distinctly modern. Roughly half of mobile visitors see what looks like a *chosen* contemporary serif, not 1995 Times. There is no fix within the constraints, and philosophically it's fine: "you get whatever your machine has" IS the 1995 contract. Same story on ChromeOS.

MEASURE / DPR. body max-width 37em = 592px at defaults: ~80–85 characters per line in Times on desktop (slightly long by the 66-char ideal, but authentic), and because it's em-based it already scales with the user's browser font-size setting — an accidental virtue worth preserving (see idea 2's warning about px). On a 390px phone the 1em padding governs: ~358px column, ~50 chars/line — fine. At 1x DPR on Windows (still a large desktop share) TNR is one of the most heavily hinted fonts in existence and renders as the exact crisp artifact you're imitating; at 1x on non-retina Mac external monitors it goes grey and spindly — no remedy that isn't a font change, so accept it. 2x/3x is handsome everywhere.

DARK MODE — the biggest real gap. The page declares no color-scheme and sets no background, so dark-OS users on Safari, Firefox, and desktop Chrome get a full-brightness white page (none of these auto-darken by default). Meanwhile Chrome/Android users who enabled "Darken websites" get Chrome's forced-dark filter, which algorithmically mangles your #0000ee/#551a8b into colors you never chose. So today you have an involuntary, lossy dark mode on some Androids and a blinding page everywhere else. Note also the delicious irony that the only dark-mode-aware page on the site is Next's built-in 404 (its inlined styles carry a prefers-color-scheme block). Crucially, the hardcoded link hexes are not "your palette" — #0000EE and #551A8B are literally the UA defaults of Chrome, Firefox, and WebKit, re-imposed only because preflight nuked them with `a { color: inherit }` (confirmed in node_modules). That means handing them BACK to the browser is both pixel-invisible in light mode and more authentic than hardcoding: in 1995 Netscape, link colors were a user preference (Firefox still exposes this in Settings → Colors, and `revert` honors it; your hex codes override it).

TAP TARGETS. line-height 1.5 × 16px = 24px-tall link boxes. The `github · linkedin · email` row and the `← Home` footer sit well under the 44pt (iOS) / 48dp (Android) guidance; real-world miss rates on a sparse row are low but nonzero, and Lighthouse will flag it. An invisible fix exists (idea 3). The essay-list links are long full-line targets; leave them alone — inflating them creates overlapping hit areas between adjacent lines.

PRINT. Nearly free already: serif body, no chrome, browsers strip backgrounds by default, and the 592px column prints as a pleasant book-width block. Only blemishes: the "← Home" footer prints, and links print in blue (dithered grey on mono laser). Browsers force the light scheme when printing, so idea 1 does not break print.

FORCED COLORS & READER MODES. Windows High Contrast overrides everything; a site this close to raw HTML is the best case and needs nothing. Semantic main/h1/p markup means Safari Reader and Firefox Reader extract cleanly — the ultimate hand-control-to-the-reader feature, and how many dark-mode Safari users will self-serve. Don't break it; you currently don't.

One disagreement with the premise: "raw" today is not neutral — the truly raw parts (hardcoded hexes, px font sizes if you ship 18px) actually take control AWAY from readers relative to 1995 browsers, which honored user colors and sizes. The most faithful move available is not to freeze 1995's pixels but to restore 1995's contract: the author supplies structure, the browser and reader supply presentation.

#### Idea 1: Hand colors back to the browser: color-scheme + revert (free, authentic dark mode)

```
In app/globals.css, replace the two link rules:

:root { color-scheme: light dark; }

a {
  color: #0000ee;   /* fallback where `revert` is unknown (Chrome <84, pre-2020) */
  color: revert;    /* hand it back to the UA — and to user-set colors */
  text-decoration: underline;
}
a:visited {
  color: #551a8b;
  color: revert;
}

In app/layout.tsx (Next 14 App Router):

import type { Metadata, Viewport } from 'next';
export const viewport: Viewport = { colorScheme: 'light dark' };

which emits <meta name="color-scheme" content="light dark"> so first paint is already dark for dark users (no white flash before CSS loads).
```

**Rationale.** Mechanics, precisely: `revert` rolls the property back past all author-origin CSS (including preflight's `a { color: inherit }`) to the user-agent/user origin, so links compute to the UA's LinkText/VisitedText — which are color-scheme-aware. In light mode the result is byte-identical to today, because #0000EE/#551A8B ARE the UA light defaults in Chrome, Firefox, and WebKit — that's where these hexes came from. In dark mode: canvas flips to the UA's dark grey (Chromium ~#121212, Firefox #1C1B22, Safari a comparable near-black), body text (never set by you — preflight sets no color) flips to CanvasText white automatically, and links become the UA's dark values (Chromium ≈ light periwinkle #9E9EFF / visited ≈ #D0ADF0; Firefox ≈ #8C8CFF / visited ≈ #FFADFF; Safari a lighter blue). No hex was ever chosen by the author — this cannot fail the 'chosen palette' test because the browser chooses. It also restores the actual 1995 contract: Firefox users who set their own link colors in Settings → Colors now win again. Bonus: declaring dark support opts you out of Chrome/Android's lossy forced-dark filter. Support: color-scheme in Chrome/Edge 81+, Safari 13.1+, Firefox 96+ (Jan 2022); `revert` in Safari 9.1+, Firefox 67+, Chrome 84+. Older browsers ignore color-scheme (stay light) and drop the revert declaration (keep the hex fallback) — fully graceful.

**Tradeoffs.** Dark-preference visitors lose the trademark blue-on-white 1995 tableau (arguably the joke's best frame) — but they were the ones being blinded. White Times hairlines on near-black can sparkle at 1x DPR. UA dark visited-pink (#FFADFF in Firefox) looks odd to some eyes; it is nonetheless the browser's choice, not yours. Exact dark hexes vary per engine, so the site is no longer pixel-identical across browsers in dark mode — which is, again, the 1995 contract. Verify cascade order: these rules must come after @tailwind base in globals.css (they do).

#### Idea 2: Implement the decided essay layer with rem + a serif fallback, not bare 18px Georgia

```
For the blog reading wrapper (however it lands — blog layout or a .essay class):

.essay {
  font-family: Georgia, serif;  /* NOT bare Georgia */
  font-size: 1.125rem;          /* NOT 18px */
  line-height: 1.6;
}

No other changes to the decided spec.
```

**Rationale.** Two precise bugs in the spec as written. (1) Android and ChromeOS do not ship Georgia. A bare `font-family: Georgia` that resolves to nothing falls back to the browser's default 'standard' font — Roboto, a sans-serif — so essays would render sans on Android. Appending `serif` routes the miss to Noto Serif instead: large x-height, an excellent Georgia stand-in, and exactly what those users already see on the homepage. (2) `18px` overrides the reader's browser default-font-size setting (Chrome Settings → Appearance, Firefox Fonts, etc.) — the one accessibility control the current all-defaults site perfectly honors. `1.125rem` is computed against the root font size, which you never set, so it equals exactly 18px for the ~99% of users at defaults — pixel-invisible — while multiplying for a reader who set 20px to 22.5px. The body's 37em max-width scales with the same preference, so the whole page zooms coherently. Side effect worth knowing: at 18px inside a 592px column the essay measure becomes ~33em ≈ 60–65 Georgia characters per line — closer to the classic ideal than the homepage's ~80. The 'fix' accidentally improves the measure too.

**Tradeoffs.** None visible to anyone at default settings, which is the point. `1.125rem` in the source is marginally less self-explanatory than `18px` — add the comment. If the owner ever sets an explicit px size on html/root later, the rem math changes; unlikely given the ethos.

#### Idea 3: Invisible tap-target inflation via inline vertical padding

```
Add to globals.css:

/* Bigger touch targets; vertical padding on inline boxes does not move layout. */
p a { padding-block: 0.5em; }

Optionally, for the homepage contact row's horizontal slack:
p a { padding-inline: 0.25em; margin-inline: -0.25em; }
(horizontal padding DOES occupy space on inline boxes; the negative margin cancels it exactly).
```

**Rationale.** CSS mechanic: on non-replaced inline elements, vertical padding is painted and hit-tested but does not contribute to line-box height — zero layout shift, and since links have no background, zero visual change on any desktop. The github/linkedin/email row and the ← Home footer go from 24px-tall targets (line-height 1.5 × 16px) to ~40px, at the 44pt/48dp guidance boundary. The selector `p a` is deliberate: it catches the contact row, the footer, and in-essay body links (whose inflated hit areas overlap only plain text — harmless) while excluding the Writing list. That exclusion matters: the list's link lines stack in contiguous 24px line boxes, so inflated targets would overlap, and the later-DOM link paints on top and would steal taps from the bottom of the line above it.

**Tradeoffs.** The only observable effect is on touch devices during the tap itself: iOS's grey tap-highlight rectangle covers the padding box, so it flashes taller than the text. Invisible to a light-mode desktop visitor by construction. If an essay ever puts links on consecutive lines inside one paragraph (a link list in a <p>), the overlap caveat returns — use a ul there anyway.

#### Idea 4: A two-line print stylesheet a 1998 webmaster would have written

```
@media print {
  footer { display: none; }        /* '← Home' is navigation, not document */
  a, a:visited { color: #000; }    /* ink, not dithered blue; underline still marks links */
}

Optionally, homepage only if ever desired: main a[href^="http"]::after { content: " <" attr(href) ">"; } — the RFC-style angle brackets are period-correct. I would skip it for essays.
```

**Rationale.** Printing is already this site's free win — serif body, no chrome, browsers omit backgrounds by default, and the em-based column prints book-width. These two rules remove the only artifacts: a printed navigation link and blue link text that dithers to smudge on mono lasers. @media print is invisible to every screen visitor by definition, so it passes the constraint trivially, and print stylesheets are era-adjacent craft (CSS2, 1998) rather than modern polish. Interaction with idea 1 is safe: Chrome and Firefox force the light color-scheme when printing, and the print rules here override the reverted link color at equal specificity by source order (place this block last).

**Tradeoffs.** Lowest impact of the four — few people print, though 'thoughtful under print' is exactly the kind of detail the CS-faculty crowd notices. The black-links rule is a (print-only) chosen color; if that feels like a violation of the ethos, ship only the footer rule. The URL-append variant clutters anything with more than a couple of links; that's why it stays optional and homepage-scoped.

**Recommendation.** Ship in this order. (1) color-scheme: light dark + revert on links + the viewport colorScheme meta — it is the single highest-impact change available, pixel-invisible to every light-mode visitor in every engine, fixes the genuinely bad dark-mode story (blinding white on Safari/Firefox/desktop Chrome; lossy forced-dark on some Androids), and is MORE authentic than the status quo because it un-hardcodes hexes that only exist to undo Tailwind's reset. (2) The essay-layer corrections — `Georgia, serif` and `1.125rem` instead of bare `Georgia` and `18px`. This is not a new idea, it is the correct implementation of the already-decided change; as specced it would render essays in Roboto sans on Android and trample reader font-size preferences. (3) `p a { padding-block: 0.5em }` tap targets — two lines, zero risk, scoped to avoid the list-overlap trap. (4) The print block, footer rule at minimum, if the owner enjoys it; drop it without regret otherwise.

Explicitly do NOT: hand-pick any dark-mode hexes or add a prefers-color-scheme block with chosen colors (that is the ivory-background failure with the polarity flipped — let `revert` and the UA decide); do not add any background-color in any mode; do not "fix" the Android Noto Serif substitution with webfonts or longer stacks — the machine's font is the 1995 contract; do not touch the Writing-list tap targets; do not add text-wrap: pretty/balance, hyphens: auto, underline-offset tuning, letter-spacing, or font-smoothing properties — every one is visible considered-typography and this owner has already reverted that category once; do not add forced-colors or prefers-contrast rules — the site's near-rawness already makes it best-in-class there. Relevant files: /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/globals.css, app/layout.tsx (viewport export), app/blog/layout.tsx (essay wrapper + printed footer).

---

### The audience rhetorician

**Assessment.** The conceit has a structural problem the owner should name honestly: the Sutton page reads as indifference because Sutton's reputation precedes the page. Rawness is downstream of eminence there. Here it must be self-certifying — the page has to contain enough substance that a stranger concludes "this person clearly could have styled this and chose not to." Right now the homepage is two short paragraphs, a motto, and four links; the ratio of restraint to substance is off, so for a genre-fluent reader it flirts with reading as costume, and for a cold reader as sparseness. The essays will fix this over time; meanwhile every line must be period-exact, because the audience that decodes the joke (HN/startup/engineering peers) is exactly the audience that spots false notes.

There is one active false note: the masthead line "Founder • Engineer • Waterloo, ON" in /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/page.tsx. Bullet-separated role fragments are LinkedIn-headline grammar, circa 2020. No faculty page ever wrote that line; they state facts in sentences. It is the single place the mask slips, and it slips toward exactly the thing the site is trying not to be (personal branding). "My career motto is..." is borderline for the same reason — faculty pages do not declare mottos — but it at least has a self-aware charm; the bullets have none.

Audience map. Peers and genre-fluent readers: lands as taste, provided details stay exact — for them the raw frame is a handshake. Recruiters/employers: essentially neutral; brutalist-plain sites are a recognized genre in 2026 (Berkshire, danluu), they read the facts not the CSS, and he is a founder, not a designer — the neglect risk here is overrated. Cold readers arriving at one essay from a link: this is the largest audience and they barely see the frame at all — they see a long text page and a blue back-link; for them the only question is readability, which is why the DECIDED Georgia/18px essay wrapper is the right call. The worst-served reader today is the phone-at-night reader: blinding white, 16px Times.

The homepage/essay split strengthens the statement — it sharpens it from "I don't style pages" into the better sentence "the site is nothing; the writing is everything." It even has an in-period alibi: Georgia is Matthew Carter's 1996 screen face, precisely what a 1995 author who cared about readers would have adopted in 1997. The risk is register creep. The split only holds if the essay page's chrome — h1, date line, asterism, back-to-home footer — stays in the raw Times register and Georgia is scoped strictly to body copy. If the title goes Georgia too, you have built an ordinary blog with a gimmick homepage, and the two registers read as inconsistency instead of intent.

Highest-leverage missed charm: provenance signals. The genre's native trust device is the modification date — it is the one thing that separates "raw by choice, actively tended" from "abandoned in 2019." A raw page with a fresh "Last updated" line is unambiguously deliberate; a raw page without one is ambiguous, and ambiguity is fatal to deadpan. Its functional twin is RSS: a plain-text site with no feed is a false note to the exact readers who get the joke, because it reveals the rawness as aesthetic rather than infrastructural. RSS is also the only mechanism on this site that converts a one-time cold reader into a repeat reader, which is the site's entire stated purpose.

The cosplay line: the style must be indistinguishable from sincerity — a real 1995 author never signaled "I am doing 1995." Anything that references the era rather than merely behaving plainly is over the line: hr rules as decoration, visitor counters, "best viewed in," gray backgrounds, .html extension jokes, deliberately withheld max-width. Note that the asterism is already at the flirtation line — 1995 used <hr>; a centered asterism is literary-small-press, not faculty-page. It can stay as the single flourish, but the flourish budget is now spent. Also on the wrong side of the line, from the opposite direction: reading-time estimates, share buttons, tags, a dark-mode toggle — Medium grammar breaks the frame as surely as a construction gif.

#### Idea 1: Kill the bullet subtitle; write the masthead in faculty grammar

```
In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/page.tsx, delete <p>Founder • Engineer • Waterloo, ON</p> and fold its facts into the first bio sentence:

<h1>Gareth MacLeod</h1>
<p>
  I'm a founder and engineer in Waterloo, Ontario. I've been building startups
  since 2010—my own and others—to varying degrees of success. Presently I'm head
  of engineering at <a href="https://invertbio.com/">Invert</a>, where we're
  building AI that can solve bioprocess development.
</p>

Alternative if an at-a-glance location line is wanted: replace the subtitle with the plain line <p>Waterloo, Ontario, Canada</p> — name, then place, which is exactly the faculty-page pattern.
```

**Rationale.** Bullet-separated role fragments are 2020s LinkedIn-headline grammar — the one line on the page written in the register the whole site exists to reject. The genre states facts in prose. This is the cheapest possible edit and it removes the only element a fluent reader will clock as personal-brand cosplay; it also removes the redundancy of announcing 'Founder - Engineer' and then immediately saying the same thing in the bio.

**Tradeoffs.** Loses the skimmable one-line summary a recruiter gets in half a second; the first sentence gets slightly longer. The plain-location-line variant preserves scannability at the cost of one extra line. Neither variant costs anything with the genre-fluent audience, which is where the current line actively loses points.

#### Idea 2: A 'Last updated' line in browser-default <small> at the foot of the homepage

```
At the bottom of /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/page.tsx, after the essay list:

<p><small>Last updated August 2026.</small></p>

No CSS: <small> renders at the browser's default smaller size, which is the point. Keep the date manual — update it by hand only when publishing or materially editing, never wired to build time (a CI-stamped date that changes on every deploy is a lie, and this genre runs on the page being literally hand-tended).
```

**Rationale.** The modification date is the genre's signature trust signal — Sutton-era pages carry one — and it does the single most important rhetorical job on a raw page: it disambiguates 'unstyled by choice, actively maintained' from 'abandoned.' Neglect and confident understatement are visually identical; a fresh date is the tiebreaker, and it quietly advertises that the writing is recent. Month-year precision reads calmer than a full date.

**Tradeoffs.** It is a standing liability: if the site goes quiet for two years, the stale date becomes an anti-signal stronger than having no date at all. Mitigate by treating the date update as part of the publish checklist (same edit session as adding the essay link and the feed entry). Manual maintenance is the cost and also the charm.

#### Idea 3: RSS: a hand-maintained public/feed.xml plus a lowercase 'rss' link in the link row

```
1) Check in /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/public/feed.xml, hand-edited like the pages themselves (four items today, ~5 lines per future essay):

<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Gareth MacLeod</title>
    <link>https://garethdmm.com/</link>
    <description>Essays on startups, engineering, and other subjects.</description>
    <item>
      <title>It's the money, silly</title>
      <link>https://garethdmm.com/blog/its-the-money-silly</link>
      <guid>https://garethdmm.com/blog/its-the-money-silly</guid>
      <pubDate>Sat, 01 Nov 2025 00:00:00 GMT</pubDate>
    </item>
    <!-- ...remaining three essays... -->
  </channel>
</rss>

2) In app/page.tsx extend the link row: github · linkedin · email · <a href="/feed.xml">rss</a>

3) In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/layout.tsx add feed discovery to metadata:

alternates: { types: { 'application/rss+xml': '/feed.xml' } }
```

**Rationale.** This is the highest-leverage move on the list because it is the only one that serves the site's stated purpose directly: influence requires return readers, and this site currently has no mechanism to create one. It is also rhetorically load-bearing — the readers who decode the conceit are disproportionately RSS users, and to them a plain-text site without a feed exposes the rawness as surface aesthetic rather than a real commitment to text-first infrastructure. The feed is the substance behind the pose. A static file in public/ adds zero build complexity, and hand-editing the XML is in-character.

**Tradeoffs.** Manual per-essay maintenance (a few lines of XML; easy to forget — pair it with the last-updated line in one publish ritual). Hand-written XML can be broken by an unescaped ampersand; validate once with any feed checker. Full-text feeds would be more generous but mean duplicating essay HTML into XML; title-and-link items are the honest effort level here.

#### Idea 4: Hand colors back to the browser: color-scheme plus CSS system color keywords

```
In /Users/garethmacleod/Documents/code/garethdmmcom-idea-1995/app/globals.css, replace the hardcoded colors with the browser's own, using double declarations so old engines keep today's exact rendering:

:root {
  color-scheme: light dark;
}

body {
  /* existing max-width/margin/padding/font rules unchanged */
  background: #fff;  background: Canvas;
  color: #000;       color: CanvasText;
}

a {
  color: #0000ee;    color: LinkText;
  text-decoration: underline;
}

a:visited {
  color: #551a8b;    color: VisitedText;
}

Update the stylesheet's header comment to state the doctrine: the stylesheet no longer names any color; the browser chooses. In light-mode Chrome, LinkText is literally #0000ee and VisitedText #551a8b — pixel-identical to today. In dark mode the browser supplies its own dark canvas and link colors.
```

**Rationale.** This is the maximal version of the conceit: the stylesheet stops even having opinions about color, which is more default than the current hex values (which are, strictly, a chosen palette imitating a default). It is exactly the sanctioned move — invisible to a light-mode desktop visitor — and it rescues the currently worst-served reader, the phone-at-night cold visitor hitting a blinding white page, without the owner ever having designed a dark theme. Rhetorically it converts 'I styled this to look unstyled' into 'I genuinely delegated to the browser.'

**Tradeoffs.** Dark rendering now varies by browser and OS — Safari and Chrome disagree, and dark-mode visited-link purple can run low-contrast; the owner controls none of it, which is the philosophical point but may grate. Times New Roman's thin strokes on a dark canvas are less pleasant than on white (the essay wrapper's Georgia fares better). Test in Chrome and Safari dark before shipping; if serif-on-dark feels wrong, skip this one entirely rather than half-styling a dark theme — a hand-tuned dark palette is precisely the kind of considered choice this owner has already rejected.

**Recommendation.** Ship in this order. 1) The masthead rewrite (delete the bullet subtitle) — five minutes, removes the only element currently betraying the frame to the audience most fluent in it. 2) RSS feed plus the 'rss' link and feed-discovery metadata — the one move that converts the site's purpose (influence) into a mechanism (subscribers), and a credibility signal to exactly the readers the conceit is aimed at. 3) The 'Last updated' footer line, shipped together with RSS as a single publish ritual: new essay means new list item, new feed item, new date — three edits, one session. 4) The system-colors change only after eyeballing Safari and Chrome in dark mode; it is the purest expression of the doctrine but the only idea with rendering the owner cannot preview everywhere, so it is optional, and the fallback-hex double declarations are mandatory if it goes in.

While implementing the decided essay wrapper, hold one discipline: scope Georgia/18px to essay body copy only — the h1, date line, asterism, and back-home footer stay in raw Times. The split's rhetoric ('the site is nothing, the writing is everything') depends on the frame staying visibly the frame. Separately, per-essay description metadata is worth adding sometime — the share card, not the homepage, is the true first impression for the largest audience, and meta tags are invisible on the page so the deadpan is untouched.

Explicitly do NOT: add any second visual flourish (the asterism spent the budget); add hr rules, era references, counters, or anything that signals '1995' rather than simply behaving plainly; add reading-time estimates, tags, share buttons, or a dark-mode toggle (Medium grammar breaks the frame from the modern side); re-attempt tuned palettes or spacing refinements (that experiment ran and failed — the owner's own revert is the strongest evidence about where his line sits); and do not let the essay wrapper creep into the chrome. The motto line is borderline personal-brand grammar — keep it if it feels true, but know it is on the flirtation line, not safely behind it.

---

