// ─────────────────────────────────────────────────────────────────────────
// PLACEHOLDER CONTENT — faked so we can see richer layouts.
// Clearly marked; Jack replaces/prunes these once the layout direction lands.
// ─────────────────────────────────────────────────────────────────────────

export const nowLines: string[] = [
  'Mentoring volunteers at the Digital Legacy Clinic',
  'Writing “Training for Empathy” (under review, GROUP 2027)',
  'Guest-lecturing on end-of-life data',
];

export interface Stat {
  value: string;
  /** One word — pairs with the big brass numeral. */
  label: string;
  /** Longer gloss, surfaced as a tooltip only (keeps the numeral clean). */
  note?: string;
}

export const stats: Stat[] = [
  { value: '2', label: 'Years', note: 'in the Identity Lab' },
  { value: '4', label: 'Semesters', note: 'at the Digital Legacy Clinic' },
  { value: '1', label: 'Mention', note: 'DIS 2024 honourable mention' },
];

export const focus: string[] = [
  'Digital legacies',
  'Generative ghosts',
  'Human-centered AI',
  'Game design',
];

export const tools: string[] = ['Unity', 'Aseprite', 'React', 'Figma', 'Python', 'Qual methods'];

/** Non-academic — the "Off the clock" callout. Proof of a life outside the lab. */
export const interests: string[] = ['New dad', 'TTRPG player / DM', 'Amateur woodworker'];

export interface Elsewhere {
  label: string;
  value: string;
  href: string;
}

export const elsewhere: Elsewhere[] = [
  { label: 'Email', value: 'jack.manning@colorado.edu', href: 'mailto:jack.manning@colorado.edu' },
  { label: 'GitHub', value: 'Jack-Manning11', href: 'https://github.com/Jack-Manning11' },
  {
    label: 'LinkedIn',
    value: 'jack-manning',
    href: 'https://www.linkedin.com/in/jack-manning-858500168/',
  },
  { label: 'Lab', value: 'CU Identity Lab', href: 'https://www.colorado.edu/lab/identity/' },
];
