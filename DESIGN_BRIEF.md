# Design Brief — jackmanning.me

A personal portfolio for Jack Manning, PhD student researching digital legacies.

---

## 1. Project Summary

A multi-page personal portfolio at `jackmanning.me` for Jack Manning, an incoming PhD student whose research centers on digital legacies — particularly symbolic, sentimental, ephemeral artifacts (playlists, recipes, voices) rather than financial inheritance. The site serves as a credibility anchor and collaboration on-ramp for other researchers and PhD students Jack meets at conferences and through academic networks. It also lays groundwork for future internship and grant applications.

The site should feel like an antidote to the typical academic homepage. Where the default is `university.edu/~name/index.html` — beige, dense, lifeless — this site should be quietly considered, warm, and witty. The work comes first; the vibe earns trust by signaling that Jack thinks carefully about form as well as content.

---

## 2. Audience & Goals

**Primary audience:** Other researchers and PhD students — people who read papers all day, are sophisticated readers, and are not necessarily technical. They are evaluating Jack as a potential collaborator on papers, projects, or research initiatives.

**Secondary audience (future):** Hiring managers and grant committees for internships and funded opportunities.

**Tertiary audience:** Anyone Jack points to the site from LinkedIn, email signatures, or conference business cards.

**Primary goal:** Encourage reach-out and collaboration. Make contact frictionless and inviting.

**Secondary goal:** Encourage perusal of multiple projects rather than driving toward a single conversion target. The breadth itself is part of the pitch.

**What the site is NOT optimizing for:** Cold traffic, SEO-driven discovery, or non-academic audiences.

---

## 3. Tone & Personality

Three words, in order of weight:

- **Curious** — the site should communicate hunger for knowledge across fields
- **Technical** — credibility through craft; the site itself is evidence of capability
- **Playful** — witty, not bouncy; small surprises, not bright colors and bounce animations

The benchmark: a visitor arrives expecting an academic page. By the time they've scrolled past the hero, they should be charmed and slightly off-balance — in a good way. They should feel they've found someone who thinks carefully.

**Tone is quiet, warm, and slightly melancholic — but not sad.** Considered. The opposite of energetic. Closer to a well-designed magazine or research notebook than a SaaS landing page.

---

## 4. Thematic Concept

The site has a quiet thematic resonance with Jack's research without ever being heavy-handed.

A portfolio is, in a small way, a digital legacy in miniature — a curated set of artifacts left for someone to find. The site leans into this gently. The aesthetic is one of **cherished things, not slick products**: paper, not plastic. Objects you could pick up. Surfaces that show wear.

This concept anchors several design decisions documented below (softboxes as artifacts, the patina system, typography choices, palette). The connection should be subtle enough that a casual visitor doesn't consciously register it, but a thoughtful visitor — exactly the audience — would notice and appreciate it on a second pass.

**Anchor text — to appear in the "Ideas" section of the homepage:**

> I am standing upon the seashore. A ship, at my side, spreads her white sails to the moving breeze and starts for the blue ocean. She is an object of beauty and strength. I stand and watch her until, at length, she hangs like a speck of white cloud just where the sea and sky come to mingle with each other.
>
> Then, someone at my side says, "There, she is gone."
>
> Gone where?
>
> Gone from my sight. That is all. She is just as large in mast, hull and spar as she was when she left my side. And, she is just as able to bear her load of living freight to her destined port. Her diminished size is in me — not in her.
>
> And, just at the moment when someone says, "There, she is gone," there are other eyes watching her coming, and other voices ready to take up the glad shout, "Here she comes!"
>
> And that is dying.
>
> — Henry Van Dyke, *Gone From My Sight*

This poem is the thematic spine of the site. The presentation should be unhurried — generous whitespace, considered typography, no decoration that would cheapen it.

---

## 5. Visual Language

### Typography

A two-typeface system:

- **Display / body serif** — a contemporary humanist serif that signals warmth, considered thought, and academic seriousness without feeling like Times New Roman. Direction: Fraunces, Source Serif 4, or similar. Avoid anything overly editorial or revival-flavored. Pick one with strong italic and a range of weights.
- **UI / supporting sans** — a clean, neutral sans for navigation, captions, metadata, buttons. Direction: Inter, IBM Plex Sans, or similar. Used sparingly. The serif does the heavy lifting.

