import { GALLERY_INTERIOR } from '../data/content.js';
import { href } from '../router.js';
import { PageHeader, Photo, Arrow } from '../components/Bits.jsx';

const EVENT_PHOTOS = ['Christmas lunch', 'Themed party', 'Pet show', 'Family celebration', 'Village event', 'Community gathering', 'Panto night', 'Summer on the grounds'];

export default function Gallery() {
  return (
    <>
      <PageHeader eyebrow="Gallery" title="Explore" accent="the hall" tone="pink"
        intro="Popular with hirers across West Berkshire and the rest of the UK. From Darth Vader to Dick Whittington, Christmas lunches to UK pet shows.">
        <div className="hero-actions"><a className="btn btn-primary btn-lg" href={href('booking')}>Book the hall <Arrow /></a></div>
      </PageHeader>
      <section className="section">
        <div className="wrap">
          <h2 className="display sm">Past <em>events</em></h2>
          <div className="masonry">
            {EVENT_PHOTOS.map((p, i) => <Photo key={p} label={p} shape="soft" tone={['pink', 'mint', 'butternut'][i % 3]} />)}
          </div>
        </div>
      </section>
      <section className="band band-mint">
        <div className="wrap">
          <h2 className="display sm">Take a look <em>inside our hall</em></h2>
          <div className="interior-row">
            {GALLERY_INTERIOR.map((p) => (
              <figure key={p} className="interior">
                <Photo label={p} shape="arch" tone="pink" />
                <figcaption>{p}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
