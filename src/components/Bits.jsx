import { SITE, PHOTOS, img } from '../data/content.js';
import { href } from '../router.js';

// Full-bleed photo hero used at the top of every inner page.
// `photo` is a key in PHOTOS (content.js).
export function PageHeader({ eyebrow, title, accent, intro, children, photo = 'hero-home' }) {
  const id = PHOTOS[photo];
  return (
    <section className="page-hero">
      {id && <img className="page-hero-img" src={img(id, 2400)} alt="" fetchpriority="high" />}
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="wrap page-hero-inner">
        {eyebrow && <p className="eyebrow light">{eyebrow}</p>}
        <h1 className="display xl light">
          {title}{accent && <> <span className="thin">{accent}</span></>}
        </h1>
        <div className="page-hero-foot">
          {intro && <p className="glass glass-note">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

// Photo slot. Uses `src` if given, otherwise the photo in PHOTOS for this label.
// Without either, a quiet labelled placeholder shows where a photo should go.
export function Photo({ src, label, shape = 'rect', className = '', w = 1200 }) {
  const id = PHOTOS[label];
  const url = src || (id && img(id, w));
  return (
    <figure className={`photo shape-${shape} ${className}`}>
      {url ? (
        <img src={url} alt={label} loading="lazy" />
      ) : (
        <div className="photo-ph" role="img" aria-label={`Photo placeholder: ${label}`}><span>{label}</span></div>
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
      <a className="btn btn-dark" href={href('hire/how-to-book')}>How to book</a>
    </aside>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Row of jump links under a page hero: each link scrolls to a section of the page.
export function JumpLinks({ page, links, label = 'On this page' }) {
  const go = (e, id) => {
    if (window.location.hash === href(`${page}/${id}`)) {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <nav className="jump-links" aria-label={label}>
      <div className="wrap">
        <span className="jump-label">{label}</span>
        <ul>
          {links.map(([id, text]) => (
            <li key={id}><a href={href(`${page}/${id}`)} onClick={(e) => go(e, id)}>{text}</a></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// An organiser's phone/email lines.
export function PersonLines({ people }) {
  return (
    <ul className="person-lines">
      {people.map((p) => (
        <li key={p.name + (p.tel || p.email)}>
          <span>{p.name}</span>
          {p.tel && <a href={`tel:${p.tel.replace(/\s/g, '')}`}>{p.tel}</a>}
          {p.email && (p.note
            ? <span className="muted">{p.email} ({p.note})</span>
            : <a href={`mailto:${p.email}`}>{p.email}</a>)}
        </li>
      ))}
    </ul>
  );
}

// Section heading in the reference style: small label, large light heading.
export function SectionHead({ eyebrow, title, accent, children, light }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <p className={`eyebrow ${light ? 'light' : ''}`}>{eyebrow}</p>}
        <h2 className={`display ${light ? 'light' : ''}`}>{title}{accent && <> <span className="thin">{accent}</span></>}</h2>
      </div>
      {children && <div className="section-head-aside">{children}</div>}
    </div>
  );
}
