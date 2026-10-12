import { useState } from 'react';
import { SITE, COFFEE_STOP, BOOKING_STEPS, CLASSES, REVIEWS, CLUB_500 } from '../data/content.js';
import { href } from '../router.js';
import { Arrow } from '../components/Bits.jsx';
import HeroScene from '../components/HeroScene.jsx';
import CoffeeCup from '../components/CoffeeCup.jsx';

const CATS = ['All', ...Array.from(new Set(CLASSES.map((c) => c.category)))];

export default function Home() {
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? CLASSES : CLASSES.filter((c) => c.category === cat);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">High Street, Chieveley · West Berkshire</p>
            <h1 className="display xl">
              Chieveley Village Hall <em>&amp; Recreational Centre</em>
            </h1>
            <p className="lede">
              A hall for birthdays, family gatherings and weddings, weekly classes for every age, and grounds that host
              dog shows all year round.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary btn-lg" href={href('booking')}>How to book <Arrow /></a>
              <a className="btn btn-donate btn-lg" href={href('500-club/join')}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor" /></svg>
                Donate to your hall
              </a>
            </div>
            <a className="text-link" href={SITE.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a>
          </div>
          <div className="hero-art">
            <div className="arch"><HeroScene /></div>
            <a className="hero-badge" href={href('home/coffee-stop')}>
              <span className="badge-k">Back 14 Jan</span>
              <span className="badge-v">The Coffee Stop</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Three priorities ---------- */}
      <section className="wrap priorities" aria-label="Most popular">
        <a className="prio prio-book" href={href('booking')}>
          <span className="prio-k">Hire the hall</span>
          <span className="prio-t">How to book</span>
          <span className="prio-d">Check availability up to a year ahead and send a request in five steps.</span>
          <span className="prio-go">Start booking <Arrow /></span>
        </a>
        <a className="prio prio-coffee" href={href('home/coffee-stop')}>
          <span className="prio-k">From 14 January 2027</span>
          <span className="prio-t">The Coffee Stop</span>
          <span className="prio-d">Our community café is back for a second 10-week trial.</span>
          <span className="prio-go">Find out more <Arrow /></span>
        </a>
        <a className="prio prio-classes" href={href('home/classes')}>
          <span className="prio-k">{CLASSES.length} groups meet here</span>
          <span className="prio-t">Classes &amp; activities</span>
          <span className="prio-d">Yoga, bowls, dance, art, bridge, table tennis and more.</span>
          <span className="prio-go">See what's on <Arrow /></span>
        </a>
      </section>

      {/* ---------- Coffee Stop ---------- */}
      <section id="coffee-stop" className="band band-pink">
        <div className="wrap coffee">
          <div className="coffee-date" aria-hidden="true">
            <span className="cd-day">14</span>
            <span className="cd-mon">Jan 2027</span>
            <span className="cd-sub">10-week trial</span>
          </div>
          <div className="coffee-copy">
            <p className="eyebrow">New in the hall</p>
            <h2 className="display">The Coffee Stop <em>is coming back</em></h2>
            <p className="lede">{COFFEE_STOP.text}</p>
            <div className="chip-row">
              <span className="chip">Starts {COFFEE_STOP.start}</span>
              <span className="chip">Second 10-week trial</span>
              <span className="chip">Everyone welcome</span>
            </div>
          </div>
          <CoffeeCup />
        </div>
      </section>

      {/* ---------- How to book ---------- */}
      <section id="how-to-book" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Booking</p>
              <h2 className="display">How to <em>book the hall</em></h2>
            </div>
            <p className="muted">Open to residents and non-residents, from Newbury and West Berkshire to further afield. Children's parties, birthdays, weddings and meeting-room hire.</p>
          </div>
          <ol className="steps">
            {BOOKING_STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step-n">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Check availability <Arrow /></a>
            <a className="btn btn-ghost btn-lg" href={href('booking')}>Full booking guide</a>
            <span className="muted small">Questions? {SITE.bookingsManager} · <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></span>
          </div>
        </div>
      </section>

      {/* ---------- Classes ---------- */}
      <section id="classes" className="band band-mint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What's on · Every week</p>
              <h2 className="display">Classes <em>&amp; activities</em></h2>
            </div>
            <div className="filters" role="group" aria-label="Filter classes">
              {CATS.map((c) => (
                <button key={c} className={`filter ${cat === c ? 'on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
              ))}
            </div>
          </div>
          <ul className="class-grid">
            {shown.map((c) => (
              <li key={c.name} className="class-card">
                <span className={`cat cat-${c.category.toLowerCase()}`}>{c.category}</span>
                <h3>{c.name}</h3>
                <p className="muted small">{c.day || 'Ask the organiser for times'}</p>
                <a className="text-link" href={c.link || href('contacts')} {...(c.link ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {c.link ? 'Join the club' : 'Contact details'} <Arrow />
                </a>
              </li>
            ))}
          </ul>
          <div className="cta-row">
            <a className="btn btn-dark" href={href('regular-events')}>All regular events <Arrow /></a>
            <a className="btn btn-ghost" href={href('contacts')}>Class contacts</a>
          </div>
        </div>
      </section>

      {/* ---------- What's on / outdoor ---------- */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Around the year</p>
              <h2 className="display">Events <em>&amp; the grounds</em></h2>
            </div>
            <p className="muted">News and information for villagers and regular users of the hall.</p>
          </div>
          <div className="feature-grid">
            <a className="feature f-fire" href={href('fundraising/fireworks')}>
              <span className="feature-k">Every 5 November</span>
              <h3>Fireworks &amp; bonfire</h3>
              <p>The UK's longest-running fireworks display, alongside the Chieveley fete, and a major fundraiser for the hall.</p>
              <span className="text-link">Fireworks <Arrow /></span>
            </a>
            <a className="feature f-dogs" href={href('dog-clubs')}>
              <span className="feature-k">Outdoor events</span>
              <h3>Dog clubs &amp; shows</h3>
              <p>Level grounds to Kennel Club standard, popular with UK dog clubs for annual shows.</p>
              <span className="text-link">More for dog clubs <Arrow /></span>
            </a>
            <a className="feature f-xmas" href={href('seasonal-events')}>
              <span className="feature-k">Late November 2026</span>
              <h3>Christmas market</h3>
              <p>Our Christmas market and tree lighting returns, with local food, drink and craft stalls.</p>
              <span className="text-link">Christmas &amp; Easter <Arrow /></span>
            </a>
            <a className="feature f-new" href={href('new-events')}>
              <span className="feature-k">Something for everyone</span>
              <h3>New events</h3>
              <p>The latest classes and one-off events starting at the hall.</p>
              <span className="text-link">New events <Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Facilities + governance ---------- */}
      <section className="wrap split-cards">
        <a className="split-card glass" href={href('facilities')}>
          <p className="eyebrow">Facilities</p>
          <h3 className="display sm">A main hall, club room, two kitchens and a bar</h3>
          <p>See the hall and grounds, and how others have used them.</p>
          <span className="text-link">Facilities &amp; arrangements <Arrow /></span>
        </a>
        <a className="split-card plain" href={href('governance')}>
          <p className="eyebrow">Governance</p>
          <h3 className="display sm">A registered charity, run by volunteers</h3>
          <p>Meet the committee, read our documents and come to the next meeting.</p>
          <span className="text-link">Read more <Arrow /></span>
        </a>
      </section>

      {/* ---------- Reviews ---------- */}
      <section id="reviews" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="display">What people <em>say</em></h2>
            </div>
          </div>
          <ul className="reviews">
            {REVIEWS.map((r) => (
              <li key={r.name} className="review">
                <p>{r.text}</p>
                <footer>
                  <strong>{r.name}</strong>
                  {(r.org || r.date) && <span>{[r.org, r.date].filter(Boolean).join(' · ')}</span>}
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Donate ---------- */}
      <section className="donate-band">
        <div className="wrap donate">
          <div>
            <p className="eyebrow light">Support your hall</p>
            <h2 className="display light">Every ticket keeps <em>the lights on</em></h2>
            <p className="lede light">Join the 500 Club for {CLUB_500.ticket} a year. You're entered into monthly prize draws, and at least 20% of every ticket goes to running and improving the hall and recreation ground.</p>
          </div>
          <div className="donate-actions">
            <a className="btn btn-donate btn-xl" href={href('500-club/join')}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor" /></svg>
              Donate · Join the 500 Club
            </a>
            <a className="text-link light" href={href('fundraising/help')}>Or volunteer your time <Arrow /></a>
          </div>
        </div>
      </section>
    </>
  );
}
