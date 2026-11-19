import { SITE, HIRE_DOCS, BOOKING_STEPS, REVIEWS, GALLERY_INTERIOR, PHOTOS, img } from '../data/content.js';
import StepStack from '../components/StepStack.jsx';
import RoomFan from '../components/RoomFan.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ThumbnailCarousel from '../components/ThumbnailCarousel.jsx';
import { PageHeader, JumpLinks, Photo, Arrow, AvailabilityCard } from '../components/Bits.jsx';

const SPACES = [
  { name: 'Main hall', text: 'A large, open hall with a sprung floor, for parties, classes, shows and receptions.' },
  { name: 'Main hall kitchen', text: 'A kitchen serving the main hall for catering and events.' },
  { name: 'Club room', text: 'A smaller room for meetings, clubs and gatherings.' },
  { name: 'Club room kitchen & bar', text: 'A kitchen and bar area alongside the club room.' },
  { name: 'Grounds & recreation ground', text: 'Level grounds used for cricket, football, dog shows, the fete and fireworks.' },
  { name: 'Playground & parking', text: "A children's playground and ample parking, including for large vehicles." },
];

// How each inside photo is framed in the pill (object-position), to show the
// most of each room.
const INTERIOR_FRAMING = {
  'Large main hall': '50% 30%',
  'Large main hall, garden side': '50% 40%',
  'Main hall kitchen': '50% 45%',
  'Entrance into Club Room': '50% 40%',
  'The Club Room': '50% 45%',
  'Bar area in the Club Room': '50% 40%',
};

