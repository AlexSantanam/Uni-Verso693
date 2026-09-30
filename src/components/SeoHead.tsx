import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { canonicalUrl, getSeo } from '../seo';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/**
 * Keeps <head> in sync on client-side navigation. The same values are written
 * into each page's static HTML at build time by scripts/prerender.mjs.
 */
export const SeoHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeo(pathname);
    const href = canonicalUrl(seo.path);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', href);
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:url', href);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = href;

    let ld = document.getElementById('ld-json');
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'ld-json';
      ld.setAttribute('type', 'application/ld+json');
      document.head.appendChild(ld);
    }
    ld.textContent = seo.jsonLd.length ? JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd) : '';
  }, [pathname]);

  return null;
};
