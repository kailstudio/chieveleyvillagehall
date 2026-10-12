// Coffee Stop cup, in the grainy-gradient illustration style.
import { useArtId, Grad, GrainLayer } from './Grain.jsx';

export default function CoffeeCup({ className = 'coffee-cup' }) {
  const g = useArtId();
  const u = (n) => `url(#${g}-${n})`;
  return (
    <svg className={className} viewBox="0 0 160 160" aria-hidden="true">
      <defs>
        <Grad id={`${g}-disc`} angle={120} stops={[[0, '#fffdf9', 0.95], [1, '#acbeb0', 0.9]]} />
        <Grad id={`${g}-cup`} angle={115} stops={[[0, '#f4b498'], [0.35, '#dd7e5d'], [0.75, '#9c4430'], [1, '#4a2018']]} />
        <Grad id={`${g}-rim`} angle={0} stops={[[0, '#6e2f22'], [0.5, '#4a2018'], [1, '#2a120c']]} />
        <Grad id={`${g}-saucer`} angle={20} stops={[[0, '#c9d5cb'], [0.5, '#6f8f73'], [1, '#1f3a24']]} />
        <Grad id={`${g}-dot`} angle={120} stops={[[0, '#f4b498'], [1, '#9c4430']]} />
        <clipPath id={`${g}-clip`}><circle cx="80" cy="80" r="80" /></clipPath>
      </defs>
      <g clipPath={u('clip')}>
        <circle cx="80" cy="84" r="62" fill={u('disc')} />
        <g fill="none" stroke="#fffdf9" strokeWidth="1" opacity=".9">
          <circle cx="80" cy="84" r="68" />
          <circle cx="80" cy="84" r="74" opacity=".6" />
        </g>
        {/* steam */}
        <path d="M60 54c-7-6 7-10 0-16s7-10 0-16M78 54c-7-6 7-10 0-16s7-10 0-16s7-8 0-12M96 54c-7-6 7-10 0-16s7-10 0-16"
          fill="none" stroke="#1f3a24" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
        {/* handle */}
        <path d="M118 78h6a14 14 0 0 1 0 28h-10" fill="none" stroke={u('cup')} strokeWidth="9" strokeLinecap="round" />
        {/* cup body */}
        <path d="M28 66h96v22a38 38 0 0 1-38 38h-20a38 38 0 0 1-38-38Z" fill={u('cup')} />
        <rect x="28" y="62" width="96" height="8" rx="4" fill={u('rim')} />
        <path d="M44 86h22a5 5 0 0 1 0 10H50a5 5 0 0 0 0 10h22" fill="none" stroke="#fffdf9" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
        <circle cx="98" cy="88" r="3" fill="#fffdf9" opacity=".75" />
        <circle cx="106" cy="98" r="2" fill="#fffdf9" opacity=".55" />
        {/* saucer */}
        <rect x="14" y="124" width="132" height="12" rx="6" fill={u('saucer')} />
        <circle cx="140" cy="44" r="6" fill={u('dot')} />
        <circle cx="128" cy="30" r="3" fill={u('dot')} />
        <GrainLayer id={g} width={160} height={160} strength={0.75} freq={1.1} />
      </g>
    </svg>
  );
}
