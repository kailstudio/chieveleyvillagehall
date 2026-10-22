import { useEffect, useRef } from 'react';
import { COFFEE_STOP, CLASSES, CTA, PHOTOS, img } from '../data/content.js';
import { href } from '../router.js';
import { Arrow } from './Bits.jsx';
import Doodles, { trackProgress } from './Doodles.jsx';

// Home page hero. The photo stays pinned while you scroll through a longer
// section, and the scroll position (--p, from 0 to 1) draws everything in:
// after a short delay, first the "chieveley" wordmark letter by letter, then the tagline, the
// bunting and the people, and finally the intro and the two cards.
// The ticker strip underneath moves with the scroll too.
const WORD = 'chieveley';
const TICKER = [
  'bringing community together',
  'birthdays, weddings & weekly classes',
  `${CLASSES.length} groups meet here every week`,
  'book the hall up to a year ahead',
  'bonfire night · 5 november',
  'join the 500 club',
];

// The lime "asterisk" after the wordmark (a four-point sparkle).
const STAR = 'M968 18Q971 45 998 48Q971 51 968 78Q965 51 938 48Q965 45 968 18Z';

export default function HomeHero({ next }) {
  const ref = useRef(null);
  const tickerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = reduce ? 1 : trackProgress(r, vh);
      el.style.setProperty('--p', p.toFixed(4));
      el.classList.toggle('foot-on', p > 0.7);
      const t = tickerRef.current;
      if (t && !reduce) {
        const w = t.firstElementChild?.offsetWidth || 1;
        t.style.transform = `translateX(${-((window.scrollY * 0.4) % w)}px)`;
      }
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    document.fonts?.ready.then(on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="home-hero" ref={ref}>
        <div className="hh-frame">
          <img className="page-hero-img" src={img(PHOTOS['hero-home'], 2400)} alt="" fetchpriority="high" />
          <div className="page-hero-shade" aria-hidden="true" />
          <Doodles k="hero-home" className="hero-doodles" track={ref} range={[0.06, 0.62]} />

          <div className="hh-mark">
            <h1 className="sr-only">Chieveley Village Hall</h1>
            <svg className="hh-word" viewBox="0 0 1000 250" aria-hidden="true">
              <text x="485" y="205" textAnchor="middle" textLength="930" lengthAdjust="spacingAndGlyphs">
                {WORD.split('').map((c, i) => <tspan key={i} style={{ '--i': i }}>{c}</tspan>)}
              </text>
              <path className="hh-star" d={STAR} pathLength="1" />
            </svg>
            <svg className="hh-tag" viewBox="0 0 1000 64" aria-hidden="true">
              <text x="500" y="46" textAnchor="middle">village hall · bringing community together</text>
            </svg>
          </div>

          <p className="hh-cue" aria-hidden="true">scroll to draw <span>↓</span></p>

          <div className="wrap hh-foot">
            <div className="home-hero-copy">
              <p className="light">A hall for birthdays, family gatherings and weddings, weekly classes for every age, and grounds that host dog shows all year round.</p>
              <div className="hero-actions">
                <a className="btn btn-solid-light" href={href(CTA.book)}>Book the hall <Arrow /></a>
                <a className="btn btn-outline-light" href={href(CTA.donate)}>Donate to your hall</a>
              </div>
              <a className="groups-pill glass" href={href('whats-on/classes')}>
                <span className="dots" aria-hidden="true"><i /><i /><i /></span>
                <span><strong>{CLASSES.length} groups</strong><br />meet here every week</span>
              </a>
            </div>
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

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track" ref={tickerRef}>
          {[0, 1, 2, 3].map((n) => (
            <span key={n} className="ticker-run">
              {TICKER.map((t) => <span key={t}>{t}<i>✦</i></span>)}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
