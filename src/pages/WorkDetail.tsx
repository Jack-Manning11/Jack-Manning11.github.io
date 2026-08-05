import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { byId, hasCaseStudy, type WorkItem } from '../content';
import { usePatina } from '../system/patina';
import { PixIcon } from '../components/PixIcon';

const detailMeta = (w: WorkItem): string[] => {
  const out: string[] = [w.dateNote ?? String(w.year)];
  if (w.type === 'project' && w.role) out.push(w.role);
  if (w.type === 'publication') out.push(w.venue);
  if (w.type === 'talk') out.push(w.event);
  if (w.type === 'talk' && w.location) out.push(w.location);
  return out;
};

export function WorkDetail() {
  const { id = '' } = useParams();
  const item = byId(id);
  const { patinaProps } = usePatina(id);
  const visit = patinaProps.onClick;

  useEffect(() => {
    if (item && hasCaseStudy(item)) visit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!item) {
    return (
      <>
        <h1 className="detail__title">Not found</h1>
        <p className="muted">
          No work with id “{id}”. <Link to="/work" className="back-link">Back to all work</Link>
        </p>
      </>
    );
  }

  return (
    <article className="detail">
      <Link to="/work" className="back-link">
        ← Work
      </Link>

      <div className="card__meta" style={{ marginTop: 'var(--s-5)' }}>
        <PixIcon name={item.type} title={item.type} />
        <span className="label">{item.type}</span>
      </div>

      <h1 className="detail__title">{item.title}</h1>
      <p className="detail__meta">{detailMeta(item).join(' · ')}</p>

      {item.type === 'publication' && (
        <p className="detail__authors">{item.authors.join(', ')}</p>
      )}
      {item.type === 'publication' && item.award && (
        <p className="card__award">★ {item.award}</p>
      )}

      {item.cover && (
        <img className="detail__cover" src={item.cover.src} alt={item.cover.alt} />
      )}

      {item.links && item.links.length > 0 && (
        <p className="detail__links">
          {item.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label} <PixIcon name="arrow" />
            </a>
          ))}
        </p>
      )}

      {item.body ? (
        <div className="prose">
          <ReactMarkdown>{item.body}</ReactMarkdown>
        </div>
      ) : (
        <p className="muted">{item.blurb}</p>
      )}
    </article>
  );
}
