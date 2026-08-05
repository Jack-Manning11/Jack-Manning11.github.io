// ─────────────────────────────────────────────────────────────────────────
// CONTENT LAYER — pure data contracts.
// No JSX, no color, no styling lives here. This is the only file the design
// layer is allowed to depend on for the *shape* of your work.
// ─────────────────────────────────────────────────────────────────────────

export type LinkKind = 'site' | 'repo' | 'doi' | 'pdf' | 'video' | 'demo' | 'slides';

export interface Link {
  label: string;
  href: string;
  kind?: LinkKind;
}

export interface Media {
  src: string; // public URL, e.g. "/headshot.jpg"
  alt: string;
  aspect?: number; // optional w/h ratio hint for layout
}

/** Fields every entry shares — the common spine. */
interface Entry {
  /** Stable slug. Drives routing AND is the key the patina system ages. */
  id: string;
  title: string;
  /** Primary sort key. Use `dateNote` for ranges / human labels. */
  year: number;
  dateNote?: string;
  /** One sentence. What cards and lists show at rest. */
  blurb: string;
  tags: string[];
  featured?: boolean;
  links?: Link[];
  cover?: Media;
  /**
   * Long-form markdown body. Present ⇒ the item earns a case-study page
   * at /work/:id. Absent ⇒ the card links straight to its first external link.
   * Only featured work bothers to fill this in.
   */
  body?: string;
}

export interface Project extends Entry {
  type: 'project';
  role?: string;
  collaborators?: string[];
  status?: 'ongoing' | 'shipped' | 'archived';
}

export interface Publication extends Entry {
  type: 'publication';
  authors: string[];
  venue: string;
  /** Path to the conference's logo (e.g. /logos/dis.svg) for the card's tab.
   *  Absent ⇒ the tab falls back to the venue's short name set in mono. */
  venueLogo?: string;
  award?: string;
  status?: 'published' | 'under-review' | 'in-prep';
}

export interface Talk extends Entry {
  type: 'talk';
  event: string;
  location?: string;
}

export interface Writing extends Entry {
  type: 'writing';
  outlet?: string;
  /** Your own essay vs. press coverage of your work. */
  source: 'self' | 'press';
}

export type WorkItem = Project | Publication | Talk | Writing;

export type WorkType = WorkItem['type'];

/** Human labels for each type — used by the design layer for section headings. */
export const TYPE_LABELS: Record<WorkType, { one: string; many: string }> = {
  project: { one: 'Project', many: 'Projects' },
  publication: { one: 'Publication', many: 'Publications' },
  talk: { one: 'Talk', many: 'Talks' },
  writing: { one: 'Writing', many: 'Writing' },
};
