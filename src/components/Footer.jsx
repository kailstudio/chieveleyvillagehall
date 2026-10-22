import { SITE } from '../data/content.js';
import { href } from '../router.js';
import { Arrow } from './Bits.jsx';
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <a className="footer-logo" href={href('home')} aria-label="Chieveley Village Hall home"><img src={logo} alt="" /></a>
          <p className="footer-big">Bringing community <span className="thin">together.</span></p>
        </div>
        <a className="btn btn-outline-light" href={href('hire/how-to-book')}>Book the hall <Arrow /></a>
      </div>
      <div className="wrap footer-grid">
        <div>
          <h3 className="footer-h">Visit</h3>
          <p>{SITE.address}</p>
          <a className="text-link light" href={SITE.mapsUrl} target="_blank" rel="noreferrer">Google Maps <Arrow /></a>
        </div>
        <div>
          <h3 className="footer-h">Bookings</h3>
          <p>{SITE.bookingsManager}, Bookings Manager<br />
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a><br />
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>
        </div>
        <div>
          <h3 className="footer-h">The site</h3>
          <ul className="footer-links">
            <li><a href={href('whats-on')}>What's on</a></li>
            <li><a href={href('hire')}>Hire the hall</a></li>
            <li><a href={href('support')}>Support us</a></li>
            <li><a href={href('about')}>About</a></li>
            <li><a href={href('about/contact')}>Contact us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-h">Follow</h3>
          <ul className="footer-links">
            <li><a href={SITE.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={SITE.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
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
