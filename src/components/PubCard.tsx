import type { CSSProperties } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import type { Publication } from '../content';
import { hasCaseStudy, primaryHref } from '../content';
import { usePatina } from '../system/patina';
import { PixIcon } from './PixIcon';

// ─────────────────────────────────────────────────────────────────────────
// Publication card — a TWO-COLUMN plate. A small left TAB carries the venue's
// logo slot and the paper's status; the main section on the right carries the
// title, venue + year, authors and blurb. The LINE between the columns is the
// patina meter: a vertical version of the project card's dot bar, growing up
// from the bottom of the card as it ages. Surface still shifts brass→verdigris.
//
// NOTE: `.patina` sets its own `--patina: 0`, so the animating value must be an
// inline style ON the .patina article — hence style={patinaProps.style}.
// ─────────────────────────────────────────────────────────────────────────

function statusFor(pub: Publication): { key: string; label: string } {
  if (pub.status === 'under-review') return { key: 'review', label: 'Under review' };
  if (pub.status === 'in-prep') return { key: 'prep', label: 'In prep' };
  return { key: 'published', label: 'Published' };
}

/**
 * Short name for the logo slot, used until a venue has a mark on file:
 * the parenthetical acronym if there is one ("… (DIS)" → DIS), else the first
 * all-caps token that isn't the society prefix ("ACM GROUP 2027" → GROUP),
 * else the initials of the venue's words.
 */
function venueShort(venue: string): string {
  const paren = venue.match(/\(([^)]+)\)/);
  if (paren) return paren[1];
  const words = venue.replace(/\d+/g, '').split(/\s+/).filter(Boolean);
  const caps = words.filter((w) => /^[A-Z]{3,}$/.test(w) && w !== 'ACM' && w !== 'IEEE');
  if (caps.length) return caps[0];
  return words.map((w) => w[0]).join('').toUpperCase().slice(0, 4);
}

/** Author list with Jack's name emphasized. */
function Authors({ authors }: { authors: string[] }) {
  return (
    <p className="pub__authors">
      {authors.map((a, i) => (
        <Fragment key={a}>
          {i > 0 && ', '}
          {a === 'Jack Manning' ? <strong>{a}</strong> : a}
        </Fragment>
      ))}
    </p>
  );
}

export function PubCard({
  item,
  patinaKey,
  demoPatina,
}: {
  item: Publication;
  /** Override the patina id — lets the lab age instances independently. */
  patinaKey?: string;
  /** Force a fixed patina level for static display (lab stage previews). */
  demoPatina?: number;
}) {
  const { patinaProps } = usePatina(patinaKey ?? item.id);
  const href = primaryHref(item);
  const internal = hasCaseStudy(item);
  const status = statusFor(item);
  const published = status.key === 'published';

  const style: CSSProperties =
    demoPatina != null ? ({ '--patina': demoPatina.toFixed(3) } as CSSProperties) : patinaProps.style;

  const inner = (
    <article className="railcard patina" style={style}>
      {/* LEFT TAB — logo slot, then status, then the award box when there is one */}
      <div className="rail">
        <span className="pub__logo">
          {item.venueLogo ? (
            <img src={item.venueLogo} alt="" />
          ) : (
            <span className="pub__logo-mark">{venueShort(item.venue)}</span>
          )}
        </span>
        <span className={`pub__status pub__status--${status.key}`}>{status.label}</span>
        {item.award && (
          <span className="pub__award">{item.award}</span>
        )}
      </div>

      {/* THE LINE — vertical dot bar; height is the patina meter */}
      <span className="rail__bar" aria-hidden="true" />

      {/* MAIN SECTION */}
      <div className="rail__body">
        <h3 className="card__title">{item.title}</h3>
        <p className="pub__meta">
          <span className="pub__venue">{item.venue}</span>
          <span className="pub__meta-sep" aria-hidden="true">
            ·
          </span>
          <span className="pub__year">{item.year}</span>
        </p>
        <Authors authors={item.authors} />
        <p className="card__blurb">{item.blurb}</p>
        <span className="card__cta">
          {published ? 'Read paper' : 'Details'} <PixIcon name="arrow" />
        </span>
      </div>
    </article>
  );

  const cls = 'card card--pub';
  // Static preview (forced patina) — no hover behaviour.
  if (demoPatina != null) return <div className={cls}>{inner}</div>;

  const handlers = {
    onMouseEnter: patinaProps.onMouseEnter,
    onMouseLeave: patinaProps.onMouseLeave,
    onClick: patinaProps.onClick,
  };
  if (!href) return <div className={cls} {...handlers}>{inner}</div>;
  return internal ? (
    <Link to={href} className={cls} {...handlers}>
      {inner}
    </Link>
  ) : (
    <a className={cls} href={href} target="_blank" rel="noreferrer" {...handlers}>
      {inner}
    </a>
  );
}
