import { useEffect, useState } from 'react';

// Tiny hash router: "#/fundraising/fireworks" -> { page: 'fundraising', section: 'fireworks' }
// Hash URLs work from a plain folder, a USB stick or any web host with no server setup.
function parse() {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { page: parts[0] || 'home', section: parts[1] || '' };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const href = (to) => `#/${to}`;
