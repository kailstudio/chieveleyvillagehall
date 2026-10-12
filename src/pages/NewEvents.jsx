import { SITE } from '../data/content.js';
import { PageHeader, Photo, ContactCard } from '../components/Bits.jsx';

// Add each new event as an object here. The current site shows events as
// posters only, so these three slots are ready for their images.
const EVENTS = [
  { title: 'New event', label: 'Event poster 1' },
  { title: 'New event', label: 'Event poster 2' },
  { title: 'New event', label: 'Event poster 3' },
];

export default function NewEvents() {
  return (
    <>
      <PageHeader eyebrow="What's new" title="New" accent="events" tone="pink"
        intro="New events and classes at the hall, with something for almost everyone. Follow us for the latest news." />
      <section className="section">
        <div className="wrap three-col">
          {EVENTS.map((e) => <Photo key={e.label} label={e.label} shape="soft" tone="mint" className="poster" />)}
        </div>
        <div className="wrap cta-row">
          <a className="btn btn-ghost" href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a className="btn btn-ghost" href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </section>
      <section className="wrap section-tight"><ContactCard /></section>
    </>
  );
}
