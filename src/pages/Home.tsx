import { Link } from 'react-router-dom';
import { profile, featured, stats, nowLines, focus, interests } from '../content';
import { WorkCard } from '../components/WorkCard';
import { PixIcon } from '../components/PixIcon';
import { usePagePatina, usePatina } from '../system/patina';

// ─────────────────────────────────────────────────────────────────────────
// HOME — "The Ledger". Hero (stacked name + square portrait) → a tarnish seam
// that doubles as the live patina meter → an About zone (brass figures +
// Now / Focus / Off-the-clock) → selected work → a contact plate that ages.
// ─────────────────────────────────────────────────────────────────────────

/** The hero↔content divider whose dotted fill IS the site's patina level. */
function TarnishSeam() {
  const completion = usePagePatina();
  const pct = Math.round(completion * 100);
  return (
    <div className="seam" role="img" aria-label={`Site patina ${pct} percent`}>
      <span>patina</span>
      <span className="seam__track">
        <span className="seam__fill" style={{ width: `${pct}%` }} />
      </span>
      <span className="seam__pct">{pct}%</span>
    </div>
  );
}

/** Contact plate — bound to the patina system so it wears when handled. */
function ContactPlate() {
  const { patinaProps } = usePatina('home-contact');
  return (
    <section
      className="contact patina"
      style={patinaProps.style}
      onMouseEnter={patinaProps.onMouseEnter}
      onMouseLeave={patinaProps.onMouseLeave}
    >
      <div>
        <p className="label">Get in touch</p>
        <h2 className="contact__head">Working on memory, legacy, or play?</h2>
        <p className="contact__sub">
          I&rsquo;m always up for a conversation — research, collaborations, or a good game.
        </p>
      </div>
      <a className="contact__cta" href={`mailto:${profile.email}`} onClick={patinaProps.onClick}>
        {profile.email} <PixIcon name="arrow" />
      </a>
    </section>
  );
}

export function Home() {
  const [lead, ...rest] = featured;
  const [given, family] = profile.name.split(' ');

  return (
    <div className="home stack-gap">
      <section className="lhero">
        <div className="lhero__head">
          <p className="label">{profile.headline}</p>
          <h1 className="lhero__name">
            <span>{given}</span>
            <span>{family}</span>
          </h1>
          <p className="lhero__lede">{profile.lede}</p>
        </div>
        <img className="lhero__portrait" src={profile.avatar.src} alt={profile.avatar.alt} />
      </section>

      <TarnishSeam />

      <section className="about">
        <div className="figures">
          {stats.map((s) => (
            <div key={s.label} className="figure" title={s.note}>
              <div className="figure__value">{s.value}</div>
              <div className="figure__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="callouts">
          <div className="panel">
            <div className="panel__title">
              <PixIcon name="writing" /> Now
            </div>
            <ul>
              {nowLines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <div className="panel__title">
              <PixIcon name="project" /> Focus
            </div>
            <div className="chip-row">
              {focus.map((f) => (
                <span key={f} className="tag-chip">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel__title">Off the clock</div>
            <ul>
              {interests.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="stack-gap">
        <div className="section-head">
          <h2>Selected work</h2>
          <Link to="/work">
            All work <PixIcon name="arrow" />
          </Link>
        </div>

        {lead && <WorkCard item={lead} feature />}

        <div className="grid grid--two">
          {rest.map((item) => (
            <WorkCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <ContactPlate />
    </div>
  );
}
