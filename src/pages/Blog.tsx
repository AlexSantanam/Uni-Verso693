import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react';
import { useLang } from '../lib/lang';
import { postCopy, posts, type Block, type Post } from '../data/blog';
import { Container, CtaBand, Eyebrow, PageHero } from '../components/ui';
import { CalendlyButton } from '../components/CalendlyButton';
import blogPrism from '../../asset/blog-prism.mp4';

const blogVideo = { src: blogPrism, poster: '/blog-prism-poster.jpg', box: 'left-[79%] w-[min(38rem,36vw)]' };

const formatDate = (iso: string, lang: 'es' | 'en') =>
  new Date(`${iso}T12:00:00`).toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

const PostMeta: React.FC<{ post: Post }> = ({ post }) => {
  const { lang } = useLang();
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-400">
      <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="w-3.5 h-3.5" />
        {post.minutes} min {lang === 'es' ? 'de lectura' : 'read'}
      </span>
    </div>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post: base }) => {
  const { lang } = useLang();
  const post = postCopy(base, lang);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group spotlight reveal flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-7 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10 transition-all"
    >
      <div className="flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-cyan-200">
            {t}
          </span>
        ))}
      </div>
      <h2 className="text-xl font-extrabold text-white leading-snug group-hover:text-cyan-200 transition-colors">{post.title}</h2>
      <p className="text-sm text-slate-400 leading-relaxed">{post.description}</p>
      <div className="mt-auto flex items-center justify-between pt-2">
        <PostMeta post={post} />
        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-white group-hover:text-cyan-300">
          {lang === 'es' ? 'Leer' : 'Read'}
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
};

export const Blog: React.FC = () => (
  <>
    <PageHero
      video={blogVideo}
      eyebrow={{ es: 'Blog', en: 'Blog' }}
      title={{ es: 'Software e IA explicados para tu empresa', en: 'Software and AI explained for your business' }}
      subtitle={{
        es: 'Guías prácticas para decidir qué construir, qué automatizar y cómo usar la inteligencia artificial con criterio.',
        en: 'Practical guides to decide what to build, what to automate and how to use AI with judgment.',
      }}
    />
    <section className="py-20">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </Container>
    </section>
    <CtaBand />
  </>
);

const renderBlock = (lang: 'es' | 'en') => (b: Block, i: number) => {
  switch (b.type) {
    case 'h2':
      return (
        <h2 key={i} className="pt-6 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {b.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={i} className="pt-2 text-xl font-bold text-white">
          {b.text}
        </h3>
      );
    case 'ul':
      return (
        <ul key={i} className="space-y-2.5 pl-1">
          {b.items.map((it) => (
            <li key={it} className="flex gap-3 text-slate-300 leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case 'cta':
      return (
        <aside key={i} className="my-4 rounded-3xl border border-brand-500/30 bg-brand-500/10 p-7 space-y-5">
          <p className="text-lg font-semibold text-white leading-relaxed">{b.text}</p>
          <div className="flex flex-wrap gap-3">
            <CalendlyButton />
            <Link
              to="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-6 py-3.5 text-sm font-bold text-white transition-colors"
            >
              {lang === 'es' ? 'Escríbenos' : 'Contact us'}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </aside>
      );
    default:
      return (
        <p key={i} className="text-lg text-slate-300 leading-relaxed">
          {b.text}
        </p>
      );
  }
};

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const { lang } = useLang();
  const found = posts.find((p) => p.slug === slug);
  if (!found) return <Navigate to="/blog" replace />;
  const post = postCopy(found, lang);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-[#070f19] border-b border-white/10">
          <div className="absolute inset-0 bg-grid" aria-hidden />
          <Container className="relative py-16 sm:py-20">
            <div className="max-w-4xl space-y-6">
            <Link to="/blog" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-cyan-300">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'es' ? 'Todos los artículos' : 'All articles'}
            </Link>
            <Eyebrow>{post.tags[0]}</Eyebrow>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.1]">{post.title}</h1>
            <p className="text-lg text-slate-400 leading-relaxed">{post.description}</p>
            <PostMeta post={post} />
            </div>
          </Container>
        </header>
        <Container className="py-14">
          <div className="max-w-3xl mx-auto space-y-6">{post.body.map(renderBlock(lang))}</div>
        </Container>
      </article>

      <section className="pb-20">
        <Container>
          <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-white">{lang === 'es' ? 'Sigue leyendo' : 'Keep reading'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
};
