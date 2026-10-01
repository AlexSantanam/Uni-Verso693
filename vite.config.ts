import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * Dev only: serve api/*.ts like Vercel does (minimal req/res adapter), so /interno,
 * the audits and the forms work on localhost. Production uses Vercel's own runtime.
 */
const devApi = (): Plugin => ({
  name: 'dev-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use('/api', async (req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost');
      const name = url.pathname.replace(/^\/+|\/+$/g, '');
      if (!/^[a-z-]+$/.test(name)) return next();
      try {
        const mod = await server.ssrLoadModule(`/api/${name}.ts`);
        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c as Buffer);
        const raw = Buffer.concat(chunks).toString('utf8');
        const vreq = Object.assign(req, {
          query: Object.fromEntries(url.searchParams),
          body: raw && String(req.headers['content-type']).includes('json') ? JSON.parse(raw) : raw || undefined,
        });
        const vres = Object.assign(res, {
          status(code: number) {
            res.statusCode = code;
            return vres;
          },
          json(data: unknown) {
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(data));
            return vres;
          },
          send(data: unknown) {
            res.end(typeof data === 'string' || Buffer.isBuffer(data) ? data : JSON.stringify(data));
            return vres;
          },
        });
        await mod.default(vreq, vres);
      } catch (err) {
        console.error(`[dev-api] ${name}`, err);
        if (!res.headersSent) res.statusCode = 500;
        res.end(JSON.stringify({ error: 'dev-api error' }));
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  // api/*.ts read process.env (Vercel injects it in production); in dev load .env into it.
  for (const [k, v] of Object.entries(loadEnv(mode, process.cwd(), ''))) process.env[k] ??= v;
  return {
    plugins: [react(), tailwindcss(), devApi()],
    // The prerender (vite build --ssr) must inline this JSON; Node can't import it bare.
    ssr: { noExternal: ['world-atlas'] },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
