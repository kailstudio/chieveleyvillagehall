import { SITE, BOOKING_STEPS, REVIEWS, GALLERY_INTERIOR, FACILITY_PHOTOS } from '../data/content.js';
import { PageHeader, JumpLinks, Photo, Arrow } from '../components/Bits.jsx';

const SPACES = [
  { name: 'Main hall', text: 'A large, open hall with a sprung floor, for parties, classes, shows and receptions.' },
  { name: 'Main hall kitchen', text: 'A kitchen serving the main hall for catering and events.' },
  { name: 'Club room', text: 'A smaller room for meetings, clubs and gatherings.' },
  { name: 'Club room kitchen & bar', text: 'A kitchen and bar area alongside the club room.' },
  { name: 'Grounds & recreation ground', text: 'Level grounds used for cricket, football, dog shows, the fete and fireworks.' },
  { name: 'Playground & parking', text: "A children's playground and ample parking, including for large vehicles." },
];

export default function Hire() {
  return (
    <>
      <PageHeader photo="hero-hire" eyebrow="Hire the hall" title="Hire" accent="the hall."
        intro="Children's parties, birthdays, weddings, meetings, classes and dog shows. The hall is open to residents and non-residents, from Newbury and West Berkshire and beyond.">
        <div className="hero-actions">
          <a className="btn btn-solid-light" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Check availability <Arrow /></a>
          <a className="btn btn-outline-light" href="#/hire/how-to-book">How to book</a>
        </div>
      </PageHeader>
      <JumpLinks page="hire" links={[
        ['rooms', 'Rooms & facilities'], ['prices', 'Prices'], ['how-to-book', 'How to book'],
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

      {/* ---------- Prices ---------- */}
      <section id="prices" className="band band-mint">
        <div className="wrap two-col center">
          <div>
            <p className="eyebrow">Prices</p>
            <h2 className="display sm">What <span className="thin">we charge</span></h2>
            <p>Our rates depend on the room, the day and how long you need it. See the full price list, or ask {SITE.bookingsManager} for a quote.</p>
            <ul className="tick-list">
              <li>Your booking is secured once we acknowledge your deposit</li>
              <li>Regular users can arrange repeat bookings</li>
              <li>Telling us how many vehicles to expect doesn't change the price</li>
            </ul>
            <div className="cta-row">
              <a className="btn btn-dark" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">See the price list <Arrow /></a>
            </div>
          </div>
          <Photo label="Party in the hall" shape="tall" tone="pink" />
        </div>
      </section>

      {/* ---------- How to book + availability ---------- */}
      <section id="how-to-book" className="section">
        <div className="wrap two-col">
          <div>
            <p className="eyebrow">How to book</p>
            <h2 className="display sm">Five steps <span className="thin">to your booking</span></h2>
            <p className="muted">Availability is shown up to a year ahead on our booking calendar.</p>
            <ol className="steps steps-vertical">
              {BOOKING_STEPS.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-n">{i + 1}</span>
                  <div><h3>{s.title}</h3><p>{s.text}</p></div>
                </li>
              ))}
            </ol>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Check availability <Arrow /></a>
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
          <ul className="reviews">
            {REVIEWS.map((r) => (
              <li key={r.name} className="review">
                <p>{r.text}</p>
                <footer>
                  <strong>{r.name}</strong>
                  {(r.org || r.date) && <span>{[r.org, r.date].filter(Boolean).join(' · ')}</span>}
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Photos of the hall ---------- */}
      <section id="photos" className="band band-mint">
        <div className="wrap">
          <h2 className="display sm">Take a look <span className="thin">inside our hall</span></h2>
          <div className="interior-row">
            {GALLERY_INTERIOR.map((p) => (
              <figure key={p} className="interior">
                <Photo label={p} shape="tall" tone="pink" />
                <figcaption>{p}</figcaption>
              </figure>
            ))}
          </div>
          <h2 className="display sm photos-h">The hall <span className="thin">in use</span></h2>
          <div className="masonry">
            {FACILITY_PHOTOS.map((p, i) => <Photo key={p} label={p} shape="soft" tone={['mint', 'pink', 'butternut'][i % 3]} />)}
          </div>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href={SITE.bookingSystemUrl} target="_blank" rel="noreferrer">Check availability <Arrow /></a>
          </div>
        </div>
      </section>
    </>
  );
}
