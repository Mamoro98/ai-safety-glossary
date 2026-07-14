import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { bySlug, catMeta, entryForName } from '../lib.js'

export default function TermDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const e = bySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!e) {
    return (
      <div className="page">
        <div className="wrap narrow">
          <Link to="/" className="back">← All terms</Link>
          <div className="empty">Term not found.</div>
        </div>
      </div>
    )
  }

  const meta = catMeta(e.cat)

  return (
    <div className="page">
      <div className="wrap narrow">
        <Link to="/" className="back">← All terms</Link>

        <article className="detail">
          <div className="detail-tags">
            <span className="tag" style={{ '--tc': meta.c }}>
              <span className="swatch" />
              {meta.label}
            </span>
            {e.conf ? (
              <span className={`conf ${e.conf}`}>
                <span className="cdot" />
                {e.conf} confidence
              </span>
            ) : null}
          </div>

          <h1 className="detail-title">{e.term}</h1>
          {e.aka ? <p className="detail-aka">also known as {e.aka}</p> : null}

          <p className="detail-def">{e.def}</p>

          {e.why ? (
            <section className="section">
              <h2>Why it matters</h2>
              <p>{e.why}</p>
            </section>
          ) : null}

          {e.links?.length ? (
            <section className="section">
              <h2>Learn more</h2>
              <ul className="links">
                {e.links.map((l, i) => (
                  <li key={i}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a>
                    {l.type ? <em className="ltype">{l.type}</em> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {e.people?.length ? (
            <section className="section">
              <h2>People who work on it</h2>
              <ul className="people">
                {e.people.map((p, i) => (
                  <li key={i}>
                    <b>{p.name}</b>
                    {p.affiliation ? <span className="aff"> — {p.affiliation}</span> : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {e.rel?.length ? (
            <section className="section">
              <h2>See also</h2>
              <div className="related">
                {e.rel.map((name, i) => {
                  const target = entryForName(name)
                  return target ? (
                    <Link key={i} className="rlink" to={`/term/${target.slug}`}>{name}</Link>
                  ) : (
                    <span key={i} className="rlink muted">{name}</span>
                  )
                })}
              </div>
            </section>
          ) : null}
        </article>

        <button className="back-bottom" onClick={() => navigate('/')}>← Back to all terms</button>
      </div>
    </div>
  )
}
