// The drawing from the Chieveley Village Hall logo (everything above the
// lettering), in white for the home page's opening screen. The shapes are
// traced from src/assets/logo.jpg, so they use the logo's own pixel
// coordinates (see logoPaths.js).
//
// The sun hides behind the arch and rises over the top of it as the visitor
// scrolls: Home.jsx sets --rise from 0 to 1. The drawing's silhouette is
// filled with the background green, so the sun can't be seen while it is
// behind it.
import { LOGO_ART, LOGO_COVER } from './logoPaths.js';

// Where things are in the drawing, for laying it out beside the name.
export const HALL = {
  x: 76, y: -126, w: 621, h: 492, // viewBox, with room above the arch for the sun
  top: 29,                       // top of the arch
  ground: 341.5,                 // middle of the ground line
  base: 364,                     // bottom of the dog's paws
};

export default function HallSketch() {
  const { x, y, w, h } = HALL;
  return (
    <svg className="hall-sketch" viewBox={`${x} ${y} ${w} ${h}`} aria-hidden="true" focusable="false">
      <defs>
        {/* The orange hover glow; Home.jsx moves it to the pointer. */}
        <radialGradient id="hs-art-glow" gradientUnits="userSpaceOnUse" cx="387" cy="200" r="150">
          <stop offset="0" className="hs-art-spot" />
          <stop offset="1" className="hs-art-base" />
        </radialGradient>
        <radialGradient id="hs-glow">
          <stop offset="0" className="hs-glow-in" />
          <stop offset="1" className="hs-glow-out" />
        </radialGradient>
        <clipPath id="hs-above-ground"><rect x="-200" y="-600" width="1200" height="940" /></clipPath>
      </defs>

      <g clipPath="url(#hs-above-ground)">
        <g className="hs-sun">
          <circle className="hs-glow" cx="387" cy="-14" r="230" fill="url(#hs-glow)" />
          <circle className="hs-disc" cx="387" cy="-14" r="108" />
        </g>
      </g>

      <path className="hs-cover" d={LOGO_COVER} />
      <path className="hs-art" d={LOGO_ART} fillRule="evenodd" />
    </svg>
  );
}
