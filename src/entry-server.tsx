import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { LangProvider } from './lib/lang';
import { AppRoutes } from './App';

export { allPages, getSeo, notFoundSeo, canonicalUrl, SITE_URL } from './seo';

/** Renders one route to HTML at build time (used by scripts/prerender.mjs). */
export const render = (url: string) =>
  renderToString(
    <LangProvider>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </LangProvider>,
  );
