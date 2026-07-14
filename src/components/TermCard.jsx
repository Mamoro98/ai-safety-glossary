import { Link } from 'react-router-dom'
import { catMeta, preview } from '../lib.js'

export default function TermCard({ entry: e }) {
  const meta = catMeta(e.cat)
  return (
    <li className="card">
      <Link to={`/term/${e.slug}`} className="card-link">
        <div className="card-head">
          <span className="term">
            {e.term}
            {e.aka ? <span className="aka"> / {e.aka}</span> : null}
          </span>
          <span className="tag" style={{ '--tc': meta.c }}>
            <span className="swatch" />
            {meta.label}
          </span>
        </div>
        <p className="blurb">{preview(e.def)}</p>
        <div className="card-foot">
          {e.links?.length ? <span className="meta-pill">{e.links.length} sources</span> : null}
          {e.people?.length ? <span className="meta-pill">{e.people.length} people</span> : null}
          <span className="go">Read →</span>
        </div>
      </Link>
    </li>
  )
}
