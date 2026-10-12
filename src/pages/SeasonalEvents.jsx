import { STALLHOLDERS } from '../data/content.js';
import { PageHeader, Photo, ContactCard } from '../components/Bits.jsx';

export default function SeasonalEvents() {
  return (
    <>
      <PageHeader eyebrow="Christmas & Easter events" title="Christmas market" accent="& tree lighting" tone="pink"
        intro="Our next market is in late November 2026: the popular Christmas market and tree lighting ceremony. Full details will be posted nearer the time." />
      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="display sm">Our <em>stallholders</em></h2>
            <div className="stall-cols">
              {Object.entries(STALLHOLDERS).map(([k, list]) => (
                <div key={k} className="stall-col">
                  <h3>{k}</h3>
                  <ul>{list.map((s) => <li key={s}>{s}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <Photo label="Christmas market & tree lighting" shape="arch" tone="butternut" />
        </div>
      </section>
      <section className="wrap section-tight"><ContactCard title="Want a stall or more details?" /></section>
    </>
  );
}
