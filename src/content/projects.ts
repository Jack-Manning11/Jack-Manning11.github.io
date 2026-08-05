import type { Project } from './schema';

// Long-form bodies live as markdown next to the data and are imported as raw
// strings — keeps the prose out of this file while staying fully typed.
import atlasArcanaBody from './bodies/atlas-arcana.md?raw';
import digitalLegacyClinicBody from './bodies/digital-legacy-clinic.md?raw';

export const projects: Project[] = [
  {
    id: 'digital-legacy-clinic',
    type: 'project',
    title: 'Digital Legacy Clinic',
    year: 2024,
    dateNote: '2024–present',
    blurb:
      'A student-run help desk for end-of-life data — for people planning what they leave behind, and people sorting through what someone else already did.',
    tags: ['service', 'research'],
    featured: true,
    role: 'Founding member, across four semesters',
    collaborators: ['Dr. Jed Brubaker', 'Identity Lab, CU Boulder'],
    status: 'ongoing',
    links: [
      {
        label: 'Clinic website',
        href: 'https://www.colorado.edu/center/digital-legacy/',
        kind: 'site',
      },
    ],
    body: digitalLegacyClinicBody,
  },
  {
    id: 'atlas-arcana',
    type: 'project',
    title: 'ATLAS Arcana',
    year: 2024,
    dateNote: '2024',
    blurb:
      'An isometric video game with mixed-interface puzzles — my undergraduate capstone, built to orient new students to the ATLAS building and the CTD program.',
    tags: ['game', 'code', 'experiment'],
    featured: true,
    role: 'Co-creator (equal share) — design, code, sprite work, fabrication',
    collaborators: ['Jackson Greer', 'Peter Gyory (advisor)'],
    status: 'shipped',
    body: atlasArcanaBody,
  },

  // ── Add the next project above this line ──────────────────────────────
  // {
  //   id: 'slug',
  //   type: 'project',
  //   title: '',
  //   year: 2026,
  //   blurb: '',
  //   tags: [],
  //   // featured: true, role, collaborators, status, links, body
  // },
];
