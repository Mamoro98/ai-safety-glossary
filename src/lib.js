import raw from './data/entries.json'

export const ENTRIES = [...raw].sort((a, b) => a.term.localeCompare(b.term))

export const CATS = {
  alignment:        { label: 'Alignment',        c: 'var(--cat-alignment)' },
  interpretability: { label: 'Interpretability', c: 'var(--cat-interpretability)' },
  robustness:       { label: 'Robustness',       c: 'var(--cat-robustness)' },
  governance:       { label: 'Governance',       c: 'var(--cat-governance)' },
  multiagent:       { label: 'Multi-Agent',      c: 'var(--cat-multiagent)' },
}

export const catMeta = (key) => CATS[key] || CATS.alignment

const norm = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const BY_SLUG = new Map(ENTRIES.map((e) => [e.slug, e]))
const BY_NAME = new Map()
for (const e of ENTRIES) {
  BY_NAME.set(norm(e.term), e)
  if (e.aka) BY_NAME.set(norm(e.aka), e)
}

export const bySlug = (slug) => BY_SLUG.get(slug)

// resolve a "see also" display name to its entry (or null if not in the glossary yet)
export const entryForName = (name) => BY_NAME.get(norm(name)) || null

export const categoryCounts = () => {
  const counts = { all: ENTRIES.length }
  for (const k of Object.keys(CATS)) counts[k] = ENTRIES.filter((e) => e.cat === k).length
  return counts
}

// first ~160 chars of the definition, cut on a word boundary
export const preview = (text, n = 160) => {
  const t = (text || '').trim()
  if (t.length <= n) return t
  const cut = t.slice(0, n)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…'
}
