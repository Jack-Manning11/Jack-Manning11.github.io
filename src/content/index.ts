import type { WorkItem, WorkType } from './schema';
import { projects } from './projects';
import { publications } from './publications';

export * from './schema';
export { profile } from './profile';
export * from './extras';

/**
 * Every piece of work, newest first. Projects & Publications only for now —
 * Talks and Writing are not surfaced as categories yet.
 */
export const allWork: WorkItem[] = [...projects, ...publications].sort(
  (a, b) => b.year - a.year,
);

/** Categories currently shown in the UI. */
export const SHOWN_TYPES: WorkType[] = ['project', 'publication'];

/** Items surfaced on the home page. */
export const featured: WorkItem[] = allWork.filter((w) => w.featured);

/** An item earns a /work/:id case-study page only if it has a body. */
export const hasCaseStudy = (w: WorkItem): boolean => Boolean(w.body);

export const byId = (id: string): WorkItem | undefined => allWork.find((w) => w.id === id);

export const byType = (type: WorkType): WorkItem[] => allWork.filter((w) => w.type === type);

/** Resolve where a card should point: its case study, else its first link. */
export const primaryHref = (w: WorkItem): string | undefined =>
  hasCaseStudy(w) ? `/work/${w.id}` : w.links?.[0]?.href;

// ── Display helpers so every layout labels items the same way ──────────────

/** Top metadata line — a date or status only (never the venue). */
export const topline = (w: WorkItem): string => {
  if (w.type === 'publication' && w.status === 'under-review') return 'Under review';
  if (w.type === 'publication' && w.status === 'in-prep') return 'In preparation';
  return w.dateNote ?? String(w.year);
};

/** Secondary mono line under the title — venue for papers, tags for projects. */
export const subline = (w: WorkItem): string => {
  if (w.type === 'publication') return w.venue;
  return w.tags.join(' · ');
};
