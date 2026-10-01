import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {inject} from '@vercel/analytics';
import App from './App.tsx';
import './index.css';

// Vercel Web Analytics: cookieless page views (no consent banner needed). It only records once
// Analytics is enabled for the project in the Vercel dashboard; until then this is a no-op.
inject({
  mode: import.meta.env.PROD ? 'production' : 'development',
  beforeSend: (event) => {
    const url = new URL(event.url);
    // the internal workspace is not traffic
    if (url.pathname.startsWith('/interno')) return null;
    // Audit PRO order links carry a secret key (?pedido=…&k=…): never send query strings
    url.search = '';
    return {...event, url: url.toString()};
  },
});

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production pages arrive prerendered (scripts/prerender.mjs): hydrate them.
// In dev the root is empty, so render from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
