import { useEffect } from 'react';
import { useRoute } from './router.js';
import { REDIRECTS } from './data/content.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import WhatsOn from './pages/WhatsOn.jsx';
import Hire from './pages/Hire.jsx';
import Support from './pages/Support.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Five pages (plus "page not found"), following the October 2026 sitemap review.
const PAGES = {
  home: Home,
  'whats-on': WhatsOn,
  hire: Hire,
  support: Support,
  about: About,
};

export default function App() {
  const { page, section } = useRoute();
  const redirect = REDIRECTS[section ? `${page}/${section}` : page] || (section && REDIRECTS[page]);
  const Page = PAGES[page] || NotFound;

  useEffect(() => {
    if (redirect) window.location.replace(`#/${redirect}`);
  }, [redirect]);

  useEffect(() => {
    if (redirect) return;
    if (section) {
      requestAnimationFrame(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [page, section, redirect]);

  if (redirect) return null;

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
      <Header page={page} section={section} />
      <main id="main" tabIndex={-1}>
        <Page />
      </main>
      <Footer />
    </>
  );
}
