export const dynamic = 'force-dynamic';

// Dikey detay sayfası — dinamik [slug] route
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getVertical, verticals } from '@/data/verticals';
import PricingCalculator from '@/components/PricingCalculator';
import type { Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) return {};
  const t = await getTranslations({ locale, namespace: 'verticals' });
  return {
    title: `${t(`${slug}.title`)}`,
    description: t(`${slug}.subheadline`),
    alternates: {
      canonical: `/${locale}/verticals/${slug}`,
      languages: { tr: `/tr/verticals/${slug}`, en: `/en/verticals/${slug}` },
    },
    openGraph: {
      title: `${t(`${slug}.title`)}`,
      description: t(`${slug}.subheadline`),
      type: 'website',
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
    },
  };
}

export default async function VerticalPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const vertical = getVertical(slug);
  if (!vertical) notFound();
  const t = await getTranslations('verticals');
  const c = await getTranslations('common');

  return (
    <main className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <div className="text-6xl">{vertical.icon}</div>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{t(`${slug}.title`)}</h1>
          <p className="mt-3 text-2xl font-semibold text-blue-300">{t(`${slug}.headline`)}</p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">{t(`${slug}.subheadline`)}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {vertical.stats.map((s) => (
              <span key={s} className="rounded-full bg-blue-950/60 px-3 py-1 text-sm text-blue-200 ring-1 ring-blue-800">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/demo`} className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
              {c('ctaDemo')}
            </Link>
            <Link href={`/${locale}/pricing`} className="rounded-lg bg-white/10 px-6 py-3 font-semibold ring-1 ring-white/20 hover:bg-white/20">
              {c('ctaPricing')}
            </Link>
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">{t('common.features')}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vertical.features.map((fKey) => (
            <div key={fKey} className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/10">
              <div className="text-2xl">✅</div>
              <p className="mt-3 font-medium text-gray-100">{t(fKey.replace('verticals.', ''))}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fiyat hesaplayıcı */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">{t('common.calculator')}</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-400">{t('common.calculatorSub')}</p>
        <PricingCalculator locale={locale} />
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">{t('common.ctaTitle')}</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-400">{t('common.ctaSub')}</p>
        <Link href={`/${locale}/demo`} className="mt-6 inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold hover:bg-blue-500">
          {c('ctaDemo')}
        </Link>
      </section>
    </main>
  );
}
