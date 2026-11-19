import { useCallback, useEffect, useRef, useState } from 'react';

// Photo carousel with a strip of thumbnails underneath. Adapted from the
// "thumbnail carousel" component (21st.dev) for this site: plain React and
// styles.css instead of framer-motion, Next.js and Tailwind, and the main
// picture is pill-shaped.
//
// - Moves on by itself every 5 seconds (paused while the pointer is over it,
//   while it has keyboard focus, and for visitors who prefer reduced motion).
// - Drag or swipe the big picture 50px or more to go back or forward.
// - Click a thumbnail, or use the left/right arrow keys, to jump to a photo.
//
// items: [{ src, thumb, label, pos }] (pos: optional CSS object-position for the big photo)
// captions: false hides the label on the big photo (when it's printed on the photo).
// className: extra class, e.g. to change the pill's shape for one gallery.

const AUTO_DELAY = 5000;
const DRAG_BUFFER = 50;

export default function ThumbnailCarousel({ items, label = 'Photos', captions = true, className = '' }) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const start = useRef(null);
  const thumbsRef = useRef(null);
  const last = items.length - 1;

  const go = useCallback((i) => setIndex(Math.max(0, Math.min(last, i))), [last]);

  // Auto-advance, looping back to the first photo after the last.
  useEffect(() => {
    if (paused || dragging || items.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setIndex((i) => (i === last ? 0 : i + 1)), AUTO_DELAY);
    return () => clearInterval(t);
  }, [paused, dragging, last, items.length]);

  // Keep the current thumbnail in view when the strip scrolls (phones),
  // scrolling the strip only, never the page.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip && strip.children[index];
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2, behavior: 'smooth' });
  }, [index]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = { x: e.clientX, id: e.pointerId };
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!start.current || start.current.id !== e.pointerId) return;
    let dx = e.clientX - start.current.x;
    // Resist at the ends, like a rubber band.
    if ((index === 0 && dx > 0) || (index === last && dx < 0)) dx *= 0.35;
    setDragX(dx);
  };
  const onPointerUp = () => {
    if (!start.current) return;
    if (dragX <= -DRAG_BUFFER) go(index + 1);
    else if (dragX >= DRAG_BUFFER) go(index - 1);
    start.current = null;
    setDragX(0);
    setDragging(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
  };

  return (
    <div
      className={`tc ${className}`.trim()}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={`tc-viewport${dragging ? ' is-dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="tc-track" style={{ transform: `translateX(calc(${-index * 100}% + ${dragX}px))` }}>
          {items.map((it, i) => (
            <div key={it.label} className={`tc-slide${i === index ? ' is-active' : ''}`} aria-hidden={i !== index}>
              <figure className="tc-pill">
                <img src={it.src} alt={it.label} draggable="false" loading={i < 2 ? 'eager' : 'lazy'} style={it.pos ? { objectPosition: it.pos } : undefined} />
                {captions && <figcaption className="tc-caption">{it.label}</figcaption>}
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="tc-thumbs" ref={thumbsRef}>
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            className={`tc-thumb${i === index ? ' is-active' : ''}`}
            aria-label={`Show photo ${i + 1}: ${it.label}`}
            aria-current={i === index}
            onClick={() => go(i)}
          >
            <img src={it.thumb || it.src} alt="" draggable="false" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
