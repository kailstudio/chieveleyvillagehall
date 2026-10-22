import { useState } from 'react';
import { SITE, CLASSES, CONTACTS, EVENTS, STALLHOLDERS, PAST_EVENT_PHOTOS, PHOTOS, img } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, JumpLinks, Photo, PersonLines, Arrow } from '../components/Bits.jsx';

const CATS = ['All', ...Array.from(new Set(CLASSES.map((c) => c.category)))];
const CONTACT_BY_GROUP = Object.fromEntries(CONTACTS.map((g) => [g.group, g.people]));

const today = () => new Date().toISOString().slice(0, 10);

export default function WhatsOn() {
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? CLASSES : CLASSES.filter((c) => c.category === cat);
  const upcoming = EVENTS.filter((e) => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHeader photo="hero-whats-on" eyebrow="What's on" title="Classes, events" accent="& the Coffee Stop."
        intro={`${CLASSES.length} groups meet at the hall every week, from cricket to whist and pilates to ecstatic dance. Each class lists its organiser, so you can get in touch directly.`} />
      <JumpLinks page="whats-on" links={[['classes', 'Weekly classes'], ['upcoming', 'Upcoming events'], ['past', 'Past events']]} />

      {/* ---------- Weekly classes (with organiser contacts) ---------- */}
      <section id="classes" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Every week</p>
              <h2 className="display">Weekly <span className="thin">classes</span></h2>
            </div>
            <div className="filters" role="group" aria-label="Filter classes">
              {CATS.map((c) => (
                <button key={c} className={`filter ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
          <ul className="class-grid">
            {shown.map((c) => {
              const people = CONTACT_BY_GROUP[c.contact];
              return (
                <li key={c.name} className="class-card">
                  <span className={`cat cat-${c.category.toLowerCase()}`}>{c.category}</span>
                  <h3>{c.name}</h3>
                  {c.who && <p className="small">Run by {c.who}</p>}
                  <p className="muted small">{c.day || 'Ask the organiser for times'}</p>
                  {people && <PersonLines people={people} />}
                  {c.link && (
                    <a className="text-link" href={c.link} target="_blank" rel="noreferrer">Join the club <Arrow /></a>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="muted small class-foot">
            Want to run a class here? Contact {SITE.bookingsManager}, our Bookings Manager, on{' '}
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a> or see <a href={href('hire')}>Hire the hall</a>.
          </p>
        </div>
      </section>

      {/* ---------- Upcoming events: one dated list ---------- */}
      <section id="upcoming" className="band band-pink">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">By date</p>
              <h2 className="display">Upcoming <span className="thin">events</span></h2>
            </div>
            <p className="muted">The Coffee Stop, the Christmas market, bonfire night and one-off events. Follow us on{' '}
              <a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a> or{' '}
              <a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a> for the latest news.</p>
          </div>

          {upcoming.length === 0 ? (
            <p className="lede">No events are listed just now. Check back soon.</p>
          ) : (
            <ol className="event-list">
              {upcoming.map((e) => (
                <li key={e.id} id={`event-${e.id}`} className="event">
                  <div className="event-media">
                    <Photo src={PHOTOS[`event-${e.id}`] && img(PHOTOS[`event-${e.id}`], 900)} label={e.title} doodle={`event-${e.id}`} />
                    <div className="event-date glass" aria-hidden="true">
                      <span className="ed-day">{e.day}</span>
                      <span className="ed-mon">{e.month}</span>
                    </div>
                  </div>
                  <div className="event-body">
                    <p className="eyebrow">{e.when}</p>
                    <h3 className="h3">{e.title}</h3>
                    <p>{e.text}</p>
                    {e.note && <p className="muted small">{e.note}</p>}
                    {e.stallholders && (
                      <details className="stalls">
                        <summary>Last year's stallholders</summary>
                        <div className="stall-cols">
                          {Object.entries(STALLHOLDERS).map(([k, list]) => (
                            <div key={k} className="stall-col">
                              <h4>{k}</h4>
                              <ul>{list.map((s) => <li key={s}>{s}</li>)}</ul>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                    {e.links.length > 0 && (
                      <div className="event-links">
                        {e.links.map((l) => (
                          <a key={l.label} className={`btn ${l.primary ? 'btn-primary' : 'btn-ghost'}`}
                            href={l.to ? href(l.to) : l.url}
                            {...(l.url && l.url.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
                            {l.label}{l.primary && <Arrow />}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      {/* ---------- Past events ---------- */}
      <section id="past" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2 className="display">Past <span className="thin">events</span></h2>
            </div>
            <p className="muted">From Darth Vader to Dick Whittington, Christmas lunches to UK pet shows.</p>
          </div>
          <div className="masonry">
            {PAST_EVENT_PHOTOS.map((p, i) => <Photo key={p} label={p} shape="soft" tone={['pink', 'mint', 'butternut'][i % 3]} />)}
          </div>
        </div>
      </section>
    </>
  );
}
