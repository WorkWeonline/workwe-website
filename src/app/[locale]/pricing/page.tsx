export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import PricingCalculator from '@/components/PricingCalculator';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return {
    title: `${t('metaTitle')}`,
    description: t('metaDesc'),
    alternates: { canonical: `/${locale}/pricing`, languages: { tr: '/tr/pricing', en: '/en/pricing' } },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('pricing');
  const tiers = ['starter', 'professional', 'enterprise'];

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-bold md:text-5xl">{t('heroTitle')}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-gray-400">{t('heroSub')}</p>

        {/* Tier kartları */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={tier}
              className={`relative rounded-2xl p-6 ring-1 ${
                i === 1 ? 'bg-gradient-to-b from-blue-900/50 to-transparent ring-blue-500' : 'bg-white/5 ring-white/10'
              }`}
            >
              {i === 1 && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold">
                  {t('popular')}
                </span>
              )}
              <h3 className="text-xl font-bold">{t(`tiers.${tier}.name`)}</h3>
              <p className="mt-2 text-3xl font-bold text-blue-300">{t(`tiers.${tier}.price`)}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {(t.raw(`tiers.${tier}.features`) as string[]).map((f, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 font-semibold hover:bg-blue-500">{t('select')}</button>
            </div>
          ))}
        </div>

        {/* Interaktif hesaplayıcı */}
        <section className="mt-20">
          <h2 className="text-center text-3xl font-bold">{t('calcTitle')}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-gray-400">{t('calcSub')}</p>
          <PricingCalculator locale={locale} />
        </section>

        {/* İndirimler */}
        <section className="mt-16 grid gap-4 md:grid-cols-4">
          {(['annual', 'startup', 'nonprofit', 'education'] as const).map((d) => (
            <div key={d} className="rounded-xl bg-white/5 p-4 text-center ring-1 ring-white/10">
              <p className="text-2xl font-bold text-emerald-400">{t(`discounts.${d}.pct`)}</p>
              <p className="mt-1 text-sm text-gray-300">{t(`discounts.${d}.label`)}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