export default function Hire() {
  return (
    <>
      <PageHeader photo="hero-hire" pale eyebrow="Hire the hall" title="Hire" accent="the hall."
        intro="Children's parties, birthdays, weddings, meetings, classes and dog shows. The hall is open to residents and non-residents, from Newbury and West Berkshire and beyond.">
        <div className="hero-actions">
          <a className="btn btn-solid-light" href="#/hire/calendar">Check availability <Arrow /></a>
          <a className="btn btn-outline-light" href="#/hire/how-to-book">How to book</a>
        </div>
      </PageHeader>
      <JumpLinks page="hire" links={[
        ['rooms', 'Rooms & facilities'], ['prices', 'Prices'], ['how-to-book', 'How to book'], ['calendar', 'Booking calendar'], ['documents', 'Documents'],
        ['dog-shows', 'Dog shows & outdoor events'], ['reviews', 'What hirers say'], ['photos', 'Photos'],
      ]} />

      {/* ---------- Rooms & facilities ---------- */}
      <section id="rooms" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Rooms &amp; facilities</p>
              <h2 className="display">A main hall, club room, <span className="thin">two kitchens and a bar</span></h2>
            </div>
            <p className="muted">Pick the space that fits your event, then choose it under "Select Room" when you book.</p>
          </div>
          <RoomFan spaces={SPACES} />
          <p className="fan-hint muted small">Click a room to take a closer look.</p>
        </div>
      </section>

      {/* ---------- Prices ---------- */}
      <section id="prices" className="section price-section">
        <div className="wrap">
          <div className="price-card">
            <ul className="price-tags">
              <li className="is-dark">Prices</li>
              <li>Deposit secures your booking</li>
              <li>Repeat bookings</li>
              <li>Vehicles don't change the price</li>
            </ul>
            <h2 className="price-title">What <span className="thin">we charge</span></h2>
            <div className="price-foot">
              <p>Our rates depend on the room, the day and how long you need it. See the full price list, or ask {SITE.bookingsManager} for a quote.</p>
              <a className="price-go" href={SITE.priceListUrl} target="_blank" rel="noreferrer">
                <span>See the price list</span>
                <span className="price-arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How to book + availability ---------- */}
      <section id="how-to-book" className="section">
        <div className="wrap">
          <div className="steps-layout">
            <div className="steps-intro">
              <p className="eyebrow">How to book</p>
              <h2 className="display sm">Five steps <span className="thin">to your booking</span></h2>
              <AvailabilityCard />
            </div>
            <StepStack steps={BOOKING_STEPS} />
          </div>
          <aside className="help-card">
            <div>
              <h3>Need help with a booking?</h3>
              <p>Contact {SITE.bookingsManager}, our Bookings Manager. She also looks after operations and help on the day.</p>
            </div>
            <div className="help-lines">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
              <p className="small">{SITE.address}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ---------- Booking calendar (Hallmaster) ----------
          The hall's live Hallmaster calendar, framed in the site's own design.
          Hallmaster draws everything inside the frame (its own colours), and
          handles accounts and booking requests. */}
      <section id="calendar" className="section cal-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Booking calendar</p>
              <h2 className="display">Check <span className="thin">availability</span></h2>
            </div>
            <p className="muted">Choose a room under "Select Room", then click + on a date to request it. {SITE.bookingsManager} checks and approves each request.</p>
          </div>
          <div className="cal-frame">
            <div className="cal-bar">
              <span className="cal-live"><i aria-hidden="true" /> Live availability</span>
              <a className="cal-open" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Open full screen <Arrow /></a>
            </div>
            <iframe
              className="cal-iframe"
              src={SITE.bookingSystemUrl}
              title="Chieveley Village Hall booking calendar"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ---------- Hirer documents (files in public/files/) ---------- */}
      <section id="documents" className="section">
        <div className="wrap">
          <p className="eyebrow">Before you book</p>
          <h2 className="display sm">Hirer <span className="thin">documents</span></h2>
          <ul className="doc-list">
            {HIRE_DOCS.map((d) => (
              <li key={d.title}>
                <a href={d.url} target="_blank" rel="noreferrer" className="doc">
                  <span className="doc-ic" aria-hidden="true">{d.type || 'PDF'}</span>
                  <span className="doc-t"><strong>{d.title}</strong><span className="muted small">{d.note}</span></span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Dog shows & outdoor events ---------- */}
      <section id="dog-shows" className="band band-pink">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Dog shows &amp; outdoor events</p>
              <h2 className="display">For dog clubs <span className="thin">&amp; pet shows</span></h2>
            </div>
            <p className="muted">We welcome dog clubs and other pet clubs, and many come back every year. Chieveley sits in the centre of the south of England, so it's easy to find and reach.</p>
          </div>
          <div className="three-col">
            <article className="info-card">
              <h3 className="h3">Inside &amp; out</h3>
              <ul className="tick-list">
                <li>Large, open hall with a sprung floor that's comfortable to walk on</li>
                <li>Classes and events indoors or outdoors, depending on weather and your needs</li>
                <li>A cleaning regime designed for pets</li>
                <li>Level grounds kept to Kennel Club standard as a recognised venue</li>
                <li>Ample parking, including large vehicles</li>
              </ul>
            </article>
            <article className="info-card">
              <h3 className="h3">Elite &amp; beginner</h3>
              <ul className="tick-list">
                <li>Experienced members can expect smooth presentation and arrangements</li>
                <li>New members are welcomed and supported to settle in quickly</li>
                <li>Space for exercise rings, indoor catering and outdoor benches</li>
                <li>Sponsors can put up stands and tents to help offset costs</li>
                <li>Your secretary and judges can arrange facilities to suit them</li>
              </ul>
            </article>
            <Photo label="Rhodesian Ridgeback show" shape="tall" tone="mint" />
          </div>
        </div>
      </section>

      {/* ---------- What hirers say ---------- */}
      <section id="reviews" className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Reviews</p>
              <h2 className="display">What hirers <span className="thin">say</span></h2>
            </div>
          </div>
          <Testimonials reviews={REVIEWS} />
        </div>
      </section>

      {/* ---------- Photos of the hall ---------- */}
      <section id="photos" className="band band-mint">
        <div className="wrap">
          <h2 className="display sm">Take a look <span className="thin">inside our hall</span></h2>
          <ThumbnailCarousel
            className="tc-interior"
            label="Photos inside the hall"
            items={GALLERY_INTERIOR.filter((p) => PHOTOS[p]).map((p) => ({
              label: p, src: img(PHOTOS[p], 1800), thumb: img(PHOTOS[p], 200), pos: INTERIOR_FRAMING[p],
            }))}
          />
          <AvailabilityCard wide />
        </div>
      </section>
    </>
  );
}
