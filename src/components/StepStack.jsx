import { useEffect, useRef } from 'react';

// Booking steps as a stack of cards. Each card sticks a little lower than the
// one before it, so as you scroll the next card slides up and settles on top,
// leaving the edges of the earlier ones showing. Cards that have been covered
// step back slightly (--depth, set below as the cards scroll).

const clamp = (v) => Math.min(1, Math.max(0, v));

// Shared by every card stack: as the cards scroll, sets --depth on each card
// (how many cards have slid over it, 0 upwards) so covered cards can step back.
// Works with one column or several: a card only counts the cards above it in
// its own column.
export function useStackDepth(listRef, count) {
  useEffect(() => {
    const list = listRef.current;
    if (!list || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const cards = [...list.children];
    let tops = [];
    let prev = [];  // the card each card slides over: the one before it in the same column
    let raf = 0;
    const measure = () => {
      tops = cards.map((c) => parseFloat(getComputedStyle(c).top) || 0);
      const lefts = cards.map((c) => c.offsetLeft);
      prev = cards.map((_, j) => {
        for (let k = j - 1; k >= 0; k -= 1) if (Math.abs(lefts[k] - lefts[j]) < 2) return k;
        return -1;
      });
    };
    const update = () => {
      raf = 0;
      const rects = cards.map((c) => c.getBoundingClientRect());
      // How far each card has slid over the card below it in its column (0 to 1).
      const cover = rects.map((r, j) => (prev[j] < 0 ? 0 : clamp(1 - (r.top - tops[j]) / rects[prev[j]].height)));
      cards.forEach((c, i) => {
        let depth = 0;
        for (let j = i + 1; j < cards.length; j += 1) {
          // count only the cards that come after this one in the same column
          let k = prev[j];
          while (k > i) k = prev[k];
          if (k === i) depth += cover[j];
        }
        c.style.setProperty('--depth', depth.toFixed(3));
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const onResize = () => { measure(); onScroll(); };
    measure(); update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [listRef, count]);
}

export default function StepStack({ steps }) {
  const listRef = useRef(null);
  useStackDepth(listRef, steps.length);

  return (
    <ol className="step-stack" ref={listRef}>
      {steps.map((s, i) => (
        <li key={s.title} className={`stack-card stack-${i + 1}`} style={{ '--i': i }}>
          <span className="stack-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <div className="stack-body">
            <p className="stack-k">Step {i + 1} of {steps.length}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
