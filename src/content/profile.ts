// Who you are. Edit freely — design never appears here.

export interface Social {
  label: string;
  href: string;
}

export const profile = {
  name: 'Jack Manning',
  wordmark: 'jackmanning.me',
  headline: 'PhD student · Identity Lab, CU Boulder',
  // Keep this to a line or two. Not a wall of text.
  lede: 'I study and build technology around identity, memory, and the things people leave behind.',
  location: 'Boulder, Colorado',
  email: 'jack.manning@colorado.edu',
  avatar: { src: '/headshot.jpg', alt: 'Jack Manning' },
  socials: [
    { label: 'GitHub', href: 'https://github.com/Jack-Manning11' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jack-manning-858500168/' },
  ] satisfies Social[],
};
