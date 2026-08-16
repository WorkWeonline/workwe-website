export const dynamic = 'force-dynamic';

import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import DemoForm from '@/components/DemoForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'demo' });
  return {
    title: `${t('metaTitle')}`,
    description: t('metaDesc'),
    alternates: { canonical: `/${locale}/demo`, languages: { tr: '/tr/demo', en: '/en/demo' } },
  };
}

export default async function DemoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('demo');

  return (
    <main className="min-h-screen bg-[#0a0f1a] px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold md:text-5xl">{t('heroTitle')}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-400">{t('heroSub')}</p>
      </div>
      <div className="mt-10">
        <DemoForm />
      </div>
    </main>
  );
}
