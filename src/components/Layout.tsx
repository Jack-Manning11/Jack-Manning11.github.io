import { useEffect, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { profile } from '../content';
import { usePagePatina } from '../system/patina';
import { PixIcon } from './PixIcon';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/work', label: 'Work', end: true },
];

export function Layout({ children }: { children: ReactNode }) {
  const completion = usePagePatina();

  // Drive the whole-page tarnish veil from patina completion. Scaled to 0.6 so
  // the page "never fully oxidizes" — preserving the veil's tuned visual ceiling
  // (the old accumulator capped at 0.6) while now tracking real element wear.
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--page-tarnish',
      (completion * 0.6).toFixed(3),
    );
  }, [completion]);

  return (
    <>
      <div className="tarnish-veil" aria-hidden="true" />

      <header className="site-head">
        <div className="container site-head__row">
          <Link to="/" className="wordmark">
            <PixIcon name="project" /> {profile.wordmark}
          </Link>
          <nav className="nav">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end}>
                {n.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container site-main">{children}</main>

      <footer className="site-foot">
        <div className="container site-foot__row">
          <span>
            © {profile.name} · {profile.location}
          </span>
          <span className="foot-links">
            <a href={`mailto:${profile.email}`}>Email</a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </footer>
    </>
  );
}
