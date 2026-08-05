// Pixel glyphs on an 8×8 grid — a nod to Jack's Aseprite / ATLAS sprite work.
// Each map is 8 rows of 8 chars; '#' = filled pixel. Rendered as crisp rects.

import type { WorkType } from '../content';

const GLYPHS: Record<WorkType | 'arrow', string[]> = {
  // isometric tile — the game/maker mark
  project: [
    '...##...',
    '..####..',
    '.######.',
    '########',
    '########',
    '.######.',
    '..####..',
    '...##...',
  ],
  // ruled page — a document
  publication: [
    '.######.',
    '.#....#.',
    '.#.##.#.',
    '.#....#.',
    '.#.##.#.',
    '.#....#.',
    '.######.',
    '........',
  ],
  // speech bubble — a talk
  talk: [
    '.######.',
    '########',
    '########',
    '########',
    '.######.',
    '..##....',
    '.##.....',
    '........',
  ],
  // pencil — writing
  writing: [
    '......##',
    '.....###',
    '....###.',
    '...###..',
    '..###...',
    '.###....',
    '##......',
    '#.......',
  ],
  // up-right arrow — external / go
  arrow: [
    '..#####.',
    '....###.',
    '...####.',
    '..##.##.',
    '.##..##.',
    '##......',
    '........',
    '........',
  ],
};

interface Props {
  name: WorkType | 'arrow';
  className?: string;
  title?: string;
  /** Explicit pixel size; overrides the CSS default (1.15em). */
  size?: number;
}

export function PixIcon({ name, className = 'pixicon', title, size }: Props) {
  const grid = GLYPHS[name];
  const rects: React.ReactNode[] = [];
  grid.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell === '#') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} />);
    });
  });

  return (
    <svg
      className={className}
      viewBox="0 0 8 8"
      width={size}
      height={size}
      fill="currentColor"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {rects}
    </svg>
  );
}
