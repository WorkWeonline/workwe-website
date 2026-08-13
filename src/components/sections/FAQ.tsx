'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

const faqByLocale: Record<string, FAQItem[]> = {
  tr: [
    {
      q: 'WorkWE nasıl kurulur?',
      a: 'Docker üzerinden tek komutla 5 dakikada kurulum yapılır. Kurulum rehberi dokümantasyon sayfamızda mevcuttur.'
    },
    {
      q: 'Verilerim güvende mi?',
      a: 'Evet. Tüm veriler AES-256-GCM şifreleme ile korunur, düzenli yedekleme yapılır.'
    },
    {
      q: 'Mevcut sistemimden veri taşıyabilir miyim?',
      a: 'Evet, CSV/Excel import ve API entegrasyonları ile mevcut verilerinizi kolayca taşıyabilirsiniz.'
    },
    {
      q: 'Gerektiğinde plan değiştirebilir miyim?',
      a: 'Elbette. İstediğiniz zaman yükseltebilir veya düşürebilirsiniz.'
    }
  ],
  en: [
    {
      q: 'How do I install WorkWE?',
      a: 'Install in 5 minutes with a single Docker command. A step-by-step guide is available in our documentation.'
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. All data is protected with AES-256-GCM encryption and backed up regularly.'
    },
    {
      q: 'Can I migrate from my existing system?',
      a: 'Yes, you can easily migrate your data with CSV/Excel import and API integrations.'
    },
    {
      q: 'Can I change my plan later?',
      a: 'Of course. You can upgrade or downgrade at any time.'
    }
  ]
};

export default function FAQ() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const items = faqByLocale[locale] ?? faqByLocale.tr;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-400">{t('subtitle')}</p>
        </motion.div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:border-white/30"
            >
              <button
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{item.q}</span>
                <span className={`ml-4 text-cyan-400 transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400">{item.a}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
