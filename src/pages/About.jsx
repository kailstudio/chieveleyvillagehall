import { SITE, GOV_DOCS, TEAM, CLUB_500 } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, JumpLinks, Arrow } from '../components/Bits.jsx';

export default function About() {
  return (
    <>
      <PageHeader photo="hero-about" eyebrow="About" title="How the hall" accent="is run."
        intro={`Chieveley Recreational Centre (CRC) is Registered Charity No. ${SITE.charityNo}, run by a volunteer committee. Meet the team, come to the next meeting and read our documents.`} />
      <JumpLinks page="about" links={[['team', 'Meet the team'], ['meeting', 'Next meeting'], ['documents', 'Documents'], ['vision-2050', 'Vision 2050'], ['contact', 'Contact us']]} />

      {/* ---------- Meet the team ---------- */}
      <section id="team" className="section">
        <div className="wrap">
          <h2 className="display sm">Meet <span className="thin">the team</span></h2>
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

      {/* ---------- Next meeting / AGM ---------- */}
      <section id="meeting" className="band band-pink">
        <div className="wrap meeting">
          <div className="coffee-date" aria-hidden="true"><span className="cd-day">23</span><span className="cd-mon">November</span><span className="cd-sub">Monday</span></div>
          <div>
            <p className="eyebrow">Notice of next meeting</p>
            <h2 className="display sm">AGM <span className="thin">&amp; Trustees meeting 2026</span></h2>
            <p className="lede">Monday 23 November at Chieveley Village Hall. All are welcome.</p>
          </div>
        </div>
      </section>

      {/* ---------- Governance documents ---------- */}
      <section id="documents" className="section">
        <div className="wrap">
          <h2 className="display sm">Governance <span className="thin">documents</span></h2>
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

      {/* ---------- Vision 2050 ---------- */}
      <section id="vision-2050" className="band band-mint">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Looking ahead</p>
              <h2 className="display">Our vision <span className="thin">2050</span></h2>
            </div>
            <p className="muted">The CRC committee wants to improve the Chieveley Recreational Centre so it meets the future needs of villagers, individuals and families alike.</p>
          </div>
          <div className="three-col">
            <article className="info-card">
              <span className="big-stat">360+</span>
              <h3 className="h3">Questionnaire responses</h3>
              <p>In 2024 we asked the village and surrounding community how the hall should develop. The analysis is complete and we've started putting the results into practice. We'll keep sharing progress.</p>
            </article>
            <article className="info-card">
              <h3 className="h3">Results from the questionnaire</h3>
              <p>The full results cover how the hall should develop and which activities and classes people want. Some requests are already happening; others are in progress.</p>
              <a className="text-link" href="https://www.chieveleyvillagehall.org/_files/ugd/dcef2e_c3ada41eced748779526522dce25d22a.pdf" target="_blank" rel="noreferrer">High-level results (PDF) <Arrow /></a>
            </article>
            <article className="info-card">
              <h3 className="h3">Solar panels installed</h3>
              <p>Solar panels on the west side of the building now provide renewable energy and lower our electricity costs. Thank you to JEM Energy for an efficient, affordable installation.</p>
              <a className="text-link" href="https://www.jem-energy.co.uk/" target="_blank" rel="noreferrer">JEM Energy <Arrow /></a>
              <p className="muted small">We don't give individual professional advice; contacting JEM is at your discretion. The hall may receive a small fee if you become a JEM customer through this link.</p>
            </article>
          </div>
          <div className="note-band">
            <p>Questions about Vision 2050? Contact Neal Courtney, Chair, on <a href="tel:07831677037">07831 677037</a> or <a href="mailto:chair.crc@outlook.com">chair.crc@outlook.com</a>.</p>
            <a className="btn btn-donate" href={href('support')}>Support us</a>
          </div>
        </div>
      </section>

      {/* ---------- Contact us ---------- */}
      <section id="contact" className="section">
        <div className="wrap">
          <h2 className="display sm">Contact <span className="thin">us</span></h2>
          <div className="three-col">
            <article className="info-card">
              <h3 className="h3">Bookings &amp; help on the day</h3>
              <p>{SITE.bookingsManager}, Bookings Manager</p>
              <p className="small"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><br /><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>
            </article>
            <article className="info-card">
              <h3 className="h3">The committee</h3>
              <p>Neal Courtney, Chair of Trustees</p>
              <p className="small"><a href="mailto:chair.crc@outlook.com">chair.crc@outlook.com</a><br /><a href="tel:07831677037">07831 677037</a></p>
              <p className="small">500 Club: <a href={`mailto:${CLUB_500.email}`}>{CLUB_500.email}</a></p>
            </article>
            <article className="info-card">
              <h3 className="h3">Classes</h3>
              <p>Each class lists its organiser's phone or email.</p>
              <a className="text-link" href={href('whats-on/classes')}>Weekly classes <Arrow /></a>
              <p className="muted small">{SITE.address}</p>
              <a className="text-link" href={SITE.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Arrow /></a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
