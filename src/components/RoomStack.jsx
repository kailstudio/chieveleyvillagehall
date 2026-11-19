import { useRef } from 'react';
import { useStackDepth } from './StepStack.jsx';
import { PHOTOS, img } from '../data/content.js';

// Hire › Rooms & facilities as a stack of gradient cards in two staggered
// columns: each space has its photo in a circle on the left and its
// description on the right. As you scroll, each card slides up over the one
// above it in its column (same motion as the booking steps); the right column
// runs a little behind the left. One column on narrow screens.

export default function RoomStack({ spaces }) {
  const listRef = useRef(null);
  useStackDepth(listRef, spaces.length);

  return (
    <ol className="room-stack" ref={listRef}>
      {spaces.map((s, i) => (
        <li key={s.name} className={`room-card room-${(i % 3) + 1}`} style={{ '--i': i, '--row': Math.floor(i / 2), '--col': i % 2 }}>
          <figure className="room-photo">
            {PHOTOS[s.name] && <img src={img(PHOTOS[s.name], 700)} alt={s.name} loading="lazy" />}
          </figure>
          <div className="room-body">
            <p className="room-k">{String(i + 1).padStart(2, '0')} / {String(spaces.length).padStart(2, '0')}</p>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
