// Illustrated landscape for the home hero: flat geometric shapes with soft
// colour-to-shadow gradients and film grain, drawn in the site palette.
// Swap for a photo any time.
import { useArtId, Grad, GrainLayer } from './Grain.jsx';

const W = 520;
const H = 600;

// A lily-of-the-valley stem: an arching line with bell flowers hanging off it.
function Lily({ x, y, h, bells, g }) {
  return (
    <g>
      <path d={`M${x} ${y}V${y - h * 0.7}c0-${h * 0.18} -8-${h * 0.28} -26-${h * 0.3}`}
        fill="none" stroke={`url(#${g}-stem)`} strokeWidth="3" strokeLinecap="round" />
      {bells.map(([t, dx], i) => {
        const by = y - h * t;
        const bx = x - dx;
        return (
          <g key={i}>
            <path d={`M${x} ${by}q${-dx * 0.55} -9 ${-dx} 2`} fill="none" stroke={`url(#${g}-stem)`} strokeWidth="2" strokeLinecap="round" />
            <circle cx={bx} cy={by + 11} r="10" fill={`url(#${g}-bell)`} />
            <path d={`M${bx - 10} ${by + 13}l3 7 3.5-3 3.5 3 3.5-3 3.5 3 3-7Z`} fill={`url(#${g}-bell)`} />
          </g>
        );
      })}
    </g>
  );
}

