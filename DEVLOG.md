# DEVLOG — jackmanning.me

A running log of development decisions, completed work, and open questions. Each entry is a single completed feature or task. Newest entries on top.

---

## 2026-08-05 — Pub card: taller meter, brass CTA tab

Third pass, tuning the card now that it lives on `/work`.

- **Bar is taller** — `calc(45% + var(--patina) * 20%)`, so 45% of the card at rest
  and 65% fully worn (was 30%/50%). To keep the colour distribution even rather
  than ending in a long aged tail, `--rail-bar` was regenerated with 8 rows per
  band instead of 6: the five bands now complete at 200px ≈ the bar's full-wear
  height. (`ROWS_PER_BAND` in `scratchpad/genrailbar.mjs`.)
- **CTA is a filled tab in the bottom-right** of the main section — `align-self:
  flex-end`, brass fill (patina-shifted, tint capped at 30% so it stays clearly
  brass), label and arrow in `--bench`, the page's dark brown. The arrow needs
  `.pixicon { color: inherit }` since `.pixicon` hard-sets brass.
- **Star removed** from the award box; it's just the honour's name now.

---

## 2026-08-05 — Pub card locked; bench deleted

Second pass on the two-column card, then the design shipped to `/work`.

- **Tab restacked, top-down:** logo square → status tag → award box. The status no
  longer floats to the bottom of the tab (`margin-top: auto` dropped).
- **Awards are visible objects now.** New optional `.pub__award` box under the
  status, driven by the existing `award` field — a ★ over the honour, filled brass
  rather than outlined so it's the one bright thing on the plate. Absent field ⇒
  no box.
- **The bar is vertically centred** in the gutter (`top: 50%` + `translate`), so it
  grows from the middle out instead of sitting on the bottom edge. The ramp inside
  it stays bottom-anchored, so it still reveals terracotta→verdigris upward.
- **Year is prominent** — 0.78rem mono, bold, brass-bright (patina-shifted) rather
  than muted grey. It reads as the paper's date stamp beside the venue.
- **`/pub-lab` is gone**: page, route, nav entry and `.lab__label` CSS all deleted.
  `Work` already routed publications through `PubCard`, so the Work tab picked the
  design up with no change.

---

## 2026-08-05 — Pub card: two columns, and the divider IS the progress bar

Reworked the publication card in the `/pub-lab` bench. Same plate, new anatomy.

- **Two columns.** `.railcard` is now a 3-track grid — `6.25rem | 10px | 1fr`.
  Left is a small **tab**; right is the **main section**. The middle track is the
  line between them.
- **The line is a vertical project-card progress bar.** New `--rail-bar` token: a
  10px-wide (two dot columns) vertical build of the `--card-dots` ramp — same five
  equal bands, same Bayer-dithered boundaries, running **bottom→top** (fresh
  terracotta at the bottom → pale verdigris up), completing at 150px with a tiled
  aged tail above. `.rail__bar::after` is bottom-anchored with
  `height: calc(30% + var(--patina) * 20%)`, so it matches the project card's bar
  exactly: a third of the card at rest, half when fully worn, revealing more of the
  progression as it climbs. Regenerate with `scratchpad/genrailbar.mjs`.
  The old `--rail-ramp` + `.rail__fill` (rail-wide background band) are gone.
- **Left tab = logo slot + status.** New optional `venueLogo` on `Publication`
  renders as an `<img>` in a square slot at the top of the tab; with no file on
  record it falls back to the venue's short name in mono (parenthetical acronym →
  `DIS`; else the first non-society all-caps token → `GROUP`). The status tag is
  pinned to the bottom of the tab and wraps ("UNDER / REVIEW").
- **Year moved to the main section, beside the venue.** `.pub__meta` is one line:
  venue in the verdigris accent · mono year. The year numeral and the pixel icon
  are off the tab entirely.
- **Card content is real now** — title, venue, year, authors (Jack's name
  emphasized) and blurb come from the content layer; the placeholder `T` strings
  are deleted.

---

## 2026-07-26 — Work tab: two object types + publication paper offprints

Pivoted to the Work tab. Two things: cleanup, then a real projects/publications split.

- **Removed the numbered Work variants.** Deleted `Work2` (ledger) and `Work3`
  (split) pages, their routes, and the "Work 2 / Work 3" nav entries. `/work` is
  the single Work page again. Also removed the now-orphaned `WorkRow` component.
  (Its `.ledger` / `.cite` / `.row` CSS is dead but left for a later sweep.)
- **Projects and publications are different objects, but SAME philosophy.** (Two
  earlier passes — a light parchment offprint, then a single copper plate — both
  bombed. Now producing OPTIONS to judge instead of shipping one build.)
  Publications stay a dark workbench **plate** and patina like a project; they
  differ only within the patina spectrum + the dot-pattern geometry.
