import { FACILITY_PHOTOS } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, Photo, ContactCard, Arrow } from '../components/Bits.jsx';

const SPACES = [
  { name: 'Main hall', text: 'A large, open hall with a sprung floor, for parties, classes, shows and receptions.' },
  { name: 'Main hall kitchen', text: 'A kitchen serving the main hall for catering and events.' },
  { name: 'Club room', text: 'A smaller room for meetings, clubs and gatherings.' },
  { name: 'Club room kitchen & bar', text: 'A kitchen and bar area alongside the club room.' },
  { name: 'Grounds & recreation ground', text: 'Level grounds used for cricket, football, dog shows, the fete and fireworks.' },
  { name: 'Playground & parking', text: "A children's playground and ample parking, including for large vehicles." },
];

export default function Facilities() {
  return (
    <>
      <PageHeader eyebrow="Facilities" title="Hall and grounds" accent="facilities"
        intro="Views of the hall and grounds, and some of the ways people have used them.">
        <div className="hero-actions"><a className="btn btn-primary btn-lg" href={href('booking')}>Booking &amp; availability <Arrow /></a></div>
      </PageHeader>
      <section className="section">
        <div className="wrap">
          <ul className="space-grid">
            {SPACES.map((s) => (
              <li key={s.name} className="space">
                <Photo label={s.name} shape="soft" tone="mint" />
                <h3>{s.name}</h3>
                <p className="muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="band band-pink">
        <div className="wrap">
          <h2 className="display sm">The hall <em>in use</em></h2>
          <div className="masonry">
            {FACILITY_PHOTOS.map((p, i) => <Photo key={p} label={p} shape="soft" tone={['mint', 'pink', 'butternut'][i % 3]} />)}
          </div>
        </div>
      </section>
      <section className="wrap section-tight"><ContactCard /></section>
    </>
  );
}
