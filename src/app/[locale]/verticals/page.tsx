import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { verticals } from '@/data/verticals';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'verticals' });
  return {
    title: `${t('common.title')}`,
    description: t('common.subtitle'),
    alternates: { canonical: `/${locale}/verticals`, languages: { tr: '/tr/verticals', en: '/en/verticals' } },
  };
}

export default async function VerticalsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('verticals');

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-bold md:text-5xl">{t('common.title')}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-gray-400">{t('common.subtitle')}</p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {verticals.map((v) => (
            <Link
              key={v.slug}
              href={`/${locale}/verticals/${v.slug}`}
              className="group rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10 hover:ring-blue-500/50"
            >
              <div className="text-4xl">{v.icon}</div>
              <h2 className="mt-4 text-xl font-bold group-hover:text-blue-300">{t(`${v.slug}.title`)}</h2>
              <p className="mt-1 text-sm text-gray-400">{t(`${v.slug}.headline`)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {v.stats.map((s) => (
                  <span key={s} className="rounded-full bg-blue-950/60 px-2 py-0.5 text-xs text-blue-300">
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                {t('common.features')} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
