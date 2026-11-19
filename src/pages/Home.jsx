import { useEffect, useRef, useState } from 'react';
import { SITE, COFFEE_STOP, CLASSES, REVIEWS, CLUB_500, CTA, EVENTS, PHOTOS, img } from '../data/content.js';
import { href } from '../router.js';
import { Arrow, Photo } from '../components/Bits.jsx';
import HallSketch, { HALL } from '../components/HallSketch.jsx';
import Testimonials from '../components/Testimonials.jsx';

// One way into each of the four sections.
const SECTIONS = [
  { to: 'whats-on', label: "What's on", kicker: 'Classes · events', text: 'Weekly classes with their organisers, the Coffee Stop, the Christmas market and bonfire night.', cta: 'See what’s on' },
  { to: 'hire', label: 'Hire the hall', kicker: 'Rooms · prices · booking', text: 'Parties, weddings, meetings and dog shows. Check availability up to a year ahead.', cta: 'Plan your booking' },
  { to: 'support', label: 'Support us', kicker: 'Donations · 500 Club · volunteering', text: 'Make a donation, join the 500 Club or lend a hand at an event.', cta: 'Help your hall' },
  { to: 'about', label: 'About', kicker: 'A registered charity', text: 'Meet the committee, the next meeting, our documents and Vision 2050.', cta: 'How we’re run' },
];

const today = () => new Date().toISOString().slice(0, 10);

// The orange glow in the name: --mx/--my put it under the pointer, in both
// "Chieveley" and "Village Hall".
const aimNameGlow = (e, root) => {
  root.querySelectorAll('.title-word, .thin').forEach((el) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`);
    el.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`);
  });
};

// Opening screen: one glow follows the pointer across the name and the logo
// drawing alike. In the drawing it is an SVG gradient moved to the pointer.
const introGlow = (e) => {
  if (e.pointerType === 'touch') return;
  const root = e.currentTarget;
  root.classList.add('glow-on');
  aimNameGlow(e, root);
  const svg = root.querySelector('.hall-sketch');
  const grad = svg && svg.querySelector('#hs-art-glow');
  const ctm = svg && svg.getScreenCTM();
  if (!grad || !ctm) return;
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
  const radius = Math.min(230, Math.max(110, window.innerWidth * 0.12)); // as in the name
  grad.setAttribute('cx', p.x.toFixed(1));
  grad.setAttribute('cy', p.y.toFixed(1));
  grad.setAttribute('r', (radius / ctm.a).toFixed(1));
};

// Moves a hover glow (--gx, --gy) to wherever the pointer is on the element.
const followGlow = (e) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--gx', `${(e.clientX - r.left).toFixed(0)}px`);
  el.style.setProperty('--gy', `${(e.clientY - r.top).toFixed(0)}px`);
};

