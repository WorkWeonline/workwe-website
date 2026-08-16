export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Post = {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  author_name: string;
  published_at: string;
  vertical_category: string;
  views_count: number;
};

async function getPost(slug: string, locale: string): Promise<Post | null> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
  try {
    const res = await fetch(`${apiBase}/landing/blog/${slug}?locale=${locale}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch {
    return null;
  }
}

/** Basit markdown render (başlık/liste/kalın/paragraf) — blog içeriği için yeterli. */
function renderMarkdown(md: string): string {
  const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = escape(md).split('\n');
  let html = '';
  let inList = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3 class="mt-8 text-xl font-bold text-white">${line.slice(4)}</h3>`;
    } else if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2 class="mt-10 text-2xl font-bold text-blue-300">${line.slice(3)}</h2>`;
    } else if (line.startsWith('- ')) {
      if (!inList) { html += '<ul class="mt-4 space-y-2">'; inList = true; }
      html += `<li class="flex gap-2 text-gray-300"><span class="text-emerald-400">•</span>${line.slice(2)}</li>`;
    } else if (line.match(/^\d+\. /)) {
      if (!inList) { html += '<ol class="mt-4 list-decimal space-y-2 pl-5 text-gray-300">'; inList = true; }
      html += `<li>${line.replace(/^\d+\. /, '')}</li>`;
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false; }
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      const bolded = line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>');
      html += `<p class="mt-4 leading-relaxed text-gray-300">${bolded}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  return {
    title: post ? `${post.title} | WorkWE` : 'WorkWE Blog',
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations('blog');
  const post = await getPost(slug, locale);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-6 py-20 text-white">
      <article className="mx-auto max-w-3xl">
        <Link href={`/${locale}/blog`} className="text-sm text-blue-400 hover:text-blue-300">
          ← {t('back')}
        </Link>
        <span className="mt-6 inline-block rounded-full bg-blue-950 px-2 py-0.5 text-xs text-blue-300">
          {post.vertical_category} · {post.views_count} 👁
        </span>
        <h1 className="mt-3 text-4xl font-bold">{post.title}</h1>
        <p className="mt-3 text-sm text-gray-500">
          {post.author_name} · {new Date(post.published_at).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US')}
        </p>
        <div
          className="prose-invert mt-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content || '') }}
        />
        <div className="mt-12 rounded-2xl bg-gradient-to-b from-blue-900/40 to-transparent p-8 text-center ring-1 ring-blue-800/40">
          <h2 className="text-2xl font-bold">{t('ctaTitle')}</h2>
          <p className="mt-2 text-gray-400">{t('ctaSub')}</p>
          <Link href={`/${locale}/demo`} className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-500">
            {t('ctaDemo')}
          </Link>
        </div>
      </article>
    </main>
  );
}
