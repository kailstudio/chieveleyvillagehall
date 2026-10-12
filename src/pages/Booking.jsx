import { SITE, BOOKING_STEPS } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, Photo, Arrow } from '../components/Bits.jsx';

export default function Booking() {
  return (
    <>
      <PageHeader eyebrow="Booking & availability" title="Book" accent="the hall" tone="butternut"
        intro="Children's parties, birthday celebrations, weddings and meeting-room hire. The hall is open to residents and non-residents, from Newbury and West Berkshire and beyond.">
        <div className="hero-actions">
          <a className="btn btn-dark btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Check availability <Arrow /></a>
          <a className="btn btn-ghost btn-lg" href={href('facilities')}>See the rooms</a>
        </div>
      </PageHeader>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="display sm">Five steps <em>to your booking</em></h2>
            <ol className="steps steps-vertical">
              {BOOKING_STEPS.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-n">{i + 1}</span>
                  <div><h3>{s.title}</h3><p>{s.text}</p></div>
                </li>
              ))}
            </ol>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Select a room <Arrow /></a>
              <a className="btn btn-ghost btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">What we charge</a>
            </div>
          </div>
          <aside className="contact-card sticky">
            <h3>Need help with a booking?</h3>
            <p>Contact {SITE.bookingsManager}, our Bookings Manager. She also looks after operations and help on the day.</p>
            <div className="contact-lines">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            </div>
            <p className="muted small">{SITE.address}</p>
          </aside>
        </div>
      </section>

      <section className="band band-mint">
        <div className="wrap two-col center">
          <Photo label="Friends of Chieveley Village Hall" shape="arch" tone="pink" />
          <div>
            <p className="eyebrow">Mission: make a difference</p>
            <h2 className="display sm">Could you <em>lend a hand?</em></h2>
            <p>We're looking for volunteers to help with:</p>
            <ul className="tick-list">
              <li>Easter and Christmas community events</li>
              <li>Our environmentally friendly goals</li>
              <li>An extra pair of hands at events through the year</li>
              <li>Improving our social media and website</li>
            </ul>
            <a className="btn btn-dark" href={`mailto:${SITE.email}`}>Contact us <Arrow /></a>
          </div>
        </div>
      </section>
    </>
  );
}
