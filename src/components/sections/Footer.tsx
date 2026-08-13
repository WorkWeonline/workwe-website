'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const otherLocale = locale === 'tr' ? 'en' : 'tr';

  return (
    <footer className="border-t border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 font-bold text-white">
                W
              </span>
              <span className="text-xl font-bold">{t('tagline')}</span>
            </div>
            <p className="mt-4 max-w-sm text-gray-400">{t('tagline')}</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t('product')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('pricing')}</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">{t('demo')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('faq')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">{t('company')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('contact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('blog')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">{t('copyright')}</p>
          <Link
            href={`/${otherLocale}`}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-white/30 hover:text-white"
          >
            {t('language')}: {otherLocale.toUpperCase()}
          </Link>
        </div>
      </div>
    </footer>
  );
}
