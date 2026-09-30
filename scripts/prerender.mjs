// Build step: writes a real HTML file per route (content + its own <head>),
// a 404.html and sitemap.xml, so crawlers that don't run JavaScript
// (Bing, AI search, link previews) see each page as it is.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
const ssrEntry = path.resolve('dist-ssr/entry-server.js');
const { render, allPages, notFoundSeo, canonicalUrl, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Swap the home-page defaults in index.html for this page's values. */
const withHead = (html, seo) => {
  const href = canonicalUrl(seo.path);
  const title = esc(seo.title);
  const desc = esc(seo.description);
  const set = (re, value) => {
    if (!re.test(html)) throw new Error(`prerender: tag not found in index.html: ${re}`);
    html = html.replace(re, value);
  };
  set(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  set(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`);
  set(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${href}" />`);
  set(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${href}" />`);
  set(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`);
  set(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`);
  set(/<meta name="twitter:url" content="[^"]*" \/>/, `<meta name="twitter:url" content="${href}" />`);
  set(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`);
  set(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${desc}" />`);

  const robots = seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const ld = seo.jsonLd.length
    ? `\n    <script type="application/ld+json" id="ld-json">${JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd).replace(/</g, '\\u003c')}</script>`
    : '';
  return html.replace('</head>', `    <meta name="robots" content="${robots}" />${ld}\n  </head>`);
};

const writePage = (file, seo, url) => {
  const body = render(url);
  const html = withHead(template, seo).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

for (const seo of allPages) {
  const file = seo.path === '/' ? path.join(dist, 'index.html') : path.join(dist, seo.path, 'index.html');
  writePage(file, seo, seo.path);
}
writePage(path.join(dist, '404.html'), notFoundSeo, '/404');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${canonicalUrl(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${(p.priority ?? 0.5).toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });

console.log(`prerendered ${allPages.length} pages + 404.html, sitemap.xml for ${SITE_URL}`);
