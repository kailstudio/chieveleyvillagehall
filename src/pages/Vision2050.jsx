import { href } from '../router.js';
import { PageHeader, Arrow } from '../components/Bits.jsx';

export default function Vision2050() {
  return (
    <>
      <PageHeader eyebrow="What's on" title="Our vision" accent="2050"
        intro="The CRC committee wants to improve the Chieveley Recreational Centre so it meets the future needs of villagers, individuals and families alike." />
      <section className="section">
        <div className="wrap three-col">
          <article className="info-card">
            <span className="big-stat">360+</span>
            <h2 className="h3">Questionnaire responses</h2>
            <p>In 2024 we asked the village and surrounding community how the hall should develop. The analysis is complete and we've started putting the results into practice. We'll keep sharing progress.</p>
          </article>
          <article className="info-card">
            <h2 className="h3">Results from the questionnaire</h2>
            <p>The full results cover how the hall should develop and which activities and classes people want. Some requests are already happening; others are in progress.</p>
            <a className="text-link" href="https://www.chieveleyvillagehall.org/_files/ugd/dcef2e_c3ada41eced748779526522dce25d22a.pdf" target="_blank" rel="noreferrer">High-level results (PDF) <Arrow /></a>
          </article>
          <article className="info-card">
            <h2 className="h3">Solar panels installed</h2>
            <p>Solar panels on the west side of the building now provide renewable energy and lower our electricity costs. Thank you to JEM Energy for an efficient, affordable installation.</p>
            <a className="text-link" href="https://www.jem-energy.co.uk/" target="_blank" rel="noreferrer">JEM Energy <Arrow /></a>
            <p className="muted small">We don't give individual professional advice; contacting JEM is at your discretion. The hall may receive a small fee if you become a JEM customer through this link.</p>
          </article>
        </div>
        <div className="wrap">
          <div className="note-band">
            <p>We've secured several grants for hall improvements, and donations of any size are welcome. Questions about Vision 2050? Contact Neal Courtney, Chair, on <a href="tel:07831677037">07831 677037</a> or <a href="mailto:chair.crc@outlook.com">chair.crc@outlook.com</a>.</p>
            <a className="btn btn-donate" href={href('500-club/join')}>Donate</a>
          </div>
        </div>
      </section>
    </>
  );
}
