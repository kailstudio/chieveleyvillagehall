import { SITE } from '../data/content.js';
import { href } from '../router.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-intro">
          <p className="footer-name">Chieveley Village Hall<br /><em>{SITE.tagline}</em></p>
          <p className="muted-light">{SITE.address}</p>
          <div className="socials">
            <a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer">Google Maps</a>
          </div>
        </div>

        <div>
          <h3 className="footer-h">Help with bookings</h3>
          <p>{SITE.bookingsManager}, Bookings Manager<br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>
          <p className="muted-light">Also your contact for operations and help on the day.</p>
        </div>

        <div>
          <h3 className="footer-h">Quick links</h3>
          <ul className="footer-links">
            <li><a href={href('booking')}>How to book</a></li>
            <li><a href={href('home/coffee-stop')}>The Coffee Stop</a></li>
            <li><a href={href('regular-events')}>Classes &amp; activities</a></li>
            <li><a href={href('500-club/join')}>Donate · 500 Club</a></li>
            <li><a href={href('governance')}>Governance</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© 2026 Chieveley Village Hall</span>
        <span>{SITE.charity}</span>
      </div>
    </footer>
  );
}
