import { href } from '../router.js';
import { PageHeader } from '../components/Bits.jsx';

export default function NotFound() {
  return (
    <PageHeader photo="hero-404" eyebrow="Page not found" title="We couldn't find" accent="that page"
      intro="It may have moved. Try the menu above, or head back home.">
      <div className="hero-actions"><a className="btn btn-solid-light" href={href('home')}>Back to home</a></div>
    </PageHeader>
  );
}
