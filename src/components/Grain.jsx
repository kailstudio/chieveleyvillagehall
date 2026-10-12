// Shared bits for the grainy-gradient illustration style:
// flat geometric shapes, each filled with a soft colour-to-shadow gradient,
// finished with a film-grain texture laid over the whole picture.
import { useId } from 'react';

// A short, CSS-safe id prefix that is unique for each illustration on the page.
export function useArtId() {
  return 'a' + useId().replace(/[^a-zA-Z0-9]/g, '');
}

// Linear gradient. `stops` is a list of [offset, colour] (or [offset, colour, opacity]).
// `angle` runs the gradient across the shape in degrees (0 = left to right, 90 = top to bottom).
export function Grad({ id, stops, angle = 135 }) {
  const r = (angle * Math.PI) / 180;
  const dx = Math.cos(r) / 2;
  const dy = Math.sin(r) / 2;
  return (
    <linearGradient id={id} x1={0.5 - dx} y1={0.5 - dy} x2={0.5 + dx} y2={0.5 + dy}>
      {stops.map(([o, c, op = 1]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={op} />
      ))}
    </linearGradient>
  );
}

// Film grain: dark and light speckles laid over the illustration.
// Place it last inside the <svg>, sized to the viewBox.
export function GrainLayer({ id, width, height, strength = 1, freq = 0.85 }) {
  return (
    <g aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <filter id={`${id}-gd`} x="0" y="0" width="1" height="1">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed="7" stitchTiles="stitch" result="n" />
        <feColorMatrix in="n" type="matrix"
          values="0 0 0 0 0.10  0 0 0 0 0.13  0 0 0 0 0.10  -2.6 0 0 0 1.25" />
      </filter>
      <filter id={`${id}-gl`} x="0" y="0" width="1" height="1">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="2" seed="21" stitchTiles="stitch" result="n" />
        <feColorMatrix in="n" type="matrix"
          values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.6 0 0 0 -1.35" />
      </filter>
      <rect width={width} height={height} filter={`url(#${id}-gd)`} opacity={0.55 * strength} />
      <rect width={width} height={height} filter={`url(#${id}-gl)`} opacity={0.3 * strength} />
    </g>
  );
}
