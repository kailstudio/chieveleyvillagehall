import { PageHeader, Photo, ContactCard } from '../components/Bits.jsx';

export default function DogClubs() {
  return (
    <>
      <PageHeader eyebrow="What's on" title="Dog clubs" accent="& pet shows"
        intro="We welcome dog clubs and other pet clubs, and many come back every year. Chieveley sits in the centre of the south of England, so it's easy to find and reach." />
      <section className="section">
        <div className="wrap three-col">
          <article className="info-card">
            <h2 className="display sm">Inside <em>&amp; out</em></h2>
            <ul className="tick-list">
              <li>Large, open hall with a sprung floor that's comfortable to walk on</li>
              <li>Classes and events indoors or outdoors, depending on weather and your needs</li>
              <li>A cleaning regime designed for pets</li>
              <li>Level grounds kept to Kennel Club standard as a recognised venue</li>
              <li>Ample parking, including large vehicles</li>
            </ul>
          </article>
          <article className="info-card">
            <h2 className="display sm">Elite <em>&amp; beginner</em></h2>
            <ul className="tick-list">
              <li>Experienced members can expect smooth presentation and arrangements</li>
              <li>New members are welcomed and supported to settle in quickly</li>
              <li>Space for exercise rings, indoor catering and outdoor benches</li>
              <li>Sponsors can put up stands and tents to help offset costs</li>
              <li>Your secretary and judges can arrange facilities to suit them</li>
            </ul>
          </article>
          <Photo label="Rhodesian Ridgeback show" shape="arch" tone="mint" />
        </div>
      </section>
      <section className="wrap section-tight"><ContactCard title="Planning a show?" /></section>
    </>
  );
}
