'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Demo() {
  const t = useTranslations('demo');
  const points = t.raw('points') as string[];

  return (
    <section id="demo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md">
              {t('badge')}
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-5xl">{t('title')}</h2>
            <p className="mt-4 text-lg text-gray-400">{t('subtitle')}</p>

            <ul className="mt-8 space-y-4">
              {points.map((point, index) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                    ✓
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>

            <a
              href="#cta"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-cyan-400"
            >
              {t('cta')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
                  ▶
                </div>
                <p className="text-gray-400">{t('cta')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
