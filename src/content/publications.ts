import type { Publication } from './schema';

const designingConversationsAbstract = `## Abstract

We examine how people experience two choices in the design of generative ghosts, AI systems that are trained on data of the dead: representation, where an AI speaks about a deceased person in the third person, and reincarnation, where the AI speaks as the deceased in the first person. Through a qualitative user study with 16 participants, we explore how each shaped authenticity, affect, and risk. Reincarnation was preferred for its immediacy, but participants shared fears of over-reliance. Representation was preferred for engaging with memory over conversational presence, though participants often ignored this distinction, engaging in dialogue despite third-person framing. Across both modes, participants privileged affective resonance over factual fidelity. We conclude by showing how factors such as tone, language, and conversational rhythm — factors unique to the user's memory of the deceased — shape interactions with generative ghosts, and argue that those interactions are always collaborative.`;

export const publications: Publication[] = [
  {
    id: 'designing-conversations-with-the-dead',
    type: 'publication',
    title:
      'Designing Conversations with the Dead: How People Engage with Generative Ghosts',
    year: 2026,
    blurb:
      'A qualitative study of how 16 people engage with generative ghosts — AI trained on data of the dead — across first- and third-person framings.',
    tags: ['research'],
    featured: true,
    authors: [
      'Jack Manning',
      'Daniel Sullivan',
      'Dylan Thomas Doyle',
      'Anthony T. Pinter',
      'Jed R. Brubaker',
    ],
    venue: 'ACM Designing Interactive Systems (DIS)',
    award: 'Honourable Mention',
    status: 'published',
    links: [
      { label: 'ACM Digital Library', href: 'https://dl.acm.org/doi/10.1145/3800645.3813090', kind: 'doi' },
      { label: 'PDF', href: 'https://dl.acm.org/doi/pdf/10.1145/3800645.3813090', kind: 'pdf' },
    ],
    body: designingConversationsAbstract,
  },
  {
    id: 'training-for-empathy',
    type: 'publication',
    title: 'Training for Empathy',
    year: 2026,
    blurb:
      'What student volunteers at the Digital Legacy Clinic learn from doing end-of-life support — and what the clinic, as a teaching environment, trains them to feel.',
    tags: ['research'],
    // TODO(Jack): confirm full author list before this goes public.
    authors: ['Jack Manning'],
    venue: 'ACM GROUP 2027',
    status: 'under-review',
  },

  // ── Add the next publication above this line ──────────────────────────
];
