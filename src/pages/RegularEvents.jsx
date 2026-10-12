import { CLASSES } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, Arrow, ContactCard } from '../components/Bits.jsx';

export default function RegularEvents() {
  return (
    <>
      <PageHeader eyebrow="What's on" title="Our regular" accent="classes"
        intro="From cricket to whist, pilates to ecstatic dance. Contact each organiser for times, prices and to join." />
      <section className="section">
        <div className="wrap">
          <ul className="class-grid">
            {CLASSES.map((c) => (
              <li key={c.name} className="class-card">
                <span className={`cat cat-${c.category.toLowerCase()}`}>{c.category}</span>
                <h3>{c.name}</h3>
                {c.who && <p className="small">Run by {c.who}</p>}
                <p className="muted small">{c.day || 'Ask the organiser for times'}</p>
                <a className="text-link" href={c.link || href('contacts')} {...(c.link ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  More info <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="wrap section-tight"><ContactCard title="Want to run a class here?" /></section>
    </>
  );
}