- **Locked the LEFT-RAIL design** (after scrapped passes: parchment, one copper
  plate, five over-the-text layouts, then five rail variations Jack chose from).
  `PubCard` is now one component:
  - A narrow left rail holds the icon **next to a big year numeral**, then the
    status tag (its own slot, apart from the date).
  - Surface + border shift **brass→verdigris exactly like a project plate** (uses
    `.patina`'s default `--tint`, un-overridden; verdigris venue/CTA accent).
  - The rail patina reads like a **progress fill**: `.rail__fill` is a bottom-
    anchored dot band whose HEIGHT = `calc(var(--patina) * 50%)`, so it grows up
    from the bottom of the rail to a halfway cap as the card ages, leaving the
    rail's upper half for the head.
  - The fill dots are an **ordered gradient**, not random noise: new `--rail-ramp`
    token — a vertical version of the `--card-dots` progress-bar ramp (same palette
    order, fresh terracotta at the bottom → aged pale-verdigris up, Bayer-dithered
    band transitions). Bottom-anchored `no-repeat`, so growing the fill reveals the
    progression from the bottom just like the bar reveals it as it widens.
    Regenerate with `scratchpad/genrailramp.mjs`.
- **Fixed the "hover does nothing" patina bug.** `.patina` declares its own
  `--patina: 0`, which shadows any inherited value — so the animating `--patina`
  must be an inline style ON the `.patina` article (as `WorkCard` does via
  `patinaProps.style`). The pub article only inherited it, so it was pinned at 0 →
  no aging. Now the article gets `style={patinaProps.style}`, and hover handlers
  bind on every wrapper (incl. the non-navigating under-review card) so all age.

  `PubLab` at **`/pub-lab`** (TEMP nav link) now shows the design at forced patina
  0 / 50% / 100% (via a `demoPatina` prop) so the fill growth is visible at a
  glance, plus the two live papers + a reference project plate. Delete the lab +
  `demoPatina` once the design is signed off.
- **Fixed the date/status conflation.** The old `topline()` put *either* a year
  *or* a status in one slot. Now the **date** lives in the head's date slot and
  **status** in its own head slot — a small mono tag keyed by state (accent
  Published · amber Under review · muted In prep). Status/date are data-driven off
  `item`; the remaining slots are **placeholder text describing what goes there**
  (title, venue/target, authors, abstract, recognition) — real content to follow.

Typecheck + build clean. Open question: publications are still `WorkCard` plates on
the Home "featured" strip — do we want the paper treatment there too, or keep Home
plates uniform?

---

## 2026-07-26 — Patina meter → true completion (mean element wear)

The seam meter was driven by an independent `PAGE_ID` accumulator that bumped a
little on *every* hover/visit (capped at 0.6) — so it climbed even when nothing
new was being aged, and could approach 100% without every element being fully
patina'd. Reworked the whole-page reading to be **derived, not accumulated**:

- `PatinaStore.getCompletion()` = mean `level` across every element the store
  knows about (excluding the legacy `__page__` id). It reaches 1.0 **only** when
  all elements are at 1.0, and a maxed element is capped so it can no longer raise
  the average — exactly the requested behaviour.
- Added `subscribeAll` (global change listener) so the derived value recomputes on
  any element bump; `emit()` now fans out to global listeners too.
- Removed the `PAGE_*` accumulator constants and every `bump(PAGE_ID, …)` call.
- `usePageTarnish` → **`usePagePatina`** (returns 0–1 completion). Seam meter is
  now `round(completion * 100)`.
- The tarnish veil (`<Layout>`) still tracks the same signal, scaled `× 0.6` to
  preserve its tuned ceiling ("the page never fully oxidizes") — so the ambient
  aging now honestly reflects real element wear instead of raw interaction count.

Typecheck + build clean.

---

## 2026-07-22 — Card dot-bar: even 5-colour mix, half-width when worn

Two fixes to the card's dot bar (`.card__title::after`) before adding content:

- **Half width.** Fully-worn width was `46% + 30% = 76%` of the card — too wide.
  Now `calc(30% + var(--patina) * 20%)`, so a fresh card is 30% and a fully
  patina'd one lands at exactly **50%** (half the card).
- **Even colour distribution, kept ordered.** The card bar reused the ordered
  `--divider-ramp`, whose aged verdigris tail (everything past 260px) dominated
  once the bar was wide → the lightest colour was a big majority. New dedicated
  `--card-dots` token that keeps the pixel-art *ordered* progression (terracotta →
  copper → umber → pale-verdigris → deep-verdigris) but in **five equal 10-dot
  bands** with Bayer 4×4 dithering confined to a ±3-dot window around each band
  boundary — solid cores, stippled transitions, never random. Left-anchored +
  `no-repeat`, so the bar still *reveals* more of the ramp as it widens with wear;
  it completes at 250px ≈ the half-card full-patina width, with a deep-verdigris
  tail for any overshoot. Equal bands ⇒ no single colour dominates.
  Generator: `scratchpad/gencarddots.mjs`.
- The page-tarnish `.seam__fill` still uses the ordered `--divider-ramp` (its
  orange→verdigris reveal is intentional there) — only the card bar changed.

Build clean.

---

## 2026-07-04 — Iteration 3.6: divider dots → classic ordered (Bayer) dithering

The 3.5 divider ramp coloured dots by masking a stretched colour field, so a 5px
dot could straddle a 2px cell boundary and come out split (two colours in one
dot). Reworked to classic dithering (ref: dither.jpeg): each dot is now ONE solid
palette colour.

- `--divider-ramp` is now the dots themselves — a fixed 5px grid of solid-colour
  `<circle>`s, coloured by **ordered (Bayer 4×4) dithering** of x-position, so the
  transition between adjacent palette colours is a proper stipple. No mask, no
  stretch (`background: … / auto no-repeat`), so dots stay round and never split.
- Progression completes at 260px; beyond that a tiled fully-aged verdigris tail
  (SVG `<pattern>`) fills wider dividers cheaply.
- Fixed-scale + left-anchored ⇒ a divider **reveals more of the progression as it
  grows/ages**: a fresh card rule is mostly orange, an aged one reaches verdigris;
  the hero seam extends into verdigris as site tarnish accrues. (Trade-off: this
  is reveal, not stretch-to-fit — the alternative, always showing all 5 across any
  width, is what caused the split dots, so it's out.)
- Generator: `scratchpad/genramp.mjs` (Bayer matrix + palette + tail).

Verified single-colour dots and the dither pattern at rule/seam widths and on a
real card grid + terrain bg. Typecheck + build clean.

---

## 2026-07-04 — Iteration 3.5: LOCKED (Engraved + Terrain), ordered dithered dividers

Jack locked the direction and refined the dividers.

- **Locked & de-labbed.** Removed the TextureLab switcher (component, `<TextureLab>`
  in Layout, `.texlab` CSS) and all `[data-card-tex]` / `[data-bg-tex]` variants.
  Engraved is now the base `.plate`; Terrain is the base `.tarnish-veil`. One card,
  one background, no attributes.
- **Divider lines → ordered, dithered patina ramp** (card rule + hero seam). Their
  dots are no longer the RANDOM terrain-field; they're coloured by position along
  the line: darkest orange → lighter orange → brown → light verdigris → dark
  verdigris, left→right, with DITHERED bucket boundaries (dots flip between the two
  neighbouring colours near each transition — not a hard edge, not random).
  - Implemented as `--divider-ramp`: a baked grid of solid colour cells where each
    cell's palette bucket = `floor(x*5 + per-cell noise)`. Stretched under the
    round-dot mask so each dot samples one ordered-but-dithered palette colour.
  - **Why not an SVG filter** (the obvious approach — gradient → noise → quantize):
    filtered SVGs used as CSS backgrounds rasterize UNRELIABLY at divider sizes in
    Chrome (verified: the same filter renders at 700×60 but goes blank at 220×11 /
    even 660×33). The self-contained turbulence assets (terrain-field/blob) are
    fine; only the gradient-`SourceGraphic` composite failed. The rect-grid bakes
    the result so there's no runtime filter. Regenerate via `scratchpad/genramp.mjs`.
- Divider is now **2 dot-rows tall**, round dots (was 1 row / dash-shaped), and
  grows in width with wear. The seam track height bumped to match.

Verified the full progression + dither at rule/seam sizes and a real card grid on
the terrain bg via offline Chrome screenshots. Typecheck + build clean.

**Open:** none blocking — this is the locked look. Possible later polish: the
brown mid-tone (`#5e4a38`) is dark on the aged (green-tinted) plate; could brighten
the plate tint or nudge that bucket if it reads muddy in situ.

---

## 2026-07-04 — Iteration 3.4: 5-colour dots, reworked Riveted + Engraved, seam, new hover

Direction from Jack, several changes:

- **5-colour dot palette** (tokens): every dot — cards AND background — is drawn
  from `#5e4a38 · #6e8f80 · #8fb2a1 · #9c6b43 · #c9824e` (`--dot-1..5`). The
  terrain-field SVG now quantizes turbulence into these 5 (interleaved warm/cool
  so neighbours differ → real variety, fixing the "aged stage is too samey / dots
  blend into the background" complaint). Added `--dot-round` shared mask cell.
- **Riveted (A) reworked** to spec: face has **NO dots**. Each corner rivet starts
  as one dot; a **stepped oxidation halo** (hard concentric bands via a
  `--halo-steps` stop-list, single hue `--dot-2`, radius `calc(--patina * 60px)`)
  grows out of it like contour rings round a survey marker. No hues, set steps.
- **Engraved (B) reworked**: the rule is now **2 dot-rows tall** (`height:11px`),
  **round** dots (was dashes — square 5px mask cell), drawn from the 5-colour
  field so it stays varied, and grows in width with wear. Corner foxing recoloured
  from the same field (variety at full age).
- **Spine cut.** Lab card options are now just **Riveted / Engraved**.
- **Hero seam divider** restyled to the *same* engraved dot-band: a 2-row band of
  round multi-colour dots that grows (by width) with site tarnish. Verified the
  fill clips to the correct % (debug: 40% fill = 40% dotted, rest empty).
- **Hover replaced** (the sweep was bad): "lift & seat" — plate rises 3px, a crisp
  brass frame seats just inside the edge (inset box-shadow), border → fresh brass,
  and the patina marks brighten. No moving gradient. Reduced-motion respected.

Verified all states via offline Chrome screenshots (Riveted + Engraved at patina
0 / 0.45 / 0.9 on terrain bg; seam at 18/55/92%). Typecheck + build clean.

**Open:** Jack to pick Riveted vs Engraved, then tune the winner (halo step
sizes / rule height / foxing) and retire the lab.

---

## 2026-07-04 — Iteration 3.3: card redesign (3 new options) + terrain bg keeper + drift

Terrain won for the **background** (kept as bg variant `e`) and got a very slow,
subtle life: `terrain-drift` animates ONLY the blob mask layer's `mask-position`
(dots + edge stay put) over 54s, `prefers-reduced-motion` off. Reads as weather
settling, not animation.

Terrain lost for the **cards** — and so did the other four. Root cause named: all
five were the same idea (a uniform dotted rim that grows inward), and a dotted rim
on a dotted-terrain bg is camouflage. Fix: the card body is a calm solid plate
(that's what separates it from the ground) and the dots live in ONE concentrated,
meaningful feature that oxidises. Deleted all 5 old card variants; added 3:

- **A · Riveted** (default): solid plate + four brass corner rivets; oxidation
  seeds AT the corners and blooms diagonally inward (union of four corner discs
  via `mask-composite: add`, radius capped so the centre stays clear even fully
  aged). Rivets are background radials; oxidation is `.plate::before`.
- **B · Spine**: all patina in a left-edge spine (brass→verdigris, dots emerge
  with age via dot-alpha keyed to `--patina`); body stays a clean solid plate.
  Most legible on a busy ground — different silhouette from the terrain.
- **C · Engraved**: no border dots at all (max contrast with terrain); dots live
  in the rule under the title (`.card__title::after`, swells + widens with age)
  plus a faint corner foxing.

Shared across all three: a **polish sweep** — one hover gesture. A brass highlight
wipes across once (`.patina::after`, `plate-polish` 620ms); fresh = a gleam, aged
= momentarily reveals fresh brass under the patina. Transient only (never lowers
stored patina → true to monotonic aging). Plus a 2px hover lift + soft shadow.
Both motion bits respect `prefers-reduced-motion`. Features live on `.plate`, so
`WorkRow` / contact plates (`.patina`, no `.plate`) keep just the clean surface +
sweep.

Lab: Card selector is now Riveted / Spine / Engraved; restore logic coerces stale
saved keys (old `d`/`e`) back to default. Verified all 3 at patina 0 and 0.85 on
the terrain bg via offline Chrome screenshots (fresh reads clean, aged reads worn,
legible on ground). Typecheck + build clean.

**Open:** Jack to pick a card direction (B and C are the strongest / most
legible; A is most on-theme). Then tune the winner and retire the lab.

---

## 2026-07-04 — Iteration 3.2: "Terrain" variant (Option 3 draft) — noise-thresholded borders

The b–d dot variants tune a **smooth-gradient** system toward a
**thresholded-noise** reference (`BG1 (16).png`), so they can't land it. Two
structural gaps named: (1) the edge falloff is a smooth radial/linear gradient →
clean ellipse/band boundaries, where the reference has organic noise-blob
coastlines; (2) the colour FIELD is a smooth multi-hue gradient → adjacent dots
share a hue, where the reference is salt-and-pepper (charcoal beside terracotta).

**Draft — Option 3 (organic shape + per-dot colour), added as lab variant `e`
without touching a–d:**
- `--terrain-blob`: LOW-frequency `fractalNoise` thresholded near-binary
  (`feFuncA` discrete) → organic landmass regions with hard, irregular edges.
  Intersected as a new MASK layer: a dot lights only where dot ∩ blob ∩ growth
  band. Growth band still couples to `--patina`, so blobs bloom inward from the
  rim. Tiled 340px (cards) / 640px (bg) so blobs read at region scale.
- `--terrain-field`: turbulence → grayscale (`feColorMatrix`) → QUANTIZED into 4
  patina tones (`feFuncR/G/B` discrete: verdigris-deep → verdigris → brass →
  brass-bright). Replaces the gradient field, so adjacent dots pick different
  hues. Reuses the *existing* 3-layer `mask-composite: intersect` engine that
  variant `d` already proved.
- Lab: Card + Bg each gain a **Terrain** button. Bg biases blobs to the top &
  bottom horizon (linear edge) to echo BG1's sky-fill + hill line.

Assets live in a `:root` block in the variant section of base.css (removable with
the lab). Typecheck clean.

**Open:** eyeball on the running site. Tune knobs — blob `baseFrequency`
(0.014) / threshold (`0 0 0 0 0 1 1 1`) for landmass size/coverage; field
`baseFrequency` (0.11) for how many dots share a hue; dot size (7px). If dots
still read too grid-perfect vs the reference, escalate to Option 4 (canvas
stipple w/ per-dot jitter).

---

## 2026-07-01 — Iteration 3.1: texture lab (dot variants) + edge-bloom scroll fix

Jack wants to explore the dot texture instead of committing. Two fixes + a lab.

- **Bug fix — edge-bloom scrolled with the viewport.** `.tarnish-veil` was
  `position: fixed`; moved to `position: absolute` anchored to `#root` (now
  `position: relative`), full document height, so the bloom is part of the page
  and scrolls naturally.
- **Multi-hue dots ("manual gradient" like BG1).** Reworked `.patina::before` and
  `.tarnish-veil` to paint a colour FIELD and reveal it through an intersect of
  two/three mask layers (dot shape ∩ [noise] ∩ edge band). Because the field is a
  radial copper→brass→verdigris gradient, each dot is coloured by its position —
  the manual-gradient look, not one flat colour.
- **Texture lab** (`components/TextureLab.tsx` + `[data-card-tex]`/`[data-bg-tex]`
  blocks in base.css): a corner control to flip variants live, persisted to
  localStorage. Card: Verdigris / Gradient / Pixels(square) / Speckle(noise).
  Bg: Corona / Rails(side) / Bands(top+bottom) / Corners. Remove once locked.

**Open:** pick a card + bg combo; then tune band width, dot size, colour stops.

---

## 2026-07-01 — Iteration 3: converged on one Home ("The Ledger")

Jack reviewed the 3 Home / 3 Work variants and picked winning pieces. This round
collapses Home to a **single** design and fixes the two systemic complaints at the
root (shared CSS), not per-variant.

**Decisions locked, per axis (menu → Jack's picks):**
- **Layout direction:** The Ledger (editorial / asymmetric).
- **Background (B4 · edge-bloom):** the bench no longer tarnishes behind content.
  Page wear now blooms as a corona of verdigris dots crowding the viewport rim and
  dissolving before the content. Fixes "ground too close to patina when fully aged"
  — cards always separate from a static ground. Grid removed.
- **Card texture (T1 · growing dot-border):** `.patina::before` reworked from a
  full-face dither into a dotted band that crowds the rim and grows *inward* as
  `--patina` rises (radial mask whose clear zone shrinks with wear). Derived from
  Jack's `BG1 (16).png`. `::after` reduced to a faint rim-darken so the face stays clean.
- **Hero (H2):** stacked oversized name (surname in brass) + **square** portrait.
- **Divider = meter (D4 / P3):** the hero↔content "tarnish seam" IS the live patina
  bar; dotted fill width = site wear %. The % readout moved off the footer to here.
- **Stats (S2):** big brass numerals + one-word labels (gloss is a tooltip only).
- **Callouts (C1):** Now / Focus / Off-the-clock, three across. "Off the clock" is
  the new non-academic block (New dad · TTRPG player / DM · Amateur woodworker),
  replacing the old contact/"Elsewhere" callout (contact lives in the footer + plate).
- **Contact (CT2):** a dedicated plate at the page foot, bound to the patina system
  so it ages when handled — "the last object on the bench".

**Cleanup:** deleted `Home2`/`Home3` pages, routes, and nav entries. Home is now one
design at `/`. Work variants left reachable for a later pass.

**Files:** `pages/Home.tsx` (rewritten), `styles/base.css` (body / `.tarnish-veil` /
`.patina` reworked; `.lhero`/`.seam`/`.figures`/`.callouts`/`.contact` added),
`content/extras.ts` (`interests`; one-word stat labels), `App.tsx`, `Layout.tsx`.
Build clean (tsc + vite, 508ms).

**Open:** confirm the dot-border band width/feel at high wear; interests copy final?;
whether Work should follow the same treatment next.

---

## 2026-06-30 — Iteration 2: multi-version explorations + patina/texture fixes

Big round of feedback from Jack. Global fixes + 3 versions each of Home and Work to compare.

**Global fixes (all versions):**
- **Monotonic patina** (`system/patina.tsx` rewritten): attention only ever ages things *forward* — no decay — so flicking the cursor can't make a card look like it "reverts". Hover adds a permanent step, resting accrues more, visiting bumps further.
- **Whole-page tarnish:** a reserved `__page__` id accumulates wear from every interaction (`usePageTarnish`, cap 0.6). `<Layout>` writes it to `--page-tarnish`; a fixed `.tarnish-veil` + the ground color + frame rules pick it up. Home 3 shows a live pixel "SITE PATINA" meter and the footer shows a "site wear %" readout.
- **Real texture:** patina is no longer just a hue shift — `.patina::before` paints a **verdigris pixel-dither** (3px radial-dot grid masked by fractal noise), so oxidation reads as a spreading corroded speckle. Verified via a temp ramp.
- **Bigger pixel icons** (`pixicon--lg` 30px on cards); **bigger portrait** (200×240+). **Faint workbench pixel-grid** on the page ground.
- **Content:** Talks & Writing dropped as categories (Projects & Publications only); the inferred DIS talk removed so DIS appears once. **Date and venue split** — `topline()` (date/status only) vs `subline()` (venue for papers, tags for projects), fixing the confusing "2026 · ACM DIS…" line.
- **Denser/wider cards** (`grid--two`, 30rem min), reduced section padding, faked reusable content in `content/extras.ts` (Now / stats / focus / tools / elsewhere).
- **Nav** now carries Home · Home 2 · Home 3 · Work · Work 2 · Work 3 so every variant is reachable (CV + project subpages deferred per Jack).

**Home versions:** v1 refined baseline (bigger hero + stats). v2 editorial split (tall portrait panel, oversized name, main+sidebar with faked panels — fills the page). v3 workbench collage (brass nameplate over an isometric pixel field, live site-patina meter, feature plate + grid).

**Work versions:** v1 refined grid (Projects/Publications filter, wider cards). v2 the ledger (dense oxidizing index table grouped by type). v3 split (projects as large plates left, publications as an oxidizing citation list right). Fixed an inline-display bug where row/citation titles ran into their meta.

Verified: `tsc` clean, `vite build` clean, all six pages + the ramp screenshotted and reviewed.

**Open tune-ups:** aged verdigris at ~1.0 is quite saturated; odd-count 2-col grids leave a gap; Work pages have empty lower space until more work is added.

---

## 2026-06-30 — Design language v1: the workbench

Locked and implemented the design language (Jack chose all four recommended directions).

**Thesis:** a portfolio is an artifact that accumulates a record of attention — patina is the site practicing what Jack studies (identity, memory, what we leave behind), with zero death framing. Built in a *maker's-workshop* world (he makes things and studies them), so patinated metal ties "made by hand" to "ages with time."

**The four locked choices:**
- **Ground:** dark warm workbench — `--bench #1B1714`, plate `#241E18`, ink `#ECE3D2`. Work glows like brass on a bench. Hard break from the old cream-serif look (which was near an AI default).
- **Type:** Space Grotesk (display) · Newsreader (reading/prose) · Space Mono (all data/labels/eyebrows — the "data plate" voice). Self-hosted via Fontsource. Files: `src/styles/tokens.css`.
- **Iconography:** hand-set 8×8 **pixel glyphs** (nod to Jack's Aseprite/ATLAS sprite work) for the four work types + an arrow. `src/components/PixIcon.tsx` — string-art maps → crisp `<rect>`s.
- **Patina render (fixes the "too subtle" complaint):** copper→verdigris **hue shift** + verdigris **speckle grain** (SVG fractalNoise as a mask) + **edge-bloom** (radial gradient from the rim), all scaled by `--patina`. `.patina` class in `base.css`, driven by `usePatina()`. Verified via a temporary `/_demo` ramp (0→0.95): oxidation is now dramatic and unmistakable, but only reached through real accumulated attention.

**Applied across:** frame (sticky mono nav + footer), hero, section headers, work cards (brass plates w/ pixel type-icon, mono meta, contextual Read/Visit CTA), Work filter chips, and the case-study page (Newsreader prose with Space-Grotesk section headings over hairline rules — the wall of text is gone).

**Design tokens** centralized in `src/styles/tokens.css`; component styles in `src/styles/base.css`. Verified: `tsc --noEmit` clean, `vite build` clean, screenshots captured (home / case study / patina ramp) via headless Chrome.

**Next:** tune-ups from Jack's live review; consider a subtle *global* patina (whole-page "Tarnish" wear over a session) and per-type accent nuances.

---

## 2026-06-30 — Full rebuild: Astro → pure React, content/system/design separation

**Direction reset.** The site is a *personal portfolio* (Jack's work), not a death/grief site — earlier design pitches mis-framed it. Rebuilt from scratch as a **pure React app** (dropping Astro), with content and design strictly separated so content updates never touch design. The "patina" survives, reframed as a *signature visit-driven interaction* (the site is a material that records a visitor's attention), not a death metaphor. Old Astro source, config, MDX content, theme, and the Van Dyke poem were removed.

**Three-layer architecture:**
- **Content** (`src/content/`) — pure typed data, zero JSX/color. `schema.ts` defines `WorkItem = Project | Publication | Talk | Writing` over a shared `Entry` spine (id, title, year, blurb, tags, featured, links, cover, optional `body`). One typed-array file per kind (`projects.ts`, `publications.ts`, `talks.ts`, `writing.ts`) + `profile.ts` + an `index.ts` aggregator (`allWork`, `featured`, `byId`, `byType`, `hasCaseStudy`, `primaryHref`). Adding work = append one object. Long-form case-study bodies live as markdown in `bodies/*.md`, imported via Vite `?raw` and referenced by `body`. **Rule:** an item earns a `/work/:id` page iff it has a `body` (only featured work bothers); everything else is a card linking to its first external link.
- **System** (`src/system/patina.tsx`) — the patina engine ported from the old vanilla script into a React context. `usePatina(id)` → `{ level, patinaProps }`; spreads hover/click handlers + a `--patina` (0–1) CSS custom property. Visit-driven aging, `localStorage` persistence (`jmm:patina`), rAF decay back to an aged floor, reduced-motion aware. Design-blind — it only tracks "how much attention has this id received."
- **Design** (`src/components`, `src/pages`, `src/styles/base.css`) — **deliberately plain skeleton** to verify data + routing + the patina mechanic before we build the real design language. `--patina` drives a visible fresh→aged `color-mix` tint on cards as proof the system works. Routes: `/` (featured), `/work` (filterable by type), `/work/:id` (case study), `*` (404).

**Content migrated:** Digital Legacy Clinic + ATLAS Arcana (both with full case-study bodies), Designing Conversations with the Dead (DIS 2026, Honourable Mention, abstract as body), Training for Empathy (under review, GROUP 2027). Added an inferred DIS 2026 talk from the `distalk2026` photo — **flagged in `talks.ts` for Jack to confirm**. `writing.ts` is empty with a template.

**Stack:** Vite 6 + React 19 + TypeScript + React Router 7 + react-markdown. Verified: `vite build` clean (218 modules), `tsc --noEmit` clean, dev server boots and serves HTTP 200.

**Next:** the design language — iconography, color, type, and how `--patina` actually renders (Tarnish vs. Unnoticed).

---

## 2026-06-24 — Homepage nav + hero headshot

**SubNav now shows on the homepage.** It was previously suppressed on `/` (the `showSubNav = currentPath !== '/'` guard in `Base.astro`). Per request, removed the guard so `<SubNav />` renders site-wide, giving the home page the same Projects · Publications · CV nav (and wordmark) as the subpages. Dropped the now-unused `currentPath` from `Base.astro`.

**Hero now has a square headshot beside the text.** Restructured `Hero.astro`:

- The eyebrow ("PhD student · Identity Lab, CU Boulder") stays full-width at the top, above everything.
- Below it, a flex row (`.hero-body`): a square portrait on the left, the name/tagline/hook stack on the right.
- **The square tracks the stack's height.** On `≥640px` the row is `align-items: stretch` and `.portrait` is `width: auto; align-self: stretch` with `aspect-ratio: 1` — so its height is set by the (taller) text column and its width follows from the ratio, yielding an exact square as tall as the stack. The headshot `<img>` is `position: absolute; inset: 0` inside the relatively-positioned `.portrait`, so its intrinsic size never feeds back into the row height (no circular sizing). Below 640px the row collapses to a column with a fixed `8rem` square above the text.
- Image is `src/assets/photos/headshot.JPG` (Jack's, 960×1280 portrait) via `astro:assets` `<Image>` → optimized to webp (186kB → 94kB at build). `object-fit: cover` with `object-position: center 20%` square-crops it, biased upward to keep the face framed. Styled through `.portrait :global(img)` since `<Image>` renders its own element.
- Bumped `.hero-inner` max-width 60ch → 64ch to give the row a little more room.

Build: 7 pages clean, headshot optimized.

---

## 2026-06-24 — Selected Work headings, stronger patina, persistent aging, photos folder

Four small homepage/system improvements in one pass.

**Selected Work group titles.** The homepage section had a single "Selected Work" eyebrow with two unlabelled blocks below it. Added an `<h2 class="group-title">` ("Projects", "Publications") at the top of each block so the two kinds of work are distinguishable. Styled as a quiet 1.375rem serif heading, not another all-caps eyebrow — the eyebrow stays the section label, the h2s are the subsections.

**Patina now has real visual weight.**

- **Project cards** previously only shifted their *border* color with patina. Added (a) a background that mixes `--c-surface` with the fresh→oxidized `--patina-tint` up to 16% at full patina, and (b) a title color that drifts from `--c-ink` toward the tint up to 32%. Both transition alongside the existing border. The card now visibly warms/oxidizes as a whole, not just at its edge.
- **Publications** previously only animated the title underline (and, for awarded items, the left rule). Per the request, added a **tinted background box**: the `.pub` article now has inline padding + a `-0.85rem` inline margin (so text stays aligned at rest), a 12px radius, and a `transparent → --patina-tint` background up to 16%. Also gave the title the same ink→tint color drift as project cards. Negative inline margin stays inside the page's 1.5rem gutter, so no overflow on the homepage or `/publications`.

**Patina now accumulates and persists across sessions.** Previously every hover spiked the patina and it decayed straight back to 0 (or a 0.12 visited baseline held only in `sessionStorage`); the in-memory cache only survived view-transition navigations, not reloads or leaving the site. Reworked `src/scripts/patina.ts`:

- Each card carries a persistent `aged` floor, stored in `localStorage` under `jmm:patina` as an `{ id: number }` map (was: `sessionStorage` set of visited ids).
- A hover still spikes `patina` by `0.18`, but also accrues `+0.05` of *permanent* wear into `aged` (capped at `0.85` so browsing can't fully max a card), written through to storage immediately.
- Decay now settles back to `aged`, not to 0. On load, a card resumes *at* its stored `aged` value, so navigating away and back — or a full reload — keeps the accumulated patina exactly where it was.
- Click still guarantees a `0.12` minimum (the old visited baseline), folded into the same `aged` mechanism. Replaces the old separate `visited` set entirely.

**Photos folder.** Created `src/assets/photos/` with a README. Chose `src/assets/` (not `public/`) so dropped images get Astro's build-time optimization via `astro:assets` `<Image>`. Ready for Jack to add files; we'll wire up rendering next.

Build: 7 pages clean in ~0.9s.

---

## 2026-05-21 — ATLAS Arcana draft + MDX boolean-attribute fix

**The error:** MDX 3 (used by Astro 6) requires explicit attribute values on every JSX-style attribute. The scaffold had `data-placeholder` written as a bare attribute, which is valid HTML but invalid JSX/MDX. Render failed with `UnknownContentCollectionError`. Fix was a one-character change per figure: `data-placeholder` → `data-placeholder=""`. Empty string still satisfies the CSS attribute selector `[data-placeholder]`, so the placeholder styling continues to apply without conditional logic.

**Content:** filled the body in from your paste. The wiki you sent is ~5,000+ words of devlog/wiki material; the portfolio cut is ~1,500 words, structured around the parts that read as project narrative rather than implementation diary. Section pass:

- **What it is** — combined elevator + capstone framing in two sentences.
- **How it plays** — the software-first-but-not-software-only beat, with trailer placeholder beneath.
- **Where the idea came from** — RMPP origin, the merge of your two original individual ideas, the equal-co-developer split, Peter Gyory becoming capstone advisor in spring. Sheiva Rezvani and Annie Margaret named.
- **The arcade cabinets** — the path from full-size → backpack-mounted → tabletop-pair, with the **ARG dilemma** folded in here as the reason for two cabinets rather than one. Two-cabinet, two-person-team framing.
- **Sprite work** — Aseprite from scratch, 8 px per blueprint square, robot player + the mid-step animator detail, 13 faculty/NPC characters built from a base human sprite.
- **The ARG layer** — the cut from six elaborate puzzles to four simpler ones, the four puzzles listed (code, jigsaw, treasure map, telephone), the unifying ARG indicator and its two-round usability testing.
- **One engineering corner: layering** — the most distinctive technical bit, kept tight: the custom editor tool, *The Script*, the y-position-with-skipped-slots auto-sorting, the opacity-grouping repurpose. I cut the dialogue system, hint system, tripwires, elevator, menu, and arcade-controller-input write-ups — all interesting, but heavier than the portfolio frame supports. Most readers will want one engineering glimpse, not a tour of every system.
- **What the project was actually for** — closing reflection on the "actual goal vs surface goal" distinction.

**Things I cut that you might want back in** (low cost to add):

- The credits-by-GPT detail (you and Jackson used GPT-3.5/4 to generate fun "titles" for testers and mentors). Charming, but reads as colour rather than load-bearing.
- The arcade controller input write-up (joystick wired as four buttons rather than analog, custom `ControlManager` for edge-triggered semantics over level-triggered input). Cool engineering story; just felt like one engineering corner was enough.
- The full dialogue/quiz system breakdown (sender / box / quiz triad).
- The stickers collaboration with Quinn Pearson's ATLAS Sticker Machine.

Tell me which (if any) you want surfaced and I'll thread them into the appropriate section.

**Frontmatter:**

- `year: '2024'` — capstone completion semester. If you want the range, swap to `'2023–2024'`.
- `role: Co-creator (equal share) — design, code, sprite work, fabrication` — your paste explicitly said "equal co-developers", so this is verbatim-ish.
- `collaborators: ['Jackson Greer', 'Peter Gyory (advisor)']` — matches the Digital Legacy Clinic pattern of person + role-qualifier.
- `featured: true` — visible on the homepage Selected Work alongside Digital Legacy Clinic. Toggle off if you'd rather it live only on `/projects` until the media is filled in.
- No `links` field — the schema requires real URLs (`z.string().url()`), so I omitted rather than stub. Add `links: [{ label, href }]` when you have an itch.io / video / repo destination.

**Media placeholders unchanged from the scaffold** — same seven slots (trailer, gameplay GIF, arcade-cabinet gallery, sprite gallery, ARG puzzle gallery, ARG GIF, custom-tool screenshot). Replacement pattern documented in the prior DEVLOG entry.

---

## 2026-05-21 — ATLAS Arcana scaffold + media placeholder system

**Done:**

- `src/content.config.ts` — `'game'` added to the `projectTag` enum. Digital Legacy Clinic was `['service', 'research']`; ATLAS Arcana is `['game', 'code', 'experiment']`. None of the existing tags carried "this is a video game" cleanly; one new enum value seemed cheaper than collapsing a meaningful project type under `experiment`.
- `src/content/projects/atlas-arcana.mdx` — rough scaffold. Frontmatter: title, year (`'2024'` — verify), description, tags, `featured: true`, role (`Co-creator — design, code, sprite work` — yours to refine), collaborators (`Jackson Greer`). Body has six sections with a one-line anchoring paragraph each: *What it is*, *How it plays*, *The arcade cabinets*, *Sprite work*, *The ARG layer*, *What the project was actually for*. The prose is deliberately minimal — easier for you to paste the old project-page content over the top than to read past existing drafted paragraphs.
- **Media placeholder system** — `src/pages/projects/[slug].astro` now styles a `<figure class="media …">` family inside `.prose`. Three slot variants and one wrapper-only variant:
  - `figure.media--video` — 16/9 placeholder. Replace with `<video src controls poster>` when you have the trailer file.
  - `figure.media--gif` — 4/3 placeholder, capped at 28rem so inline gameplay GIFs don't dominate the column. Replace with `<img src>` (Astro happily renders GIFs as `<img>`).
  - `figure.media--image` — 16/9 placeholder for a single still photo.
  - `figure.media--gallery` — wraps a `.gallery-grid` of `.gallery-slot` divs. Grid is `auto-fit, minmax(180px, 1fr)`, so it lays out 1–4 columns depending on viewport. Replace the slot divs with `<img>` tags when you have the photos. Grid items get 8px radius; the wrapping `figure` keeps the dashed-border treatment only while `data-placeholder` is set on it.

  All placeholder visuals share the same idiom: dashed `--c-hairline` border, `--c-surface` fill, an uppercase Inter caption underneath, and a sensible aspect-ratio hint so the page layout reads roughly how it will read once filled. Removing `data-placeholder` on the figure turns it into a "real" media wrapper with no decoration of its own — just the figcaption and the inner `<video>`/`<img>` styling.

**How to fill it in:**

- **Trailer**: drop the video into `public/projects/atlas-arcana/trailer.mp4` (or wherever), then replace the trailer figure with:
  ```html
  <figure class="media media--video">
    <video src="/projects/atlas-arcana/trailer.mp4" controls preload="metadata" poster="..."></video>
    <figcaption>Trailer</figcaption>
  </figure>
  ```
- **Gallery**: replace each `<div class="gallery-slot">N</div>` with `<img src="…" alt="…" />`. Keep the surrounding `<figure class="media media--gallery">` and drop the `data-placeholder` attribute.
- **GIFs**: same as a still — `<img src="/projects/atlas-arcana/…gif" alt="…" />` inside the `figure.media--gif`.

**Decisions worth flagging:**

- **Placeholders use `data-placeholder`** as the only signal that drives the decorative styling. Once you remove it, the same `<figure class="media …">` becomes a clean wrapper. This means "fill in the media" is a one-attribute deletion + content swap, not a class rename.
- **No new components, just HTML + scoped CSS.** I considered an Astro `<MediaSlot />` component imported into the MDX, but the indirection costs more than it saves at this scale — six placeholders in one file, and the pattern (`figure.media + variant + optional data-placeholder`) is portable to any future project's MDX with no import.
- **Year is `'2024'` but flagged as verify.** Capstone timing depends on senior-year window — let me know if it's 2023 or another year and I'll adjust. Also worth flagging: the `role` line ("Co-creator — design, code, sprite work") is a guess about your contribution split with Jackson; please rewrite to fit.
- **No `links` field yet.** Schema requires real URLs (`z.string().url()`), so I omitted rather than stub with `'#'`. Add when you have a trailer URL / itch.io / repo / press link.

---

## 2026-05-21 — Publications → MDX collection, awards system, view transitions, footer constraint

A bigger session: migrating publications to the projects pattern, adding an awards system, wiring real Astro view transitions, and stabilising the footer.

**Publications now mirror the projects pattern (MDX collection + detail page):**

- `src/content.config.ts` — added a `publications` collection (`glob` over `src/content/publications/**/*.mdx`). Schema: `title`, `shortTitle?`, `authors[]`, `venue`, `year: number`, `featured`, `awards?: string[]`, `doi?`, `href?`, `pdfHref?`.
- `src/content/publications/designing-conversations-with-the-dead.mdx` — the *Designing Conversations with the Dead* paper. Abstract is the body. `Honourable Mention` in `awards`. Venue corrected to `Designing Interactive Systems` (the "ACM DIS 2026 · 2026" duplication is gone — the `2026` lives only in the `year` field).
- `src/pages/publications/index.astro` — list page, replaces the old flat `src/pages/publications.astro` (deleted). Uses `getCollection('publications')`, reverse-chrono sort.
- `src/pages/publications/[slug].astro` — new detail route mirroring `projects/[slug].astro`. Eyebrow shows `Publication · {year}`, appending the award name in `--c-accent-fresh` when present. Meta strip (`<dl>`): Venue / Year / Recognition. Body is the MDX (abstract renders under an `## Abstract` h2 styled as a small caps eyebrow). "Elsewhere" footer aggregates DOI / Abstract page / PDF — each only appearing if the field is set.
- `PublicationItem.astro` — rewritten to consume `CollectionEntry<'publications'>`. Title link now goes to the **internal** detail page (`/publications/[slug]`), not arXiv. External links (DOI, PDF) stay as a secondary row beneath the meta line so quick-bypass is still one click. Your name auto-bolds.
- `SelectedWork.astro` — switched from importing the array to `await getCollection('publications')`. Homepage Selected Work block now reads from the collection.
- **Removed:** `src/pages/publications.astro`, `src/content/publications.ts`, `src/content/types.ts` (the last consumer of the `Publication` interface is gone — Zod is now the single source of truth, matching how projects already work).

**Awards system:**

- Schema: `awards: string[] | undefined` — extensible to any award name on any paper, not hardcoded to "Honourable Mention". Multiple awards on one paper render comma-separated.
- **Container augmentation** on `/publications` index and homepage: when a publication has awards, the `<article class="pub">` gets `is-awarded`, which adds a 2px `--c-accent-fresh` left border and `padding-left: 1.25rem`. Echoes the Ideas blockquote's "set apart" idiom (1px hairline + inset) but uses the patina-fresh accent + a thicker rule to signal recognition specifically.
- **Typographic badge**: above the title on each awarded item, an Inter-caps small label in `--c-accent-fresh` — e.g., `HONOURABLE MENTION`. Multiple awards join with `·`.
- **Detail page**: the award appears (a) inline in the eyebrow next to year, in accent-fresh, and (b) as its own `Recognition` row in the meta `<dl>`.

**View transitions (real this time):**

- `src/layouts/Base.astro` — imported `{ ClientRouter }` from `astro:transitions` and added `<ClientRouter />` to the document `<head>`. This enables Astro's MPA-with-view-transitions: it intercepts internal navigations and animates between pages using the browser's View Transitions API, with a graceful fallback to full-page loads where unsupported.
- `src/styles/GlobalStyles.astro` — added `::view-transition-old(root)` / `::view-transition-new(root)` rules overriding Astro's default slide with a 220ms fade (cubic-bezier matches the site's other motion easing). `@keyframes jmm-fade-in` / `jmm-fade-out` defined explicitly. The existing `prefers-reduced-motion` block neutralises animation-duration globally, so reduced-motion users get an instant swap with no fade.
- `src/scripts/patina.ts` — switched the boot handler from `DOMContentLoaded` to `astro:page-load`. With view transitions active, `DOMContentLoaded` fires only on the very first load; `astro:page-load` fires on initial load **and** after every transition swap. Added a `reset()` that cancels the rAF loop and clears the `states` array on each fire, so listeners attach freshly to the new page's `[data-patina]` elements without leaking references to the previous page's DOM. The `visited` set is still loaded once and updated in place — it's session-scoped, so persistence across navigations is exactly what we want.

**Footer constraints + viewport-bottom anchoring:**

- `Footer.astro` — dropped `padding-block: clamp(3rem, 7vh, 5rem)` (viewport-dependent — the main reason the footer felt different between windows / pages) in favour of a fixed `padding-block: 1.5rem 1.75rem`. Added `min-height: 6.5rem` and `align-items: center` so the footer is deterministically sized regardless of inner content shape. Wordmark dropped from `1.0625rem` → `0.9375rem`; email from `1.125rem` → `1rem`; vertical gaps tightened. Net effect: ~40% shorter overall, identical between pages at the same viewport width.
- `Base.astro` + `GlobalStyles.astro` — `<slot />` is now wrapped in `<div class="page-shell">`, and `body` becomes a flex column with `.page-shell { flex: 1 0 auto }`. On short content pages (e.g., `/publications` with one entry), the footer now sits at the viewport bottom instead of floating mid-page above a band of empty background. On long pages it sits naturally at the end of content. This was probably the "different heights" feeling you were noticing — same footer element, different position in the viewport depending on content length.

**Decisions worth flagging:**

- **Title-on-index now links internally**, not to arXiv. Mirrors the projects pattern: cards/items take you to *our* page first, where the abstract + context live; external links are surfaced from the detail page's "Elsewhere" footer. The PDF link still sits as a secondary quick-bypass on the index so a reader who already knows the paper can grab the PDF in one click.
- **Awards are an array of free-form strings**, not an enum of known awards. Cheaper to evolve — if a future paper has "Best Paper Award", `awards: ['Best Paper Award']` works without a schema change. If we later want award-specific styling (gold for Best Paper vs copper for Honourable Mention), we can promote the string to an object then. KISS for now.
- **Detail page authors line** uses Inter (sans), not the serif body type. Citation conventions read better in a more compact face; the title carries the serif weight.
- **The page `<title>` falls back to `shortTitle` when set** — for this paper, browser tabs show "Designing Conversations with the Dead · Jack Manning" instead of the full 84-character title. The full title still appears as the `<h1>` on the page.
- **ClientRouter is on every page, not opt-in per page.** Astro supports per-page transitions, but a portfolio with five routes is exactly the case where global is simpler and the perceived continuity (the wordmark, the SubNav, the footer all "staying put" through a fade) is the win.

**Follow-up tweaks (same day):**

- **Page transitions lengthened from 220ms → 360ms.** Same easing curve. 220ms was right at the threshold of perception; 360ms is a deliberate beat that registers as a transition rather than a flicker, without crossing into "sluggish" territory. Tuned in `GlobalStyles.astro` — single duration value drives both the fade-out and fade-in.
- **Publications now participate in the patina/oxidation system.** Each `<article class="pub">` carries `data-patina="0"` and `data-patina-id={detailHref}`, so the script binds hover/click and decay just as it does for project cards. The visual surface for the patina on publications is two parts: (a) the **title underline** uses the same `color-mix(in oklch, hairline, patina-tint by patina-percent)` formula as the project card border, so the underline transitions from hairline → copper → verdigris as the item is hovered and ages; (b) for `is-awarded` items, the **left border** picks up the same color-mix on `accent-fresh → accent-oxidized`, so awarded items also visibly age while preserving the 2px-vs-1px distinction at rest. Non-awarded items get no left border, keeping the citation list visually quiet.
- **Patina state persists across navigations** via a module-scoped `Map<id, number>` (`patinaCache`). The patina script's module is loaded once and lives across ClientRouter view-transition swaps, so the cache survives. On each `astro:page-load`, when initialising a card's state, we now seed `state.patina` from the cache (falling back to `VISITED_BASELINE` for visited cards, otherwise `0`). If any seeded value is above its floor, we kick the rAF decay loop so the resumed patina settles back down naturally rather than snapping. Every `apply(state)` also writes the latest value to the cache, so any change (hover spike, decay tick, click) is immediately captured. Concretely: hover Digital Legacy Clinic until its border is well-oxidised, navigate to `/publications` and back — the card now sits at whatever level it had when you left, mid-decay.

---

## 2026-05-15 — CV page

**Done:**

- `src/content/cv.ts` — typed CV data: `education`, `talks`, `awards`, `service`, `teaching`, `skills`, plus optional `pdfHref`. Each section is its own array; empty arrays render nothing.
- Seeded `education` with one placeholder entry for the PhD at CU Boulder (Identity Lab, Information Science, 2024–). Verify and edit the field/program/year — best-guess placeholder.
- All other sections start empty. Add entries by appending to the relevant array; the section header and entries appear automatically.
- `src/pages/cv.astro` — typography-driven layout. Each section: small Inter caps eyebrow header → list of entries. Each entry: two-column row (title left, year right) with institution/notes on a second line in muted ink. Hairline dividers between entries. Reads like a research-notebook table-of-contents, not a slide deck.
- **PDF download** rendered conditionally — only appears if `cv.pdfHref` is set. When you drop a `cv.pdf` (or whatever filename) into `public/` and set `pdfHref: '/cv.pdf'`, the "Download PDF →" link appears at the top.
- **`/cv` added to the SubNav** — the brief's full route set from §7 is now wired.
- Build verified: 5 pages — `/`, `/projects`, `/projects/digital-legacy-clinic`, `/publications`, `/cv` — in 788ms.

**Decisions worth flagging:**

- **PDF link is conditional**, not stubbed with a broken href. A broken download link is worse than no link; absence is honest while you prepare the PDF.
- **Skills section uses `<dl>`** (definition list) — semantically correct for category → items pairing. Two-column grid layout.
- **No "Publications" section on the CV page.** Publications already live at `/publications` with the citation format the brief asked for. Duplicating them on `/cv` would be redundant. If you want them on the CV too, easy add — say so and I'll plumb it via `getCollection` style or import from `publications.ts`.

**Site status (all brief §7 routes shipped):**

```
/                            Hero, Ideas, Selected Work, Footer
/projects                    Index — all projects, reverse chrono
/projects/digital-legacy-clinic   MDX-driven detail
/publications                Index — empty until you add an entry
/cv                          Web CV + (conditional) PDF download
```

Site-wide: SubNav on all subpages (auto-hides on home), Footer site-wide, patina interaction on all project cards.

**What you'll want to fill in:**

- `src/content/cv.ts` — verify Education entry, add Talks/Awards/Service/Teaching/Skills as relevant.
- `public/cv.pdf` (or similar) + set `cv.pdfHref` in `src/content/cv.ts`.
- `src/content/publications.ts` — first publication entry.
- `src/content/contact.ts` — real GitHub + LinkedIn URLs.
- `src/content/projects/digital-legacy-clinic.mdx` — refine the prose I drafted.
- Additional `.mdx` files in `src/content/projects/` for any other projects.

---

## 2026-05-15 — Patina system (v1)

**Done:**

- `src/scripts/patina.ts` — vanilla TS module, ~80 lines. Implements the brief §6 patina interaction:
  - Each `[data-patina]` element gets a per-card state object (patina value 0–1, hovering flag, visited flag, id from `href`).
  - Hover bumps `--patina` by `0.18` (capped at 1.0); a lazy `requestAnimationFrame` loop decays it back at `0.004/frame` (~0.24/s) after mouseleave.
  - The rAF loop only runs while at least one card has patina above floor; it returns `frameId = null` when everything's settled. No idle CPU cost.
  - Click records the card's `href` in `sessionStorage` under key `jmm:visited`. Visited cards have a baseline patina of `0.12` at rest — invisible to a first-time visitor, faint to someone clicking around.
  - `prefers-reduced-motion`: skips hover/decay listener registration entirely. Visited cards still apply their baseline as a static value.
- `ProjectCard.astro` updated:
  - `data-patina="0"` on the anchor element.
  - Removed `:hover` border rule. Border color now driven by nested `color-mix(in oklch, …)`: hairline mixed with a fresh→oxidized tint, weighted by `--patina`. So patina = 0 → hairline; patina rising → copper-tinted; patina near 1 → verdigris-tinted.
  - All animation is on `border-color` via the existing transition; no transforms, no shadow changes — restrained per brief §12.
- `Base.astro`: imports the patina script via Astro's `<script>` (bundled by Vite, emitted as inline ES module in `<head>`).
- Build verified: 4 pages still build cleanly in ~770ms. Script inlined per page; `data-patina="0"` present on every rendered card on `/` and `/projects`.

**Decisions worth flagging:**

- **Vanilla TS, not React.** Earlier architecture decision was "React for interactive UI" — but that decision was driven by the styled-components SSR friction, which doesn't apply here (no styled-components, no React, no SSR collection problem). The patina is a tiny enhancement on existing DOM, not a stateful component rebuild. Total cost: one small module loaded once.
- **`color-mix(in oklch, …)` nested** for the border interpolation. OKLCH gives perceptually-uniform color mixing — important for the patina to feel like genuine aging rather than a hue rotation. Supported in every browser shipped 2023+.
- **Within-session visited persistence only.** Brief open question #8: "Build the within-session version first; decide on persistence after living with it." Cross-session via `localStorage` is one one-liner change away (swap `sessionStorage` for `localStorage`) when you decide.
- **No cursor trail.** Brief #4 said default to "cut" unless it feels earned in prototype. It doesn't feel earned for v1 — the per-card patina already does the "site is gaining wear" job. Easy to add later if desired.
- **Performance characteristics:**
  - When idle (nothing hovered): zero JS work. The rAF loop is stopped.
  - When hovering: one event, one CSS variable write, no layout work (border-color doesn't reflow).
  - When decaying: one rAF tick per active card per frame, capped by number of cards (currently 1) — sub-microsecond.

**Try it:** hover Digital Legacy Clinic a few times — note the border picking up warmer, then aging slightly. Click into it — return to home or /projects, the card now sits at a faint copper baseline. Set System Settings → Accessibility → Display → Reduce Motion (or DevTools rendering panel: "Emulate prefers-reduced-motion: reduce") and the hover effect cleanly disables.

---

## 2026-05-15 — Project detail template + content-collection refactor

**Done:**

- **Migrated projects to Astro content collections.** New `src/content.config.ts` defines a `projects` collection via the `glob()` loader + a Zod schema covering `title`, `year`, `description`, `tags`, `featured`, `role`, `collaborators`, `links`, `related`, `href`. Type-safe, schema-validated at build.
- **First project as MDX**: `src/content/projects/digital-legacy-clinic.mdx` — frontmatter (title, year, description, tags, featured, role, collaborators) plus three short paragraphs of draft prose. Yours to refine.
- **Dynamic detail route**: `src/pages/projects/[slug].astro` — uses `getStaticPaths()` to pre-generate one HTML file per project at build. Layout:
  - Eyebrow `Project · {year}` + h1 title + muted description
  - Optional info strip (`<dl>`): `Role` / `With` — only renders if frontmatter provides them
  - MDX body rendered via `render(project).Content`, with `:global()` prose styles for paragraphs, h2/h3, blockquote, lists, links, and images
  - Optional "Elsewhere" footer for external links (frontmatter `links: [{label, href}]`)
- **Index page moved** from `src/pages/projects.astro` → `src/pages/projects/index.astro` so `/projects` and `/projects/:slug` coexist cleanly under one directory.
- **`ProjectCard` updated** to consume `CollectionEntry<'projects'>` shape (`.id` and `.data.*` instead of flat properties).
- **`SelectedWork` updated** to await `getCollection('projects')` and filter by `data.featured`.
- **Removed** `src/content/projects.ts` (superseded by the MDX collection). `src/content/types.ts` trimmed to the `Publication` interface only — `Project` and `ProjectTag` now live in Zod form in the config.
- Build verified: 4 pages — `/`, `/projects`, `/publications`, `/projects/digital-legacy-clinic` — in 746ms.

**How to add a new project (the brief's promised 2–3 step flow):**

1. Drop a new `.mdx` file in `src/content/projects/` with frontmatter (see `digital-legacy-clinic.mdx` as template).
2. Optionally set `featured: true` to surface it on the homepage Selected Work.
3. Commit. The card appears on `/projects`, the detail page is auto-generated.

**Decisions worth flagging:**

- **Zod schema lives in `content.config.ts`, not `types.ts`.** Single source of truth: change a tag's allowed values once, both the type and the schema update.
- **`:global()` for prose styles.** MDX-rendered HTML doesn't pick up Astro's scoped class names, so the prose CSS opts out of scoping selectively (only for elements inside `.prose`). Cleaner than blanket `is:global`.
- **Detail page max-width is `65ch`** vs index pages' `70ch`. Slightly narrower for long-form reading comfort, still wider than the `60ch` Hero where the column width does shorter-form work.
- **`Publication` still uses a plain TS array.** Not migrated to a collection yet — no publication MDX content exists. When the first publication has a detail page, we'll mirror the projects pattern.

---

## 2026-05-14 — Index pages: /projects, /publications + subpage nav

**Done:**

- `src/pages/projects.astro` — reverse-chronological list of all projects (not just `featured`). Reuses `ProjectCard`. Sort key parses the leading 4 digits of `project.year` so "2023–" ranges work.
- `src/pages/publications.astro` — reverse-chronological list of all publications. Reuses `PublicationItem`. Sort by `year` (numeric). Currently empty (no data); renders only the PageHeader. The list block conditionally appears when entries exist, so adding the first publication "wakes up" the page.
- `src/components/molecules/PageHeader.astro` — reusable subpage header (h1 + optional subtitle). Title sized smaller than the homepage hero (3.25rem vs 4rem) to signal "subpage." Reused on both index pages and is ready to drop into `/cv` and project/publication detail pages.
- `src/components/organisms/SubNav.astro` — minimal top nav for subpages. Left: clickable wordmark linking home. Right: `Projects · Publications` middot-separated. `aria-current="page"` on the active link; the active link uses ink color (others stay muted). Hairline border below mirrors the section dividers.
- `Base.astro` now detects the homepage (`Astro.url.pathname === '/'`) and only renders `SubNav` on non-home pages. Homepage stays self-contained per brief §7's single-scroll intent.
- `Footer.astro` wordmark is now an anchor to `/`. Color shifts to ink on hover.
- Build verified: 3 static pages (`/`, `/projects`, `/publications`) in 573ms.

**Decisions worth flagging:**

- **No `/cv` link in the SubNav yet.** Adding a nav link to a page that doesn't exist would 404 the user and violates "no coming soon" framing. The link goes in the moment we ship `/cv`.
- **Active state styling**: active page link uses `--c-ink` (not the accent color). The accent is reserved for hover/affordance signals; a static "you are here" doesn't need that intensity.
- **Empty /publications state**: page renders header only, no "More to come" or "Coming soon" copy. Honest, quiet. When the first entry lands, the list appears.
- **Same `70ch` container** as Hero/Ideas/SelectedWork — visual rhythm preserved across pages.

---

## 2026-05-14 — Footer (site-wide)

**Done:**

- `src/content/contact.ts` — single source of truth for footer data: `email`, `wordmark`, `links[]`. Edit this file to swap in real URLs or add platforms.
  - Email: `jack.manning@colorado.edu` (Jack's preference).
  - Links: GitHub and LinkedIn, both with `href: '#'` placeholders. Replace with real URLs when ready.
- `src/components/organisms/Footer.astro` — text-only, no icons (brief §5 favors restraint). Asymmetric two-zone layout at `≥820px`:
  - Left: `jackmanning.me` wordmark in muted.
  - Right: email (main ink color, body+ size, underlined) on top; `GitHub · LinkedIn` middot-separated below in Inter caps muted.
  - Stacks centered on mobile.
- Social links open in new tab with `rel="noopener noreferrer me"` — the `me` token is the IndieWeb microformat for verified-identity links.
- Hairline border at top of footer matches the section dividers between Hero / Ideas / SelectedWork — visual consistency.
- Wired into `Base.astro`, so the footer renders on every current and future page automatically.
- Build verified, 539ms.

**Decisions worth flagging:**

- **Email is the prominent element** of the contact zone, not the wordmark. Brief §8 says email should be "one click away from any page" — visual weight reflects that priority.
- **No copyright line, no "© 2026"**. Brief is silent on it and it would add chrome without adding signal.
- **Middot separators** between social links (matching the meta-line treatment in eyebrows and project cards) rather than a `gap`-only flex layout — keeps a typographic rhythm across the site.

**What you need to fill in:**

- Real GitHub URL in `src/content/contact.ts` (replace `'#'`).
- Real LinkedIn URL in `src/content/contact.ts` (replace `'#'`).

---

## 2026-05-14 — Selected Work section + content data layer

**Done:**

- **Content data layer** (per brief §9):
  - `src/content/types.ts` — `Project` and `Publication` interfaces, `ProjectTag` union. `featured: boolean` per entry drives which items surface on the homepage.
  - `src/content/projects.ts` — one real entry (`digital-legacy-clinic`) with year/description/tags. Jack edits this file to add more.
  - `src/content/publications.ts` — empty array initially. Renders nothing until Jack adds the first publication.
- **Molecules:**
  - `ProjectCard.astro` — softbox: surface fill, hairline border, 16px radius, generous padding. Meta line above title (year · tag · tag), title, description. Hover: border picks up `--c-accent-fresh`. Whole card is the anchor.
  - `PublicationItem.astro` — citation-line format. Jack's name (`'Jack Manning'`) bolded automatically when found in the authors array. APA-style separator logic (single name; `A & B` for two; `A, B, & C` for three+). DOI/PDF link row appears only if those fields exist.
- **Organism:**
  - `SelectedWork.astro` — reads from both data files, filters by `featured`. Shows a Projects block (stacked cards) and a Publications block (line-divided list). Each block hides cleanly if it has no entries. "See all projects/publications →" links sit beneath each subsection.
- **Homepage** now renders `Hero → Ideas → SelectedWork` — all three single-scroll sections per brief §7 are in.
- Build verified, 570ms.

**Decisions worth flagging:**

- **No internal subheads** ("Projects", "Publications"). One eyebrow "Selected Work" covers the whole section; the visual treatment (cards vs list) and "See all" links do the labeling work. Quieter than nested headings.
- **Single-column stacked cards** (not a grid). For a curated 3-ish selected projects, stacked reads as "consider each" rather than "browse." A grid layout will be the `/projects` index page's job later.
- **Card hover** is just a border color shift to `--c-accent-fresh` — no transform, no shadow change. Restrained per brief §12. This is also a natural docking point for the patina system later — the hover state already references the "fresh" accent.
- **No projects.ts placeholders beyond Digital Legacy Clinic.** A "Featured project A" / "TODO" entry would render on the page during dev, which violates the brief's "no coming soon" rule. The section gracefully renders one card; you add the second + third by appending to the array.
- **Broken `/projects` and `/publications` routes** are expected at this stage — those pages don't exist yet. Links go nowhere until we build the index pages next.

**What you need to fill in:**

- Additional entries in `src/content/projects.ts` (anything else you want featured on the homepage with `featured: true`).
- The first entry in `src/content/publications.ts` — title, authors (use `'Jack Manning'` exactly so the bold rule fires), venue, year, DOI/PDF if available.
- A refined description for Digital Legacy Clinic if mine is off.

---

## 2026-05-14 — Ideas section: 2-column + centered poem

**Done:**

- Restructured `Ideas.astro` into a 2-column grid at `≥820px` (stacks below). Left column: prose + questions. Right column: poem.
- Poem text now centered at all widths; max-width per paragraph (46ch) so lines don't sprawl when stacked on mobile.
- Dropped the left hairline border on the poem — the column gap and alignment shift carry the visual "set apart" signal in the 2-column case; redundant when poem is centered.
- Eyebrow ("Ideas") spans both columns at the top, anchoring the whole section.
- Outer container grew from `60ch` to `100ch` to accommodate two columns at proper breathing room. Column gap scales: 4rem at md, 6rem at lg.

---

## 2026-05-14 — Ideas section (v1 draft)

**Done:**

- `src/components/organisms/Ideas.astro` — static `.astro` component, scoped styles. Structure mirrors brief §7.2:
  - Eyebrow caption ("Ideas") matching the Hero eyebrow treatment for visual continuity.
  - Two-paragraph prose framing: research north star (digital legacies, symbolic inheritance) and adjacent threads (*death and data*, *generative ghosts*, italicized inline). Em-dashes used as the rhythmic device.
  - "Some of the questions I keep circling:" — a list of four research questions with hanging em-dash markers (`::before` pseudo-element, no `<ul>` glyph). Smaller line-height between items, generous spacing above the block.
  - The Van Dyke poem as `<blockquote cite>`, paragraphs preserved verbatim from the brief, set in Fraunces regular at 1.1875rem with line-height 1.7. Left hairline border + small inline padding to signal "set apart" without ornament. Attribution in Inter small with italic Fraunces for the work title.
- Hero eyebrow updated: "PhD student · Identity Lab, CU Boulder" (per your input — dropped "Incoming", added affiliation).
- Homepage now renders `Hero → Ideas` (§7 single-scroll order, steps 1–2).
- A single `border-top: 1px solid var(--c-hairline)` between Hero and Ideas to mark the section break without a decorative divider.

**Decisions worth noting:**

- Poem **not italicized**. Italic long-form is hard to read; Fraunces italic is reserved for inline emphasis (the hook in Hero, work titles in attribution).
- Poem block uses a 1px left rule + 1.25rem inline-start padding. This is the most restrained "blockquote treatment" I could justify — enough to signal that the poem is quoted, not enough to feel decorative.
- Questions list uses semantic `<ul>` with `list-style: none` and a `::before` em-dash, so it remains screen-reader-traversable as a list.

**Drafted content awaiting your refinement:**

- The two-paragraph research framing is mine — plausible based on the brief but you'll want to own the wording.
- The four questions are also mine. They're meant to gesture at the territory; replace freely.

---

## 2026-05-14 — Homepage hero (v1 draft)

**Done:**

- `src/components/organisms/Hero.astro` — static `.astro` component with scoped `<style>`. Structure: eyebrow caption (Inter, uppercase, muted), large name (Fraunces, weight 400, fluid clamp), tagline (Fraunces, regular), italic hook below in muted ink.
- Imported `@fontsource-variable/fraunces/wght-italic.css` in `Base.astro` so the italic hook renders as real Fraunces italic (not synthesized slant).
- Homepage (`/`) now renders the hero in place of the placeholder.
- Verified build (505ms, 1 page). Dev server at `http://localhost:4321/`.

**Drafted copy (awaiting Jack's refinement):**

> RESEARCHER · INCOMING PHD STUDENT
>
> **Jack Manning**
>
> I study digital legacies — playlists, recipes, voicemails. The artifacts people leave behind that aren't worth anything, except to someone.
>
> *Most of what we inherit was never meant to last.*

Intent of the copy:
- No "Hi, I'm" framing.
- The eyebrow does the role-identification work so the name stands alone.
- The tagline names the specific objects of study (concrete > abstract).
- The italic hook is the "earn the next scroll" line — it raises a question rather than answering one, in line with the brief's "charmed and slightly off-balance" target.

---

## 2026-05-14 — Foundation: theme, fonts, globals, architecture pivot

**Done:**

- **Type pairing locked:** Fraunces Variable + Inter Variable, self-hosted via Fontsource (`@fontsource-variable/fraunces`, `@fontsource-variable/inter`). Imported in `Base.astro`.
- **Theme tokens** in `src/theme/tokens.ts`: full palette (light + dark hex values), serif/sans font stacks, fluid type scale via `clamp()`, line-heights, prose measures, spacing scale, radii, motion durations + easing, breakpoints.
- **Theme object** in `src/theme/theme.ts`: exposes `theme.colors.*` as CSS variable references (e.g., `var(--c-ink)`), enabling typed styled-components access while keeping dark-mode driven by pure CSS.
- **TS module augmentation** in `src/theme/styled.d.ts` so `styled-components`' `DefaultTheme` is our typed shape.
- **GlobalStyles.astro** in `src/styles/`: a single `<style is:global>` block driven by `tokens.ts` via `set:html`. Declares CSS variables under `:root` and `@media (prefers-color-scheme: dark)`. Includes reset, base typography, link styles, `:focus-visible`, `::selection`, image defaults, and `prefers-reduced-motion` neutralization.
- **Base.astro layout** in `src/layouts/`: HTML shell with meta, favicons, font imports, `<GlobalStyles />` injection. No React wrapper at layout level (React context can't cross from .astro into islands).
- **ThemeProvider** in `src/components/providers/`: light wrapper around `styled-components` `ThemeProvider` for use inside React islands that need themed styled-components.
- **Build verified:** Global CSS emits to `<head>`, dark mode swaps via `prefers-color-scheme` with zero JS.

**Architecture pivot — hybrid model:**

Empirical test confirmed that Astro's default React renderer does **not** collect styled-components SSR styles. Server-rendered React components emit class names without backing CSS; only `client:*` directives can hydrate them, and those FOUC briefly on first paint.

In light of this, revised the component strategy from "React-first, Astro as shell" to **hybrid**:

- **Static UI** (hero, prose, headings, nav, footer, cards, lists) → `.astro` components with scoped `<style>` blocks. No JS, no FOUC. The Astro global style block already covers palette + fonts + base typography, so component-level styles are typically thin.
- **Interactive UI** (the patina system, any toggle, animated bits) → React + styled-components, rendered as islands with `client:load`/`client:visible`. ThemeProvider wraps each island.

This is a deliberate, narrow deviation from a strict reading of the brief's "styled-components only" rule. The intent of that rule (consistent component styling for any actual component-author work) is preserved — styled-components is the choice anywhere a React component is doing the styling. The pivot is documented here as the path that respects both the brief's "quiet, considered" perceived-quality goal and the actual SSR landscape.

**Workaround documented:**

- `styled-components` 6 + Astro/Vite requires `import { styled } from 'styled-components'` (named import) rather than the default. The default import wraps under SSR and breaks with "styled.div is not a function". Anything React + styled-components going forward uses the named import.

**Project structure (current):**

```
src/
├── components/
│   └── providers/
│       └── ThemeProvider.tsx
├── layouts/
│   └── Base.astro
├── pages/
│   └── index.astro            # placeholder
├── styles/
│   └── GlobalStyles.astro
└── theme/
    ├── styled.d.ts
    ├── theme.ts
    └── tokens.ts
```

---

## 2026-05-14 — Scaffold complete

**Done:**

- Astro 6.3 scaffold via `create-astro` (minimal template, TS strict).
- Added integrations: `@astrojs/react` 5.0 (React 19), `@astrojs/mdx` 5.0.
- Added `styled-components` 6.4 + `@types/styled-components` (devDep).
- `astro.config.mjs` configured with `site: 'https://jackmanning.me'`.
- `package.json` renamed `jackmanning-me`, `version: 0.1.0`, marked `private`.
- Production build verified: 1 page, 582ms, no errors.

**Project structure (current):**

```
.
├── DESIGN_BRIEF.md
├── DEVLOG.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/         # favicon stubs
└── src/
    └── pages/
        └── index.astro   # placeholder
```

**Deferred (not blocking, will revisit):**

- `babel-plugin-styled-components` — only needed if SSR class-name hydration mismatches show up. The current pipeline (build-time React → HTML) should produce stable hashed class names; we'll add the plugin reactively, not prophylactically.
- Git init + GitHub Pages Actions deploy — wait until structure stabilizes.
- `CNAME` file for `jackmanning.me` — added at deploy time.

---

## 2026-05-14 — Project kickoff

**Status:** Repository initialized with `DESIGN_BRIEF.md` only. Beginning scaffold.

**Decisions locked in this session:**

- **Framework:** Astro with React islands, per §10 of the brief.
- **Styling architecture:** React-first, Astro as shell. All UI lives in React components styled with `styled-components`. `.astro` files serve as thin layout/routing shells. Server-render React to static HTML by default; add `client:*` directives only for interactive islands (patina system, dark mode toggle if added). This honors the brief's "styled-components only" rule while keeping page weight low.
- **Package manager:** npm (only one installed in the environment).
- **Node:** v26.0.0.

**Tradeoff documented:** styled-components requires a runtime on hydrated islands (small JS cost). Static React components rendered at build time ship no JS. Plain `.astro` markup (e.g., `<Layout>` shells) is fine to use scoped CSS *only* for genuine page-chrome concerns where styled-components has no React tree to attach to — but the default is React + styled-components.

---
