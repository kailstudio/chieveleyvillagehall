import { Children, useRef } from 'react';
import { useStackDepth } from './StepStack.jsx';

// A stack of gradient glass cards for any content: each child becomes a card
// that sticks a little lower than the one before, so the next one slides up
// and settles on top as you scroll (same motion as the booking steps).
// Colourways cycle green, warm, dark (see .card-stack in styles.css).

export default function CardStack({ children, className = '' }) {
  const listRef = useRef(null);
  const items = Children.toArray(children);
  useStackDepth(listRef, items.length);
  return (
    <ul className={`card-stack ${className}`.trim()} ref={listRef}>
      {items.map((child, i) => (
        <li key={child.key ?? i} className="stk-card" style={{ '--i': i }}>{child}</li>
      ))}
    </ul>
  );
}
