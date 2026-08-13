'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const icons = ['🤝', '💰', '📦', '📊', '🏭', '🤖'];

export default function Features() {
  const t = useTranslations('features');
  const items = t.raw('items') as { title: string; description: string }[];

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl">
                {icons[index % icons.length]}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