export default function Home() {
  const [active, setActive] = useState(0);
  const upcoming = EVENTS.filter((e) => e.date >= today()).sort((a, b) => a.date.localeCompare(b.date));
  const next = upcoming[0];
  const after = upcoming[1];

  // Opening sequence, adapted from an "inversion circle" scroll animation.
  // The page opens on the name alone, light on dark green. Scrolling raises a
  // circle from below the screen (phase 1) with the illustrated fields inside
  // it, and the name turns dark green where the circle covers it. The
  // circle then grows until it fills the screen (phase 2) while the name
  // glides down into its place in the hero. After that the hero scrolls away
  // as normal: --y moves the photo at half speed and --p slides the
  // "After that" card out from behind the next-event card.
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const ghostRef = useRef(null);
  const artRef = useRef(null);
  useEffect(() => {
    const track = trackRef.current, stage = stageRef.current, hero = heroRef.current;
    const title = titleRef.current, ghost = ghostRef.current, art = artRef.current;
    if (!track || !stage || !hero || !title || !ghost || !art) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v) => Math.min(1, Math.max(0, v));
    const inOut4 = (p) => (p < 0.5 ? 8 * p ** 4 : 1 - (-2 * p + 2) ** 4 / 2); // slow, fast, slow
    const inOut3 = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
    let raf = 0;
    let off = 0;  // how far the name sits above its place on the opening screen, px
    let offx = 0; // and how far to the left of it

    // Place the dark copy of the name exactly over the real one, and work out
    // how far it must travel from the middle of the screen to its hero spot.
    const measure = () => {
      // The stage is a screen tall, or taller if the hero's content needs it
      // (small phones), so nothing gets pushed up under the menu bar.
      const inner = hero.querySelector('.home-hero-inner');
      stage.style.height = '';
      hero.style.height = 'auto'; hero.style.bottom = 'auto';
      const need = inner ? inner.offsetHeight : 0;   // the content's natural height
      hero.style.height = ''; hero.style.bottom = '';
      if (need > stage.offsetHeight) stage.style.height = `${need}px`;
      ghost.style.top = `${title.offsetTop}px`;
      ghost.style.left = `${title.offsetLeft}px`;
      ghost.style.width = `${title.offsetWidth}px`;
      // On the opening screen the name and the logo drawing are centred
      // together as one unit: side by side, with the drawing's ground line on
      // the baseline of "Village Hall", or on narrow screens the drawing above
      // the name. The name is measured where it sits in the hero, and --offx
      // and --off move it from there to its place in the unit.
      const W = stage.offsetWidth, H = stage.offsetHeight;
      const tw = title.offsetWidth, th = title.offsetHeight;
      const fs = parseFloat(getComputedStyle(title).fontSize) || 100;
      let base = th;                       // baseline of "Village Hall", from the name's top
      const thin = ghost.querySelector('.thin');
      if (thin) {
        const probe = document.createElement('i');   // a zero-size mark on the baseline
        probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
        thin.appendChild(probe);
        base = probe.offsetTop;
        thin.removeChild(probe);
      }
      const tall = HALL.ground - HALL.top;             // arch to ground, in drawing units
      const gap = 0.3 * fs;
      let k = (1.05 * fs) / tall;                       // beside the name
      let nameLeft, nameTop, artLeft, artTop;
      if (W > 700 && tw + gap + HALL.w * k <= W * 0.9) {
        nameLeft = (W - (tw + gap + HALL.w * k)) / 2;
        nameTop = (H - th) / 2;
        artLeft = nameLeft + tw + gap;
        artTop = nameTop + base - (HALL.ground - HALL.y) * k;
      } else {
        k = Math.min(W * 0.8, 380) / HALL.w;            // above the name
        const vgap = Math.max(20, 0.4 * fs);
        const artH = (HALL.base - HALL.top) * k;
        const top = (H - (artH + vgap + th)) / 2;
        artTop = top - (HALL.top - HALL.y) * k;
        artLeft = (W - HALL.w * k) / 2;
        nameLeft = (W - tw) / 2;
        nameTop = top + artH + vgap;
      }
      off = nameTop - title.offsetTop;
      offx = nameLeft - title.offsetLeft;
      stage.style.setProperty('--off', off.toFixed(1));
      stage.style.setProperty('--offx', offx.toFixed(1));
      Object.assign(art.style, {
        left: `${artLeft.toFixed(1)}px`, top: `${artTop.toFixed(1)}px`,
        width: `${(HALL.w * k).toFixed(1)}px`, height: `${(HALL.h * k).toFixed(1)}px`,
      });
    };

    const update = () => {
      raf = 0;
      const H = stage.offsetHeight, W = stage.offsetWidth;
      const s = Math.max(0, -track.getBoundingClientRect().top);
      const pinned = track.offsetHeight - H;      // scroll distance while the stage is pinned
      const leg = pinned / 2;                     // each phase gets half of it
      const p1 = reduce ? 1 : clamp(s / leg);
      const p2 = reduce ? 1 : clamp((s - leg) / leg);

      const ball = Math.min(380, W * 0.6);
      const cover = Math.hypot(W, H) * 1.05;      // diameter that fills the screen
      const d = ball + p2 * p2 * (cover - ball);  // ease-in: grows faster as it goes
      const cy = H / 2 + (1 - inOut4(p1)) * (H / 2 + ball / 2);
      const done = p2 >= 1;
      hero.style.clipPath = done ? 'none' : `circle(${(d / 2).toFixed(1)}px at 50% ${cy.toFixed(1)}px)`;
      hero.classList.toggle('revealed', p2 > 0.92);
      stage.classList.toggle('intro-done', done);
      stage.style.setProperty('--t', inOut3(p2).toFixed(4));
      stage.style.setProperty('--cue', clamp(1 - s / 120).toFixed(3));
      // The sun rises over the arch during the first half screen of scrolling.
      const rise = reduce ? 1 : clamp(s / (leg * 0.5));
      stage.style.setProperty('--rise', (1 - (1 - rise) ** 2).toFixed(4));

      const rel = Math.max(0, s - pinned);        // scroll past the pinned part
      hero.style.setProperty('--p', clamp(rel / (H * 0.6)).toFixed(4));
      hero.style.setProperty('--y', Math.min(rel, H).toFixed(1));

      // Keep the menu bar readable on the stone opening screen.
      const intro = !done;
      if (document.body.classList.contains('home-intro') !== intro) {
        document.body.classList.toggle('home-intro', intro);
        window.dispatchEvent(new Event('hero-intro'));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure(); update();
    document.fonts?.ready.then(onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      document.body.classList.remove('home-intro');
      window.dispatchEvent(new Event('hero-intro'));
    };
  }, []);
  const sec = SECTIONS[active];

  return (
    <>
      {/* ---------- Opening screen + hero ---------- */}
      <div className="hero-track" ref={trackRef}>
      <div className="hero-stage" ref={stageRef}>
        <div
          className="intro-plain"
          aria-hidden="true"
          onPointerMove={introGlow}
          onPointerLeave={(e) => e.currentTarget.classList.remove('glow-on')}
        >
          <div className="intro-art" ref={artRef}><HallSketch /></div>
          <span className="mega hero-title hero-title-ghost" ref={ghostRef}>
            <span className="title-word">Chieveley</span> <span className="thin">Village Hall</span>
          </span>
          <span className="intro-cue">Scroll<i /></span>
        </div>
      <section className="home-hero" ref={heroRef}>
        {/* Illustrated crop fields. */}
        <div className="hero-media" aria-hidden="true">
          <div className="hero-drift">
            <img className="hero-day" src="./hero/fields-1920.jpg" srcSet="./hero/fields-1920.jpg 1920w, ./hero/fields-2752.jpg 2752w" sizes="100vw" alt="" fetchpriority="high" />
          </div>
        </div>
        <div className="page-hero-shade" aria-hidden="true" />
        <div className="wrap home-hero-inner">
          <p className="eyebrow light">High Street, Chieveley · West Berkshire</p>
          <h1
            ref={titleRef}
            className="mega hero-title"
            onPointerMove={(e) => aimNameGlow(e, e.currentTarget)}
          >
            <span className="title-word">Chieveley</span> <span className="thin">Village Hall</span>
          </h1>

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
                <div className="next-stack">
                  {after && (
                    <a className="peek-card" href={href('whats-on/upcoming')}>
                      <span className="hc-k">After that · {after.when.split('·')[0].trim()}</span>
                      <span className="hc-t">{after.title}</span>
                      <span className="peek-link">All upcoming events <Arrow /></span>
                    </a>
                  )}
                  <a className="solid-card next-card" href={href('whats-on/upcoming')}>
                    <span className="hc-k">Next up · {next.when.split('·')[0].trim()}</span>
                    <span className="hc-t">{next.title}</span>
                    <span className="btn btn-dark btn-block">View details</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </div>
      </div>

      {/* ---------- Intro + numbers ---------- */}
      <section className="section intro">
        <div className="wrap intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">Chieveley Recreational Centre</p>
            <h2 className="display">A hall for <span className="thin">the whole village.</span></h2>
            <p className="lede">A main hall, club room, two kitchens, a bar and a recreation ground on the High Street. Run by volunteers, open to everyone, from Newbury and West Berkshire and beyond.</p>
            <Photo label="The large main hall" className="intro-photo" w={1400} />
          </div>
          <div className="intro-side">
            {/* Three cards fanned out like a hand of cards; each one pulls out
                a little on hover, with a soft green glow that follows the cursor. */}
            <div className="stat-fan">
              {[
                [CLASSES.length, 'groups and classes meet at the hall every week.'],
                [70, 'villagers and friends help run bonfire night each year.'],
                ['360+', 'questionnaire responses shaping our Vision 2050.'],
              ].map(([n, text], i) => (
                <div key={text} className={`fan-card fan-${i + 1}`} onPointerMove={followGlow}>
                  <span className="stat-n">{n}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <a className="fan-cta" href={href('about')} onPointerMove={followGlow}>
              <span>A registered charity, run by volunteers for the village.</span>
              <span className="fan-cta-link">Learn more <Arrow /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Find your way ---------- */}
      <section className="finder" aria-label="Find your way">
        <img className="finder-img on" src={img(PHOTOS['Find your way'], 2000)} alt="" loading="lazy" />
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
          <Photo label="The Coffee Stop" className="coffee-photo" w={1200} />
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
            <a className="events-glass" href={href('whats-on/upcoming')} onPointerMove={followGlow}>
              <span>All upcoming events</span>
              <span className="events-glass-arrow"><Arrow /></span>
            </a>
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
          <Testimonials reviews={REVIEWS} />
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
              <a className="btn btn-solid-light" href={href('support/500-club')}>Join the 500 Club <Arrow /></a>
              <a className="btn btn-outline-light" href={href('support/volunteer')}>Volunteer</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
