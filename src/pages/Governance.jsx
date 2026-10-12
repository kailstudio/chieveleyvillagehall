import { GOV_DOCS, TEAM, SITE } from '../data/content.js';
import { PageHeader, Arrow } from '../components/Bits.jsx';

export default function Governance() {
  return (
    <>
      <PageHeader eyebrow="Governance" title="Hall" accent="governance"
        intro={`Chieveley Recreational Centre (CRC) is Registered Charity No. ${SITE.charityNo}. Here's how we're run and how we stay accountable to the community.`} />

      <section id="documents" className="section">
        <div className="wrap">
          <h2 className="display sm">Governance <em>documents</em></h2>
          <ul className="doc-list">
            {GOV_DOCS.map((d) => (
              <li key={d.title}>
                <a href={d.url} target="_blank" rel="noreferrer" className="doc">
                  <span className="doc-ic" aria-hidden="true">PDF</span>
                  <span className="doc-t"><strong>{d.title}</strong><span className="muted small">{d.note}</span></span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="meeting" className="band band-pink">
        <div className="wrap meeting">
          <div className="coffee-date" aria-hidden="true"><span className="cd-day">23</span><span className="cd-mon">November</span><span className="cd-sub">Monday</span></div>
          <div>
            <p className="eyebrow">Notice of next meeting</p>
            <h2 className="display sm">AGM <em>&amp; Trustees meeting 2026</em></h2>
            <p className="lede">Monday 23 November at Chieveley Village Hall. All are welcome.</p>
          </div>
        </div>
      </section>

      <section id="team" className="section">
        <div className="wrap">
          <h2 className="display sm">Meet <em>the team</em></h2>
          <p className="muted">Our Hall Executive Committee. Around 70 people support the hall in total.</p>
          <ul className="team-grid">
            {TEAM.map((t) => (
              <li key={t.name} className="member">
                <span className="avatar" aria-hidden="true">{t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
                <div>
                  <h3>{t.name}</h3>
                  <p className="role">{t.role}{t.elected && <span className="tag">Elected</span>}</p>
                  {t.bio && <p className="muted small">{t.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
