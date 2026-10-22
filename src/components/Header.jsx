import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV, CTA } from '../data/content.js';
import { href } from '../router.js';
import logo from '../assets/logo.jpg';

// Four menu items. On devices with a mouse, hovering an item opens a drop-down
// of that page's sections. A highlight pill slides between items and the
// drop-down fades in softly.
const canHover = () => window.matchMedia('(hover: hover) and (min-width: 901px)').matches;

export default function Header({ page, section }) {
  const [open, setOpen] = useState(false);       // mobile menu
  const [hovered, setHovered] = useState(null);  // item whose drop-down is open
  const [blob, setBlob] = useState(null);        // { x, w } in px, or null
  const ulRef = useRef(null);
  const itemRefs = useRef({});
  const closeTimer = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // Glass header over the hero photo; turns solid once you scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Rest the blob on the current page's item when nothing is hovered.
  const placeOn = (to) => {
    const el = itemRefs.current[to];
    setBlob(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
  };
  useLayoutEffect(() => { if (!hovered) placeOn(page); }, [page, hovered]);
  useEffect(() => {
    const onResize = () => placeOn(hovered || page);
    window.addEventListener('resize', onResize);
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [page, hovered]);

  useEffect(() => { setOpen(false); setHovered(null); }, [page, section]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setHovered(null); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const enter = (to) => {
    clearTimeout(closeTimer.current);
    setHovered(to);
    placeOn(to);
  };
  // Small delay so the pointer can travel from the link into the panel.
  const leave = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setHovered(null), 160);
  };

  return (
    <header className={`site-header ${scrolled || open ? 'is-solid' : ''}`}>
      <div className="bar">
        <a href={href('home')} className="brand" aria-label="Chieveley Village Hall home">
          <span className="brand-mark"><img src={logo} alt="" /></span>
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} aria-label="Main">
          <ul ref={ulRef} onMouseLeave={() => canHover() && leave()}>
            <li className={`nav-blobs ${blob ? 'on' : ''} ${hovered ? 'is-hover' : ''}`} aria-hidden="true">
              <span className="blob" style={blob ? { '--x': `${blob.x}px`, '--w': `${blob.w}px` } : undefined} />
            </li>
            {NAV.map((item) => {
              const isOpen = hovered === item.to;
              return (
                <li
                  key={item.label}
                  ref={(el) => { itemRefs.current[item.to] = el; }}
                  className={`nav-item has-menu ${isOpen ? 'menu-open' : ''}`}
                  onMouseEnter={() => canHover() && enter(item.to)}
                  onFocus={() => enter(item.to)}
                  onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) leave(); }}
                >
                  <a className={`nav-link ${item.to === page ? 'active' : ''}`} href={href(item.to)}
                    aria-current={item.to === page ? 'page' : undefined}>
                    {item.label}
                    <svg className="chev" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </a>
                  <div className="submenu">
                    <ul>
                      {item.children.map(([id, label], i) => (
                        <li key={id} style={{ '--i': i }}>
                          <a href={href(`${item.to}/${id}`)} tabIndex={isOpen || open ? 0 : -1}>{label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="nav-ctas">
            <a className="btn btn-outline" href={href(CTA.donate)}>Donate</a>
            <a className="btn btn-solid" href={href(CTA.book)}>Book the hall</a>
          </div>
        </nav>

        <button className="menu-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
