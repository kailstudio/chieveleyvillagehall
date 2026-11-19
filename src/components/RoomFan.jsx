import { useEffect, useRef, useState } from 'react';
import { PHOTOS, img } from '../data/content.js';

// Hire › Rooms & facilities as a fan of six arched cards, like a hand of
// cards. Each card overlaps the one to its left. Click (or tap, or press
// Enter on) a card to pull it up out of the fan and read its description;
// click it again, click elsewhere or press Escape to put it back.
// On phones the cards sit in a row you can swipe through instead.

export default function RoomFan({ spaces }) {
  const [open, setOpen] = useState(null);
  const fanRef = useRef(null);
  const mid = (spaces.length - 1) / 2;

  // Put the card back when clicking outside the fan or pressing Escape.
  useEffect(() => {
    if (open === null) return undefined;
    const onDown = (e) => { if (fanRef.current && !fanRef.current.contains(e.target)) setOpen(null); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className={`room-fan${open !== null ? ' has-open' : ''}`} ref={fanRef}>
      {spaces.map((s, i) => {
        const isOpen = open === i;
        return (
          <button
            key={s.name}
            type="button"
            className={`fan-room fan-room-${(i % 3) + 1}${isOpen ? ' is-open' : ''}`}
            style={{ '--i': i, '--off': i - mid }}
            aria-expanded={isOpen}
            onClick={() => setOpen(isOpen ? null : i)}
          >
            <span className="fan-room-photo">
              {PHOTOS[s.name] && <img src={img(PHOTOS[s.name], 600)} alt="" loading="lazy" />}
            </span>
            <span className="fan-room-k">{String(i + 1).padStart(2, '0')} / {String(spaces.length).padStart(2, '0')}</span>
            <span className="fan-room-name">{s.name}</span>
            <span className="fan-room-text">{s.text}</span>
          </button>
        );
      })}
    </div>
  );
}
