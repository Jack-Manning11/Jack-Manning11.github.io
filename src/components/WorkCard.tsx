import { Link } from 'react-router-dom';
import type { WorkItem } from '../content';
import { hasCaseStudy, primaryHref, topline, subline } from '../content';
import { usePatina } from '../system/patina';
import { PixIcon } from './PixIcon';

interface Props {
  item: WorkItem;
  feature?: boolean;
}

export function WorkCard({ item, feature }: Props) {
  const { patinaProps } = usePatina(item.id);
  const href = primaryHref(item);
  const internal = hasCaseStudy(item);

  const inner = (
    <article className={`patina plate${feature ? ' card--feature-inner' : ''}`} style={patinaProps.style}>
      <div className="plate__head">
        <PixIcon name={item.type} className="pixicon pixicon--lg" title={item.type} />
        <span className="label plate__date">{topline(item)}</span>
      </div>
      <h3 className="card__title">{item.title}</h3>
      <p className="card__sub">{subline(item)}</p>
      <p className="card__blurb">{item.blurb}</p>
      {item.type === 'publication' && item.award && (
        <p className="card__award">★ {item.award}</p>
      )}
      {href && (
        <span className="card__cta">
          {internal ? 'Read case study' : 'Visit'} <PixIcon name="arrow" />
        </span>
      )}
    </article>
  );

  const cls = `card${feature ? ' card--feature' : ''}`;
  if (!href) return <div className={cls}>{inner}</div>;

  return internal ? (
    <Link to={href} className={cls} {...patinaProps}>
      {inner}
    </Link>
  ) : (
    <a className={cls} href={href} target="_blank" rel="noreferrer" {...patinaProps}>
      {inner}
    </a>
  );
}
