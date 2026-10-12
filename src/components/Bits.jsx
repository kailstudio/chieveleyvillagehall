import { SITE } from '../data/content.js';
import { href } from '../router.js';
import { useArtId, Grad } from './Grain.jsx';

// Page title band used at the top of every inner page.
export function PageHeader({ eyebrow, title, accent, intro, children, tone = 'mint' }) {
  return (
    <section className={`page-header tone-${tone}`}>
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display">
          {title} {accent && <em>{accent}</em>}
        </h1>
        {intro && <p className="lede">{intro}</p>}
        {children}
      </div>
      <svg className="page-header-hills" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80V46C180 14 360 6 560 30s380 44 560 20 260-32 320-30V80Z" />
      </svg>
    </section>
  );
}

// Photo slot. Pass `src` to show a real photo; without it a labelled
// placeholder shows where a photo should go.
export function Photo({ src, label, shape = 'rect', tone = 'mint', className = '' }) {
  return (
    <figure className={`photo shape-${shape} tone-${tone} ${className}`}>
      {src ? (
        <img src={src} alt={label} loading="lazy" />
      ) : (
        <div className="photo-ph" role="img" aria-label={`Photo placeholder: ${label}`}>
          <PlaceholderArt tone={tone} />
          <span>{label}</span>
        </div>
      )}
    </figure>
  );
}

export function ContactCard({ title = 'Need help with a booking?' }) {
  return (
    <aside className="contact-card">
      <h3>{title}</h3>
      <p>Contact {SITE.bookingsManager}, our Bookings Manager. She also looks after operations and help on the day.</p>
      <div className="contact-lines">
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
      </div>
      <a className="btn btn-primary" href={href('booking')}>How to book</a>
    </aside>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Little landscape shown inside an empty photo slot, in the grainy-gradient style.
const PH_TONES = {
  mint: { back: ['#e3ebe3', '#93ac98'], front: ['#acbeb0', '#2f5a35'], sun: ['#f9d3bf', '#dd7e5d', '#7d3524'] },
  pink: { back: ['#f6e7e7', '#c89ea2'], front: ['#e0c7c9', '#8a5c60'], sun: ['#f9d3bf', '#dd7e5d', '#7d3524'] },
  butternut: { back: ['#f7d8ca', '#dd9273'], front: ['#e9a88f', '#8f3f2b'], sun: ['#fffdf9', '#f4e6e2', '#b9553a'] },
};

function PlaceholderArt({ tone }) {
  const g = useArtId();
  const t = PH_TONES[tone] || PH_TONES.mint;
  return (
    <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMax slice" overflow="visible" aria-hidden="true">
      <defs>
        <Grad id={`${g}-b`} angle={25} stops={[[0, t.back[0]], [1, t.back[1]]]} />
        <Grad id={`${g}-f`} angle={150} stops={[[0, t.front[0]], [1, t.front[1]]]} />
        <Grad id={`${g}-s`} angle={125} stops={[[0, t.sun[0]], [0.45, t.sun[1]], [1, t.sun[2]]]} />
      </defs>
      <g fill="none" stroke="#fffdf9" strokeWidth=".5" opacity=".8">
        <circle cx="88" cy="22" r="13" />
        <circle cx="88" cy="22" r="17" opacity=".6" />
      </g>
      <circle cx="88" cy="22" r="9" fill={`url(#${g}-s)`} />
      <path d="M0 62c20-14 34-18 52-10s30 8 46-4 22-8 22-8v40H0Z" fill={`url(#${g}-b)`} />
      <path d="M0 70c26-10 46-10 66-2s38 4 54-4v16H0Z" fill={`url(#${g}-f)`} />
    </svg>
  );
}
