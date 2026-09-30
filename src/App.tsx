import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { LangProvider } from './lib/lang';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Cases, CaseDetail } from './pages/Cases';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog, BlogPost } from './pages/Blog';
import { Audit } from './pages/Audit';
import { Container } from './components/ui';

const NotFound: React.FC = () => (
  <Container className="py-32 text-center space-y-4">
    <h1 className="text-6xl font-black text-white">404</h1>
    <Link to="/" className="font-bold text-cyan-300 hover:text-cyan-200">
      ← Uni-Verso693
    </Link>
  </Container>
);

/** Route table shared by the browser app and the build-time prerender (src/entry-server.tsx). */
export const AppRoutes: React.FC = () => (
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<Services />} />
            <Route path="servicios/:slug" element={<ServiceDetail />} />
            <Route path="casos" element={<Cases />} />
            <Route path="casos/:slug" element={<CaseDetail />} />
            <Route path="nosotros" element={<About />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="audit-693" element={<Audit />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
);

export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LangProvider>
  );
}
