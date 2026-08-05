import { useState } from 'react';
import { allWork, TYPE_LABELS, SHOWN_TYPES, type WorkType, type Publication } from '../content';
import { WorkCard } from '../components/WorkCard';
import { PubCard } from '../components/PubCard';
import { PixIcon } from '../components/PixIcon';

type Filter = WorkType | 'all';

// Work — one grid, two different objects: projects render as workbench plates,
// publications as paper offprints. Interleaved by date; filterable by type.
export function Work() {
  const [filter, setFilter] = useState<Filter>('all');
  const items = filter === 'all' ? allWork : allWork.filter((w) => w.type === filter);

  return (
    <div className="stack-gap">
      <h1 className="detail__title" style={{ marginTop: 0 }}>
        Work
      </h1>

      <div className="filters">
        <button
          className="chip"
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {SHOWN_TYPES.map((t) => (
          <button
            key={t}
            className="chip"
            aria-pressed={filter === t}
            onClick={() => setFilter(t)}
          >
            <PixIcon name={t} /> {TYPE_LABELS[t].many}
          </button>
        ))}
      </div>

      <div className="grid grid--two">
        {items.map((item) =>
          item.type === 'publication' ? (
            <PubCard key={item.id} item={item as Publication} />
          ) : (
            <WorkCard key={item.id} item={item} />
          ),
        )}
      </div>
    </div>
  );
}
