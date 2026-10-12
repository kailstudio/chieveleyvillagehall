import { useEffect } from 'react';
import { useRoute } from './router.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';
import RegularEvents from './pages/RegularEvents.jsx';
import Contacts from './pages/Contacts.jsx';
import SeasonalEvents from './pages/SeasonalEvents.jsx';
import DogClubs from './pages/DogClubs.jsx';
import Vision2050 from './pages/Vision2050.jsx';
import NewEvents from './pages/NewEvents.jsx';
import Facilities from './pages/Facilities.jsx';
import Gallery from './pages/Gallery.jsx';
import Fundraising from './pages/Fundraising.jsx';
import Club500 from './pages/Club500.jsx';
import Governance from './pages/Governance.jsx';
import NotFound from './pages/NotFound.jsx';

const PAGES = {
  home: Home,
  booking: Booking,
  'regular-events': RegularEvents,
  contacts: Contacts,
  'seasonal-events': SeasonalEvents,
  'dog-clubs': DogClubs,
  'vision-2050': Vision2050,
  'new-events': NewEvents,
  facilities: Facilities,
  gallery: Gallery,
  fundraising: Fundraising,
  '500-club': Club500,
  governance: Governance,
};

export default function App() {
  const { page, section } = useRoute();
  const Page = PAGES[page] || NotFound;

  useEffect(() => {
    if (section) {
      requestAnimationFrame(() => {
        const el = document.getElementById(section);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [page, section]);

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
