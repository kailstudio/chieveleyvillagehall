import { useEffect, useRef, useState } from 'react';

// Reviews as one large quote with a row of reviewer pills underneath.
// Adapted from the "unique testimonial" component (21st.dev) for this site:
// plain React and styles.css instead of Tailwind, and initials instead of
// photos, since the reviewers are real people we don't have pictures of.
//
// Click a pill to show that review: the quote blurs out, swaps and fades back
// in. The chosen pill turns dark green and shows the reviewer's name; hovering
// another pill opens it up to show their name too.

const initials = (name) =>
  name.replace(/\./g, ' ').split(/\s+/).filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const cx = (...c) => c.filter(Boolean).join(' ');

export default function Testimonials({ reviews }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);        // the review currently on screen
  const [swapping, setSwapping] = useState(false);
  const [hovered, setHovered] = useState(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const select = (i) => {
    if (i === active || swapping) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActive(i);
    if (reduce) { setShown(i); return; }
    setSwapping(true);
    timers.current.push(setTimeout(() => {
      setShown(i);
      timers.current.push(setTimeout(() => setSwapping(false), 60));
    }, 280));
  };

  const r = reviews[shown];
  const role = [r.org, r.date].filter(Boolean).join(' · ');

  return (
    <div className="tm">
      <figure className="tm-quote-wrap" aria-live="polite">
        <span className="tm-mark tm-mark-open" aria-hidden="true">“</span>
        <blockquote className={cx('tm-quote', swapping && 'is-out')}>
          <p>{r.text}</p>
        </blockquote>
        <span className="tm-mark tm-mark-close" aria-hidden="true">”</span>
        <figcaption className={cx('tm-role', swapping && 'is-out')}>
          <span className="tm-by">{r.name}</span>
          {role && <span>{role}</span>}
        </figcaption>
      </figure>

      <div className="tm-people" role="group" aria-label="Choose a review">
        {reviews.map((p, i) => {
          const isActive = i === active;
          const open = isActive || (hovered === i);
          return (
            <button
              key={p.name}
              type="button"
              className={cx('tm-person', isActive && 'is-active', open && 'is-open')}
              aria-pressed={isActive}
              aria-label={`Review from ${p.name}`}
              onClick={() => select(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <span className={`tm-avatar tm-avatar-${i % 4}`} aria-hidden="true">{initials(p.name)}</span>
              <span className="tm-name-wrap"><span className="tm-name">{p.name}</span></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
