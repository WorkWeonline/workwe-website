export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: `${t('metaTitle')}`,
    description: t('metaDesc'),
    alternates: { canonical: `/${locale}/blog`, languages: { tr: '/tr/blog', en: '/en/blog' } },
  };
}

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author_name: string;
  published_at: string;
  vertical_category: string;
};

async function getPosts(locale: string): Promise<Post[]> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  try {
    const res = await fetch(`${apiBase}/landing/blog?locale=${locale}`, { next: { revalidate: 300 } });
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('blog');
  const posts = await getPosts(locale);

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold md:text-5xl">{t('heroTitle')}</h1>
        <p className="mt-3 text-lg text-gray-400">{t('heroSub')}</p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-blue-950 px-2 py-0.5 text-xs text-blue-300">{post.vertical_category}</span>
                <span className="text-xs text-gray-500">{new Date(post.published_at).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}</span>
              </div>
              <h2 className="mt-4 text-lg font-bold group-hover:text-blue-300">{post.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm text-gray-400">{post.excerpt}</p>
              <p className="mt-4 text-xs text-gray-500">{post.author_name}</p>
            </Link>
          ))}
        </div>

        {posts.length === 0 && <p className="mt-12 text-center text-gray-500">{t('empty')}</p>}
      </div>
    </main>
  );
}
