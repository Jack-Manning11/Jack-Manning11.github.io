# jackmanning.me

Personal site for Jack Manning — PhD student at CU Boulder's Identity Lab.
Projects, publications, talks, and writing.

Vite + React + TypeScript + React Router. No SSR: the patina system reads
`window`/`localStorage` directly, so the site ships as a client-rendered SPA.

## Commands

| Command            | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `npm install`      | Install dependencies                                 |
| `npm run dev`      | Dev server at `localhost:5173`                        |
| `npm run build`    | Production build to `dist/` (also writes `404.html`) |
| `npm run preview`  | Serve the built `dist/` locally                       |
| `npx tsc --noEmit` | Typecheck                                            |

## Layout

```
src/
├── content/    # the work itself — typed data, no markup (schema.ts is the contract)
├── system/     # behaviour — patina state, hooks
├── components/ # UI
├── pages/      # routes
└── styles/     # tokens.css (design language) + base.css
```

`DESIGN_BRIEF.md` is the design language of record; `DEVLOG.md` logs decisions,
newest first.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes
`dist/` to GitHub Pages at [jackmanning.me](https://jackmanning.me).

Two details that matter for a client-routed SPA on Pages:

- `public/CNAME` holds the custom domain. Pages rewrites the domain setting from
  this file on every deploy, so it must stay in the repo.
- `npm run build` copies `index.html` to `404.html`. Pages serves that for unknown
  paths, which is how a deep link like `/work/:id` survives a refresh.
