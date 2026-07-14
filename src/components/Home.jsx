import { useMemo, useState } from 'react'
import { ENTRIES, CATS, categoryCounts } from '../lib.js'
import TermCard from './TermCard.jsx'

const COUNTS = categoryCounts()

export default function Home() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase()
    return ENTRIES.filter((e) => {
      if (cat !== 'all' && e.cat !== cat) return false
      if (!query) return true
      const hay = (
        e.term + ' ' + (e.aka || '') + ' ' + e.def + ' ' + (e.why || '') + ' ' +
        (e.people || []).map((p) => p.name).join(' ') + ' ' +
        (e.links || []).map((l) => l.title).join(' ')
      ).toLowerCase()
      return hay.includes(query)
    })
  }, [q, cat])

  return (
    <div className="page">
      <div className="wrap">
        <header className="masthead">
          <div className="eyebrow">
            <span className="dot">◆</span>
            <span>Personal Initiative</span><span>·</span>
            <span>Draft v0.3</span><span>·</span>
            <span>{ENTRIES.length} terms</span>
          </div>
          <h1 className="title">The AI Safety Glossary</h1>
          <p className="lede">
            Plain-language definitions of the terms that matter in AI safety — what each
            one means, and <b>why it matters</b>. Click any term for a full write-up,
            sources to learn more, and the people who work on it.
          </p>
        </header>

        <div className="controls">
          <label className="search">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms, definitions, people…"
              aria-label="Search glossary"
            />
          </label>

          <div className="chips" role="group" aria-label="Filter by category">
            <button
              className="chip"
              aria-pressed={cat === 'all'}
              onClick={() => setCat('all')}
            >
              All <span className="n">{COUNTS.all}</span>
            </button>
            {Object.entries(CATS).map(([k, v]) => (
              <button
                key={k}
                className="chip"
                aria-pressed={cat === k}
                onClick={() => setCat(k)}
              >
                <span className="swatch" style={{ '--c': v.c }} />
                {v.label} <span className="n">{COUNTS[k]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="count">
          {shown.length === ENTRIES.length
            ? `${shown.length} terms`
            : `${shown.length} of ${ENTRIES.length} terms`}
        </div>

        {shown.length === 0 ? (
          <div className="empty">No terms match that filter.</div>
        ) : (
          <ul className="grid">
            {shown.map((e) => (
              <TermCard key={e.slug} entry={e} />
            ))}
          </ul>
        )}

        <footer>
          <span>AI SAFETY GLOSSARY · SAMPLE</span>
          <span>DEFINITIONS · SOURCES · PEOPLE</span>
        </footer>
      </div>
    </div>
  )
}
