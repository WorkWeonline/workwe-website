'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonialsByLocale: Record<string, Testimonial[]> = {
  tr: [
    {
      quote: 'WorkWE sayesinde satış süreçlerimiz %40 hızlandı. AI Asistan raporları saatlerimizi dakikaya indirdi.',
      author: 'Ahmet Yılmaz',
      role: 'CEO, TeknoSoft'
    },
    {
      quote: 'E-fatura ve banka entegrasyonu hayat kurtarıcı. Muhasebe süreçlerimiz tamamen otomatikleşti.',
      author: 'Elif Demir',
      role: 'Finans Müdürü, Medikal Grup'
    },
    {
      quote: 'Üretim modülü ile MRP hesaplamalarımız artık hatasız. Stok maliyetlerimiz %25 düştü.',
      author: 'Mehmet Kaya',
      role: 'Operasyon Direktörü, AutoParts Ltd.'
    }
  ],
  en: [
    {
      quote: 'WorkWE accelerated our sales processes by 40%. The AI Assistant turned hours of reports into minutes.',
      author: 'Ahmet Yilmaz',
      role: 'CEO, TeknoSoft'
    },
    {
      quote: 'E-invoice and bank integration are lifesavers. Our accounting processes are fully automated.',
      author: 'Elif Demir',
      role: 'Finance Manager, Medikal Group'
    },
    {
      quote: 'The manufacturing module made our MRP calculations flawless. Inventory costs dropped 25%.',
      author: 'Mehmet Kaya',
      role: 'Operations Director, AutoParts Ltd.'
    }
  ]
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const locale = useLocale();
  const items = testimonialsByLocale[locale] ?? testimonialsByLocale.tr;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-gray-400">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-white/10"
            >
              <div className="mb-4 text-cyan-400">★★★★★</div>
              <p className="mb-6 text-gray-300">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 font-semibold">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{item.author}</div>
                  <div className="text-sm text-gray-400">{item.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