Type sizes should be generous. Body copy reads comfortably at 18–20px on desktop. Line length restrained (60–75 characters max).

### Palette (light mode)

The palette should feel like **patina** — warm, considered, low-saturation. Final hex values to be determined in implementation, but the directional palette:

- **Background:** Warm off-white / cream (not pure #fff)
- **Surface (softbox fill):** Slightly tinted from background, a half-step warmer or cooler
- **Ink (primary text):** Deep, soft black-brown — not pure #000
- **Muted text:** A desaturated mid-tone for metadata, captions
- **Accent:** A copper / aged-bronze hue — the "fresh" end of the patina spectrum
- **Accent (oxidized):** A muted verdigris green — the "aged" end of the patina spectrum
- **Border / hairline:** A whisper of warm gray

### Palette (dark mode)

**Dark mode is intentional, not inverted.** Designed as a parallel palette, not a CSS hue flip.

- **Background:** A deep, warm near-black with brown undertones (not cool gray, not pure #000)
- **Surface (softbox fill):** A slightly elevated warm tone, just barely lighter than background
- **Ink:** Warm off-white / cream
- **Muted text:** A desaturated warm gray
- **Accent (fresh):** Copper, adjusted for dark-mode contrast — likely warmer and slightly brighter than light-mode equivalent
- **Accent (oxidized):** Verdigris, similarly tuned

The site honors `prefers-color-scheme` by default. A manual toggle is *optional* — flag for implementation discussion.

### Softboxes

Softboxes are a **recurring accent element, not the dominant skin.** The reason: if every surface is a softbox, the site reads as a design-system demo. When softboxes appear discretely — project cards, the publication list, an interactive filter — they become a signature.

Direction: rounded corners (probably 12–20px radius), low-contrast tinted surfaces against the page background, restrained shadows that suggest weight rather than depth. **Not neumorphism. Not claymorphism. Not glassmorphism.** Closer to the Linear/Stripe/Vercel school but warmer, less corporate. Think *paper resting on paper*, not *plastic floating in space*.

Each softbox should feel like an object you could pick up.

### Iconography

Minimal. Where icons appear, they're line-weight, restrained, monoline. No filled icon sets. No emoji used as decoration in UI chrome (emoji may appear in *content* — a project description, a fun aside — at Jack's discretion).

---

## 6. The Patina System

This is the site's signature interaction. **One quiet idea, executed well.**

**Concept:** Elements that the visitor interacts with accumulate subtle wear over the course of a session (and, optionally, across sessions via localStorage). The accent color shifts on a spectrum from fresh copper toward oxidized verdigris based on engagement. The site itself becomes a digital artifact gaining patina.

**Implementation directions (to be refined in build):**

- **Hover-based:** Project cards, links, and interactive elements pick up a faint patina hue on hover that lingers briefly after the cursor leaves, then fades. Not a binary state — a gradient that accumulates with repeated hover.
- **Visit-tracked:** Visited project cards retain a slightly aged accent indefinitely (or for the session). Subtle enough that a first-time visitor doesn't notice; a returning visitor or someone clicking around might.
- **Cursor:** Optionally, the cursor leaves a faint trail that fades within a second. Use sparingly — this is the one place over-engineering is most tempting. If it doesn't feel earned, cut it.

**Constraints:**

- The effect should be **noticeable on the second visit, not the first.** A first-time visitor should experience the site as quietly handsome. The patina is a reward for paying attention.
- **Respect `prefers-reduced-motion`.** Patina shifts should fade more aggressively or be disabled entirely.
- **Performance budget:** Whatever this costs should be negligible. No janky transitions, no continuous animation loops eating CPU.

---

## 7. Site Structure

A **hybrid** structure: single-scroll homepage, dedicated multi-page sections for content that needs room to breathe.

### Top-level routes

- `/` — Homepage (single scroll: intro → ideas → selected work)
- `/projects` — Projects index + individual project pages (`/projects/[slug]`)
- `/publications` — Publications list + individual publication detail pages (`/publications/[slug]`)
- `/cv` — CV page with embedded content + downloadable PDF
- `/contact` — Optional dedicated contact page, OR contact lives in the footer everywhere

### Homepage flow (single scroll)

1. **Hero / intro** — Jack, who he is, a short tagline. Generous whitespace. No "hi, I'm" cliché — write something that earns the visitor's next scroll.
2. **Ideas** — Current research north star (digital legacies, symbolic inheritance), adjacent interests (death and data, generative ghosts), a few research questions Jack is chasing, and the Van Dyke poem as anchor. Compact but not cramped.
3. **Selected work** — A curated subset of projects + publications. Not the full list. The full lists live on their dedicated pages. Link to those pages clearly.
4. **Footer / contact** — Email, relevant social links (Google Scholar, GitHub, LinkedIn, ORCID — whichever Jack actually uses), domain wordmark.

### Future-proofing

The architecture must accommodate, without restructure:

- A **Writing** section (essays, notes, blog posts)
- A **Talks** section (conference appearances, invited talks)
- A **Teaching** section (courses TA'd or taught)
- A **Now** page (current focus, what's actively in progress)

No visible "coming soon" placeholders. The data layer and routing should be set up such that adding any of these sections is a matter of populating content, not building infrastructure.

---

## 8. Page-by-Page Breakdown

### Homepage (`/`)

Covered in §7. The homepage is the showcase — it should feel intentional, with enough air for each section to land. Selected work is curated, not exhaustive.

### Projects index (`/projects`)

Reverse chronological list of all projects. Each entry is a softbox card with: title, year, one-line description, tags (research / code / experiment / essay / etc.), thumbnail or visual if relevant. Clicking opens the project detail page.

No filtering UI at launch — chronological is enough for the current volume. If projects grow past ~20, revisit.

### Project detail (`/projects/[slug]`)

A space for projects that span time and have substance. The Digital Legacy Clinic, for example, has multiple years of context. These pages should accommodate:

- A header with title, date range, role, collaborators
- Long-form prose (MDX)
- Embedded images, video, or interactive demos
- Links to live artifacts, papers, code
- Related publications or projects

Typography-driven. Reads like a thoughtful essay, not a case study slide deck.

### Publications index (`/publications`)

Reverse chronological. Each entry: title, authors (Jack's name emphasized), venue, year, links (paper PDF, DOI, project page). Clean, citation-like presentation. Softbox treatment optional — may read better as a more traditional list given the genre.

At launch: one publication. The structure should not look empty with one entry. Consider how a single entry presents.

### Publication detail (`/publications/[slug]`)

For publications that have a project page, a video, or additional context. May not be needed for every publication — some entries on the index page may just link out to the paper. Build the route; populate as warranted.

### CV (`/cv`)

A web-native presentation of the CV, plus a prominent download link for the PDF. The web version should be readable in the same tone as the rest of the site, not a literal HTML port of an academic CV template. Sections likely include: education, publications, talks, awards, service, skills.

The PDF is canonical; the web version is for casual scanning.

### Contact

Either a dedicated `/contact` page or a persistent footer treatment site-wide. Decide at implementation time based on how the footer is shaping up. Either way, email should be one click away from any page.

---

## 9. Content Architecture

### Authoring format

**MDX for long-form content** (project detail pages, publication detail pages, future writing). MDX lets Jack write prose naturally and embed React components when a project page needs an interactive demo, custom layout, or media element.

**TypeScript data files for structured metadata** (project lists, publication entries, CV data). This gives type safety, autocomplete, and predictable iteration in components — at the cost of editing code to add an entry, which is fine given Jack's comfort level.

### Suggested folder structure

```
content/
  projects/
    [slug].mdx                  # long-form project pages
    index.ts                    # ordered list, metadata, frontmatter typing
  publications/
    [slug].mdx                  # optional detail pages
    index.ts                    # publication entries
  cv/
    cv.ts                       # structured CV data
    jack-manning-cv.pdf         # downloadable canonical version
  ideas.ts                      # homepage "ideas" content
  bio.ts                        # homepage hero / about content
```

Exact paths to be finalized at implementation. Folder structure should reflect content types, not page routes.

### Adding new content

The doc Jack writes for himself (or for Claude Code) should make adding a new project or publication a 2–3 step process: drop a new MDX file, add an entry to the index TS file, commit.

---

## 10. Technical Stack

### Confirmed

- **React** (for component layer)
- **styled-components** (for styling — no CSS modules, no plain CSS files, no inline styles unless explicitly justified)
- **TypeScript** (assumed; revisit if Jack prefers plain JS — but for a multi-page content site with typed data, TS pays for itself fast)
- **GitHub Pages** for hosting
- **MDX** for long-form content
- **TS data files** for structured metadata
- **Custom domain:** `jackmanning.me`

### Framework recommendation: Astro with React islands

**Recommendation:** Build with **Astro**, using React components as islands where interactivity is needed.

**Why:**

- Astro is built for content-heavy multi-page sites with MDX as a first-class citizen.
- Output is static HTML by default, which is exactly what GitHub Pages serves natively.
- Less JavaScript shipped to the browser by default than a SPA — pages load fast, feel quiet, and align with the "considered, not heavy" aesthetic.
- React components for interactive elements (the patina system, any animated transitions, dark mode toggle if added) work seamlessly as islands.
- styled-components integrates via Astro's React renderer.

**Tradeoffs to document:**

- **Astro is a new framework for Jack to learn** if he hasn't used it. The learning curve is moderate but real. The mental model is "HTML-first with React where you need it" rather than "React for everything."
- **Some styled-components patterns require minor setup** for SSR-style static generation. Solvable, but a small configuration cost up front.
- **Astro's component syntax (`.astro` files)** is its own thing — markup-heavy, scoped CSS by default. Jack will write some non-React markup. Worth confirming this is acceptable before committing.

### Alternative: Vite + React + React Router

A pure-React alternative if Astro feels like too much novelty.

**Tradeoffs:**

- **Pure React** — no new framework to learn.
- **Client-side routing** — needs a `404.html` redirect hack to work properly on GitHub Pages (a well-known workaround, but a workaround).
- **Ships more JavaScript** for what is fundamentally a content site. Pages with no interactivity still arrive as a JS bundle.
- **MDX integration** is doable via plugin but feels less native than in Astro.
- **SEO** is weaker out of the box; client-rendered content needs extra setup to be crawlable. Less critical for this audience but worth noting.

### Decision left open

The final framework decision is left to implementation. The recommendation above stands, but Jack should make the call when development begins. If Astro is selected, this brief's component architecture (atomic design) still applies to the React islands; the `.astro` pages serve as the layout/composition layer.

---

## 11. Component Architecture

The site follows **atomic design**:

- **Atoms** — smallest units: buttons, inputs, labels, icons, the patina-aware Link, typography primitives (Heading, Body, Caption)
- **Molecules** — combinations of atoms: project card header, publication list item, contact link group, CV section header
- **Organisms** — combinations of molecules: full project card, full publication entry, the homepage Ideas section, navigation bar, footer

All components use **styled-components**. No CSS modules, no plain CSS files, no inline styles unless explicitly justified in context.

A `theme` object holds palette tokens, typography scale, spacing scale, radii, and patina-state colors. Light and dark themes are siblings, not transformations of each other.

### Naming convention

Components in PascalCase. Files match component names. Folder structure mirrors atomic layers:

```
src/
  components/
    atoms/
    molecules/
    organisms/
  theme/
  hooks/
  utils/
```

---

## 12. Motion & Interaction Principles

### What's in

- **Page transitions:** Minimal fade in / fade out between routes. Nothing more.
- **Hover states:** Very gentle. Color shift, subtle softbox elevation change, faint patina pickup. Never dramatic.
- **The patina system** (see §6) as the primary "alive" element of the site.

### What's out

- No scroll-jacking, no scroll-snapping, no parallax
- No scroll-triggered reveals beyond the most subtle fade (and prefer none)
- No animated gradients, no shifting hero backgrounds
- No glassmorphism, neumorphism, or claymorphism
- No "scrollytelling" — content does not unfold based on scroll position
- No micro-interactions beyond what's documented above
- No loading spinners on a static site

### Reduced motion

`prefers-reduced-motion` is respected throughout. Fades become instant, patina shifts disable or become non-animated state changes.

---

## 13. Dark Mode

Honors `prefers-color-scheme` by default. The dark palette is **designed, not derived** — see §5 for the directional palette.

**Open question:** Whether to expose a manual toggle in the UI. Tradeoffs:

- A toggle is a nice control but adds UI chrome and a small piece of state to manage.
- For an academic audience that mostly browses with system preferences set, automatic detection may be enough.

**Recommendation:** Skip the toggle at launch. Revisit if the site feels like it needs one after living with it.

---

## 14. Accessibility

**Baseline:** WCAG AA. This is non-negotiable.

Specific commitments:

- All interactive elements keyboard-navigable with visible focus states (focus styles must be intentional — not browser defaults, not removed entirely)
- Color contrast meets AA in both light and dark palettes (verify patina states do not drop below threshold)
- All images have meaningful `alt` text; decorative images have empty alt
- Semantic HTML throughout (Astro's HTML-first nature helps here)
- `prefers-reduced-motion` honored
- The CV PDF should be accessible (tagged, readable order, alt text on figures)

**Why this matters for this audience specifically:** Researchers studying death, data, and digital ephemera are statistically more likely to think about who is excluded by design choices. Walking the talk on accessibility is part of the credibility pitch.

---

## 15. Anti-Patterns

Things the site explicitly avoids. Some of these are reiterations from earlier sections, consolidated here for reference.

- **Tech-bro design language:** Animated gradients, glassmorphism, shifting hero backgrounds, mesh gradients, oversized arrow CTAs, gradient text on hero headlines.
- **Faculty-page aesthetics:** Times New Roman on white, dense unstructured paragraphs, justified text, no hierarchy.
- **Over-engineered micro-interactions:** Cursor-tracking blobs, magnetic buttons, scroll-jacked sections, "wow" animations on first visit.
- **Scrollytelling.** Don't do it.
- **Performative minimalism:** Empty pages with one word centered. The site has content; show it.
- **"Coming soon" placeholders.** Either it exists or the section doesn't yet.
- **Generic stock imagery.** If an image appears on the site, it has a reason.
- **Emoji decoration in UI chrome.** Content can have personality; navigation cannot.
- **Excessive testimonials, social proof badges, or "as seen in" logo strips.** This isn't a SaaS landing page.
- **Light/dark mode that is just an inversion.** Both modes are designed.

---

## 16. Open Questions

To be resolved during implementation:

1. **Framework:** Astro (recommended) vs. Vite + React. See §10.
2. **Manual dark-mode toggle:** Include or skip at launch. See §13. Recommendation: skip.
3. **Contact treatment:** Dedicated `/contact` page or footer-only across the site. See §8.
4. **Cursor trail patina:** Include or cut. See §6. Default: cut unless it feels earned in prototype.
5. **Final type pairing:** Direction provided in §5; final choice pending visual exploration in build.
6. **Final palette hex values:** Direction provided in §5; final values pending color exploration in build.
7. **Project list filtering / tagging UI:** Not at launch; revisit if project count exceeds ~20.
8. **Cross-session patina persistence (localStorage):** Build the within-session version first; decide on persistence after living with it.

---

## Appendix: Working principles for Claude Code

- **Never create a new file without explicit permission.** If a task would require creating a file, stop and ask.
- **Atomic design conventions** (atoms / molecules / organisms) — see §11.
- **styled-components only** — no CSS modules, plain CSS, or inline styles unless explicitly justified.
- **Comments sparingly.** Only when they add context the code itself does not make obvious. No section dividers or decorative comments.
- **One thing at a time.** Don't propose full architecture when the question is about one component.
- **Explain tradeoffs** when recommending approaches.
- **Flag** when a suggestion would require a new file, new dependency, or structural change before making it.
- **Stack is React + styled-components, hosted on GitHub Pages**, with framework choice between Astro and Vite + React documented in §10. Confirm before assuming anything else.