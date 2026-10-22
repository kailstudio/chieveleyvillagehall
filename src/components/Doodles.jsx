import { useEffect, useRef, useState } from 'react';
import { ART } from './doodleArt.js';
import { DOODLES } from '../data/content.js';

// Hand-drawn line illustrations laid over a photo. `k` is a key in DOODLES
// (content.js), usually the photo's label.
// The lines are drawn in as you scroll: each stroke follows the last, tied to
// how far the photo has moved through the screen, so scrolling back up rubs
// them out again. Over the big page-top photos the drawing happens as you
// scroll away from the top of the page.
const SMALL = '(max-width: 700px)';

// How far through a pinned scroll section we are, from 0 to 1. On phones the
// section isn't pinned, so it finishes within the first short scroll.
export function trackProgress(rect, vh) {
  const span = window.matchMedia(SMALL).matches ? vh * 0.2 : Math.max(vh * 0.6, rect.height - vh);
  return Math.min(1, Math.max(0, -rect.top / span));
}

// `track` + `range`: follow a pinned scroll section instead (the home hero):
// the drawings are drawn between those two points of its scroll, 0 to 1.
export default function Doodles({ k, items, className = '', weight, track, range = [0, 1] }) {
  const list = items || DOODLES[k];
  const ref = useRef(null);
  const [boxW, setBoxW] = useState(0);
  const hero = className.includes('hero');
  const px = weight || (hero ? 2.8 : 2.4);
  const [small, setSmall] = useState(() => typeof window !== 'undefined' && window.matchMedia(SMALL).matches);

  // On phones the big photos are narrow, so their drawings are scaled up.
  useEffect(() => {
    const mq = window.matchMedia(SMALL);
    const on = () => setSmall(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Keep the lines the same thickness whatever size the drawing is shown at.
  useEffect(() => {
    const el = ref.current;
    if (!el || !('ResizeObserver' in window)) return undefined;
    const ro = new ResizeObserver(([e]) => setBoxW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Draw the strokes in step with the scroll position.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    // Each drawing is drawn at the same time, stroke by stroke.
    const groups = [...el.querySelectorAll('svg')].map((svg) => ({ svg, paths: [...svg.querySelectorAll('path')] })).filter((g) => g.paths.length);
    if (!groups.length) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      groups.forEach((g) => g.paths.forEach((p) => { p.style.strokeDashoffset = '0'; }));
      el.classList.add('is-drawn');
      return undefined;
    }
    let raf = 0;
    let last = '';
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const clamp = (v) => Math.min(1, Math.max(0, v));
      const shared = clamp((vh * 0.95 - rect.top) / Math.min(vh * 0.6, rect.height * 0.9 + vh * 0.2));
      const key = `${Math.round(window.scrollY)}:${Math.round(rect.top)}:${vh}`;
      if (key === last) return;
      last = key;
      let done = true;
      groups.forEach(({ svg, paths }) => {
        // Page-top photos: each drawing starts lightly sketched and is
        // finished before it scrolls out of sight.
        let p = shared;
        if (track?.current) {
          const P = trackProgress(track.current.getBoundingClientRect(), vh);
          p = clamp((P - range[0]) / (range[1] - range[0]));
        } else if (hero) {
          const box = svg.getBoundingClientRect();
          // a short delay first, so nothing is drawn until you start scrolling
          p = clamp((-rect.top - 24) / Math.max(60, (box.top - rect.top) * 0.5 + box.height * 0.3));
        }
        if (p < 1) done = false;
        const n = paths.length;
        const overlap = Math.max(2.5, n * 0.18); // strokes overlap a little, like a hand moving on
        const t = p * (n + overlap);
        paths.forEach((path, i) => {
          const l = Math.min(1, Math.max(0, (t - i) / overlap));
          path.style.strokeDashoffset = (1 - l).toFixed(4);
          path.style.opacity = l > 0 ? '1' : '0'; // hide the round line ends of undrawn strokes
        });
      });
      el.classList.toggle('is-drawn', done);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, [list, small, hero, track, range[0], range[1]]);

  if (!list) return null;
  return (
    <div ref={ref} className={`doodles ${className}`} aria-hidden="true">
      {list.map(([name, x0, y0, w0, r = 0, hideSm = false, sm], i) => {
        const art = ART[name];
        if (!art || (small && hideSm)) return null;
        let [x, y, w] = [x0, y0, w0];
        if (small && sm) [x, y, w] = sm; // a set position for phones
        else if (small && hero) {
          w = Math.min(w0 * 2.3, 56);
          x = Math.max(2, Math.min(x0 - (w - w0) / 2, 98 - w));
        }
        return (
          <svg key={i} className="doodle" viewBox={`0 0 ${art.vb[0]} ${art.vb[1]}`}
            style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, rotate: r ? `${r}deg` : undefined, '--fd': `${-i * 1.7}s`,
              strokeWidth: boxW ? (px * art.vb[0]) / ((w / 100) * boxW) : undefined }}>
            {art.paths.map((p, j) => (
              <path key={j} d={typeof p === 'string' ? p : p.d} pathLength="1"
                className={typeof p === 'string' ? undefined : 'acc'} />
            ))}
          </svg>
        );
      })}
    </div>
  );
}
