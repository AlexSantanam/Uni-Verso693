import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

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
