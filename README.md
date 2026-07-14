# AI Safety Glossary

Plain-language definitions of the terms that matter in AI safety — what each one means, **why it matters**, sources to learn more, and the people who work on it.

A React + Vite app. Home is a searchable, filterable glossary; each term has its own detail page with a full write-up, links, and key people.

**Live:** https://mamoro98.github.io/ai-safety-glossary/

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```

## Content

All terms live in `src/data/entries.json`. Each entry:

```json
{
  "term": "...", "slug": "...", "cat": "alignment|interpretability|robustness|governance|multiagent",
  "aka": "", "def": "...", "why": "", "rel": ["..."],
  "links": [{ "title": "...", "url": "...", "type": "paper|blog|org|wiki|course|video|other" }],
  "people": [{ "name": "...", "affiliation": "..." }],
  "conf": "high|medium|low"
}
```

Add a term = add an object to that file. Deployment is automatic on push to `main` via GitHub Actions.

A personal initiative — draft.