export default function HeroScene() {
  const g = useArtId();
  const u = (n) => `url(#${g}-${n})`;

  const bunting = [60, 92, 124, 156, 188, 220, 252, 280].map((x, i) => {
    const y = 120 + Math.sin(((x - 40) / 260) * Math.PI) * 26 - (x > 200 ? (x - 200) * 0.1 : 0);
    return { x, y, fill: ['flagB', 'flagM', 'flagP'][i % 3] };
  });

  return (
    <svg className="hero-scene" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Illustration of the village hall among rolling Berkshire hills">
      <defs>
        <Grad id={`${g}-sky`} angle={90} stops={[[0, '#f1dcd9'], [0.55, '#f6ebe4'], [1, '#e7eee6']]} />
        <Grad id={`${g}-sun`} angle={125} stops={[[0, '#f9d3bf'], [0.3, '#e58a68'], [0.68, '#b44e33'], [1, '#4a2018']]} />
        <Grad id={`${g}-halo`} angle={125} stops={[[0, '#ffffff', 0.7], [1, '#e0c7c9', 0]]} />
        <Grad id={`${g}-blob`} angle={60} stops={[[0, '#fffdf9', 0.9], [1, '#e0c7c9', 0]]} />
        <Grad id={`${g}-hillFar`} angle={20} stops={[[0, '#e3ebe3'], [0.5, '#b5c6b8'], [1, '#7f9a85']]} />
        <Grad id={`${g}-hillMid`} angle={160} stops={[[0, '#c9d7cb'], [0.45, '#93ac98'], [1, '#3d6343']]} />
        <Grad id={`${g}-field`} angle={30} stops={[[0, '#9cb79e'], [0.5, '#5c7f61'], [1, '#1f3a24']]} />
        <Grad id={`${g}-front`} angle={150} stops={[[0, '#5c8460'], [0.45, '#2f5a35'], [1, '#0e1d12']]} />
        <Grad id={`${g}-wall`} angle={120} stops={[[0, '#fffdf9'], [0.45, '#f3e2df'], [1, '#c89ea2']]} />
        <Grad id={`${g}-side`} angle={90} stops={[[0, '#d9bcbd'], [1, '#a98587']]} />
        <Grad id={`${g}-roof`} angle={115} stops={[[0, '#f4b498'], [0.35, '#dd7e5d'], [1, '#4a2018']]} />
        <Grad id={`${g}-door`} angle={100} stops={[[0, '#4f7653'], [1, '#14281a']]} />
        <Grad id={`${g}-win`} angle={130} stops={[[0, '#e9f0ea'], [0.5, '#acbeb0'], [1, '#4f7653']]} />
        <Grad id={`${g}-tree`} angle={125} stops={[[0, '#b9cfba'], [0.35, '#5c8460'], [1, '#0e1d12']]} />
        <Grad id={`${g}-poplar`} angle={110} stops={[[0, '#7f9f82'], [0.5, '#2f5a35'], [1, '#14281a']]} />
        <Grad id={`${g}-dog`} angle={120} stops={[[0, '#e58a68'], [0.5, '#a24a31'], [1, '#3a1a12']]} />
        <Grad id={`${g}-flagB`} angle={100} stops={[[0, '#f2b298'], [1, '#b9553a']]} />
        <Grad id={`${g}-flagM`} angle={100} stops={[[0, '#d9e3da'], [1, '#6f8f73']]} />
        <Grad id={`${g}-flagP`} angle={100} stops={[[0, '#f6e7e7'], [1, '#c69a9e']]} />
        <Grad id={`${g}-bell`} angle={120} stops={[[0, '#ffffff'], [0.55, '#eef1ea'], [1, '#a9bdae']]} />
        <Grad id={`${g}-stem`} angle={90} stops={[[0, '#c9d5cb'], [1, '#8aa78c']]} />
        <Grad id={`${g}-leaf`} angle={60} stops={[[0, '#d9e3da'], [0.5, '#8aa78c'], [1, '#2f5a35']]} />
      </defs>

      {/* sky */}
      <rect width={W} height={H} fill={u('sky')} />
      <circle cx="120" cy="250" r="120" fill={u('blob')} opacity=".55" />

      {/* sun with fine rings */}
      <g fill="none" stroke="#fffdf9" strokeWidth="1.2" opacity=".75">
        <circle cx="372" cy="200" r="96" />
        <circle cx="372" cy="200" r="112" />
        <circle cx="372" cy="200" r="128" opacity=".6" />
      </g>
      <circle cx="372" cy="200" r="66" fill={u('sun')} />

      {/* serpentine line, as in the reference style */}
      <path d="M58 228h64a10 10 0 0 0 0-20H76a10 10 0 0 1 0-20h70a10 10 0 0 0 0-20H96"
        fill="none" stroke="#fffdf9" strokeWidth="1.4" strokeLinecap="round" opacity=".85" />

      {/* small floating dots */}
      <g fill="#fffdf9">
        <circle cx="470" cy="104" r="5" />
        <circle cx="262" cy="196" r="3" />
        <circle cx="300" cy="230" r="6" opacity=".8" />
      </g>
      <circle cx="482" cy="300" r="7" fill={u('sun')} />
      <circle cx="456" cy="320" r="4" fill={u('sun')} />

      {/* bunting */}
      <path d="M40 120 Q160 170 300 128" fill="none" stroke="#2f5a35" strokeWidth="1.2" opacity=".7" />
      {bunting.map((b) => (
        <path key={b.x} d={`M${b.x - 10} ${b.y}l10 20 10-20Z`} fill={u(b.fill)} />
      ))}

      {/* far hills */}
      <path d="M0 330c70-40 140-56 220-34s150 38 220 8 80-20 80-20v316H0Z" fill={u('hillFar')} />
      <path d="M0 370c90-36 170-40 250-14s170 26 270-18v262H0Z" fill={u('hillMid')} />

      {/* poplar and round tree */}
      <rect x="401" y="300" width="4" height="110" fill="#1f3a24" />
      <rect x="386" y="246" width="34" height="96" rx="17" fill={u('poplar')} />
      <rect x="187" y="340" width="4" height="70" fill="#1f3a24" />
      <circle cx="189" cy="336" r="32" fill={u('tree')} />

      {/* the hall */}
      <g transform="translate(246 292)">
        <rect x="116" y="48" width="18" height="70" fill={u('side')} />
        <rect x="0" y="48" width="118" height="70" fill={u('wall')} />
        <path d="M-10 52 59 -6l69 58Z" fill={u('roof')} />
        <circle cx="59" cy="28" r="11" fill={u('win')} />
        <circle cx="59" cy="28" r="4" fill="#1f3a24" opacity=".6" />
        <rect x="47" y="76" width="24" height="42" rx="12" ry="12" fill={u('door')} />
        <rect x="47" y="98" width="24" height="20" fill={u('door')} />
        <rect x="16" y="66" width="20" height="20" rx="3" fill={u('win')} />
        <rect x="82" y="66" width="20" height="20" rx="3" fill={u('win')} />
      </g>

      {/* near fields with fine furrow lines */}
      <path d="M0 420c110-26 230-26 330-6s150 18 190 8v178H0Z" fill={u('field')} />
      <path d="M0 470c130-20 260-14 380 4s140 10 140 10v116H0Z" fill={u('front')} />
      <g stroke="#c9d5cb" strokeWidth="1" opacity=".35" fill="none">
        <path d="M20 512c120-14 260-12 480 8" />
        <path d="M0 540c140-12 300-10 520 10" />
        <path d="M0 568c160-10 320-8 520 6" />
      </g>
      <g fill="none" stroke="#c9d5cb" strokeWidth="1" opacity=".3">
        <circle cx="372" cy="566" r="16" />
        <circle cx="372" cy="566" r="28" />
      </g>

      {/* dog */}
      <g transform="translate(230 528)" fill={u('dog')}>
        <path d="M0 22c0-10 8-16 18-16h22l6-6c6-2 10 2 10 7 0 3-2 6-5 7v8l-4 18h-6l1-14H16l-3 14H7l1-15c-5-1-8-3-8-3Z" />
        <path d="M6 12c-6-2-10-8-8-14" stroke={u('dog')} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>

      {/* lily of the valley in the foreground */}
      <path d="M440 600c-14-56-8-118 22-168 10 60 2 120-22 168Z" fill={u('leaf')} />
      <Lily g={g} x={474} y={600} h={160} bells={[[0.62, 24], [0.48, 22], [0.34, 20]]} />
      <Lily g={g} x={500} y={600} h={112} bells={[[0.52, 20], [0.32, 18]]} />
      <path d="M492 600c18-40 22-84 8-122-22 34-24 80-8 122Z" fill={u('leaf')} opacity=".8" />

      <GrainLayer id={g} width={W} height={H} strength={0.75} />
    </svg>
  );
}
