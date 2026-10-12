import { useState } from 'react';
import { SITE, COFFEE_STOP, CLASSES, REVIEWS, CLUB_500, CTA, EVENTS, PHOTOS, img } from '../data/content.js';
import { href } from '../router.js';
import { Arrow, Photo } from '../components/Bits.jsx';

// One way into each of the four sections. Hovering swaps the photo behind.
const SECTIONS = [
  { to: 'whats-on', label: "What's on", photo: 'Find: whats-on', kicker: 'Classes · events', text: 'Weekly classes with their organisers, the Coffee Stop, the Christmas market and bonfire night.', cta: 'See what’s on' },
  { to: 'hire', label: 'Hire the hall', photo: 'Find: hire', kicker: 'Rooms · prices · booking', text: 'Parties, weddings, meetings and dog shows. Check availability up to a year ahead.', cta: 'Plan your booking' },
  { to: 'support', label: 'Support us', photo: 'Find: support', kicker: '500 Club · volunteering', text: 'Join the 500 Club, lend a hand at an event or dedicate a bench.', cta: 'Help your hall' },
  { to: 'about', label: 'About', photo: 'Find: about', kicker: 'A registered charity', text: 'Meet the committee, the next meeting, our documents and Vision 2050.', cta: 'How we’re run' },
];

const today = () => new Date().toISOString().slice(0, 10);

export default function Home() {
  const [active, setActive] = useState(0);
  const next = EVENTS.filter((e) => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date))[0];
  const sec = SECTIONS[active];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="home-hero">
        <img className="page-hero-img" src={img(PHOTOS['hero-home'], 2400)} alt="" fetchpriority="high" />
        <div className="page-hero-shade" aria-hidden="true" />
        <div className="wrap home-hero-inner">
          <p className="eyebrow light">High Street, Chieveley · West Berkshire</p>
          <h1 className="mega">Chieveley <span className="thin">Village Hall</span></h1>

          <div className="home-hero-foot">
            <div className="home-hero-copy">
              <p className="light">A hall for birthdays, family gatherings and weddings, weekly classes for every age, and grounds that host dog shows all year round.</p>
              <div className="hero-actions">
                <a className="btn btn-solid-light" href={href(CTA.book)}>Book the hall <Arrow /></a>
                <a className="btn btn-outline-light" href={href(CTA.donate)}>Donate to your hall</a>
              </div>
            </div>

            <a className="groups-pill glass" href={href('whats-on/classes')}>
              <span className="dots" aria-hidden="true"><i /><i /><i /></span>
              <span><strong>{CLASSES.length} groups</strong><br />meet here every week</span>
            </a>

            <div className="hero-cards">
              <a className="glass hero-card" href={href('home/coffee-stop')}>
                <img src={img(PHOTOS['The Coffee Stop'], 600)} alt="" />
                <span className="hc-body">
                  <span className="hc-k">Back {COFFEE_STOP.start}</span>
                  <span className="hc-t">The Coffee Stop</span>
                </span>
              </a>
              {next && (
                <a className="solid-card" href={href('whats-on/upcoming')}>
                  <span className="hc-k">Next up · {next.when.split('·')[0].trim()}</span>
                  <span className="hc-t">{next.title}</span>
                  <span className="btn btn-dark btn-block">View details</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Intro + numbers ---------- */}
      <section className="section intro">
        <div className="wrap intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">Chieveley Recreational Centre</p>
            <h2 className="display">A hall for <span className="thin">the whole village.</span></h2>
            <p className="lede">A main hall, club room, two kitchens, a bar and a recreation ground on the High Street. Run by volunteers, open to everyone, from Newbury and West Berkshire and beyond.</p>
            <Photo label="Main hall" className="intro-photo" w={1400} />
          </div>
          <div className="stat-grid">
            <div className="stat"><p>groups and classes meet at the hall every week.</p><span className="stat-n">{CLASSES.length}</span></div>
            <div className="stat"><p>villagers and friends help run bonfire night each year.</p><span className="stat-n">70</span></div>
            <div className="stat"><p>questionnaire responses shaping our Vision 2050.</p><span className="stat-n">360+</span></div>
            <a className="stat stat-dark" href={href('about')}>
              <p>A registered charity, run by volunteers for the village.</p>
              <span className="text-link light">Learn more <Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Find your way ---------- */}
      <section className="finder" aria-label="Find your way">
        {SECTIONS.map((s, i) => (
          <img key={s.to} className={`finder-img ${i === active ? 'on' : ''}`} src={img(PHOTOS[s.photo], 2000)} alt="" loading="lazy" />
        ))}
        <div className="finder-panel">
          <div className="wrap finder-grid">
            <div className="finder-title">
              <p className="eyebrow light">Find your way</p>
              <p className="finder-big">Four ways <span className="thin">in.</span></p>
            </div>
            <ul className="finder-list">
              {SECTIONS.map((s, i) => (
                <li key={s.to}>
                  <a href={href(s.to)} className={i === active ? 'on' : ''}
                    onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>{s.label}</a>
                </li>
              ))}
            </ul>
            <div className="finder-detail" key={active}>
              <p className="eyebrow light">{sec.kicker}</p>
              <p className="finder-text">{sec.text}</p>
              <a className="btn btn-outline-light" href={href(sec.to)}>{sec.cta} <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Coffee Stop ---------- */}
      <section id="coffee-stop" className="section">
        <div className="wrap coffee">
          <Photo label="The Coffee Stop" shape="tall" w={1200} />
          <div className="coffee-copy">
            <p className="eyebrow">New in the hall</p>
            <p className="big-date">14.01<span className="thin">.27</span></p>
            <h2 className="display">The Coffee Stop <span className="thin">is coming back.</span></h2>
            <p className="lede">{COFFEE_STOP.text}</p>
            <div className="chip-row">
              <span className="chip">Starts {COFFEE_STOP.start}</span>
              <span className="chip">Second 10-week trial</span>
              <span className="chip">Everyone welcome</span>
            </div>
            <a className="text-link" href={href('whats-on/upcoming')}>All upcoming events <Arrow /></a>
          </div>
        </div>
      </section>

      {/* ---------- Reviews ---------- */}
      <section id="reviews" className="section section-line">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="display">What people <span className="thin">say.</span></h2>
            </div>
            <a className="text-link" href={href('hire/reviews')}>More from our hirers <Arrow /></a>
          </div>
          <ul className="reviews">
            {REVIEWS.slice(0, 3).map((r) => (
              <li key={r.name} className="review">
                <p>“{r.text}”</p>
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
        <img className="page-hero-img" src={img(PHOTOS['Donate band'], 2400)} alt="" loading="lazy" />
        <div className="page-hero-shade" aria-hidden="true" />
        <div className="wrap donate">
          <h2 className="mega mega-sm">Keep the <span className="thin">lights on.</span></h2>
          <div className="glass donate-card">
            <p className="eyebrow light">Support your hall</p>
            <p className="light">Join the 500 Club for {CLUB_500.ticket} a year. You're entered into monthly prize draws, and at least 20% of every ticket goes to running and improving the hall and recreation ground.</p>
            <div className="hero-actions">
              <a className="btn btn-solid-light" href={href(CTA.donate)}>Join the 500 Club <Arrow /></a>
              <a className="btn btn-outline-light" href={href('support/volunteer')}>Volunteer</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
