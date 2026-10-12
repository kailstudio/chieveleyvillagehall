import { useEffect, useState } from 'react';
import { NAV } from '../data/content.js';
import { href } from '../router.js';
import logo from '../assets/logo.jpg';

function isActive(item, page) {
  const pageOf = (to) => to.split('/')[0];
  if (item.to) return pageOf(item.to) === page && item.to !== 'home/reviews';
  return item.children.some((c) => pageOf(c.to) === page);
}

export default function Header({ page, section }) {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);

  // Close menus whenever the route changes
  useEffect(() => { setOpen(false); setOpenGroup(null); }, [page, section]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setOpenGroup(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="bar">
        <a href={href('home')} className="brand" aria-label="Chieveley Village Hall home">
          <img src={logo} alt="Chieveley Village Hall logo" />
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li
                key={item.label}
                className={`nav-item ${item.children ? 'has-menu' : ''} ${openGroup === item.label ? 'menu-open' : ''}`}
                onMouseEnter={() => item.children && window.matchMedia('(hover:hover)').matches && setOpenGroup(item.label)}
                onMouseLeave={() => item.children && window.matchMedia('(hover:hover)').matches && setOpenGroup(null)}
              >
                {item.children ? (
                  <>
                    <button
                      className={`nav-link ${isActive(item, page) ? 'active' : ''}`}
                      aria-expanded={openGroup === item.label}
                      onClick={() => setOpenGroup(openGroup === item.label ? null : item.label)}
                    >
                      {item.label}
                      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                    <ul className="submenu">
                      {item.children.map((c) => (
                        <li key={c.label}><a href={href(c.to)}>{c.label}</a></li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a className={`nav-link ${isActive(item, page) ? 'active' : ''}`} href={href(item.to)}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-ctas">
            <a className="btn btn-ghost" href={href('500-club/join')}>Donate</a>
            <a className="btn btn-primary" href={href('booking')}>Book the hall</a>
          </div>
        </nav>

        <button className="menu-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
