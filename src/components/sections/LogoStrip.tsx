'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const logos = [
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Redis', icon: '🟥' },
  { name: 'n8n', icon: '⚡' }
];

export default function LogoStrip() {
  const t = useTranslations('logostrip');

  return (
    <section className="border-y border-white/5 bg-white/[0.02] py-12">
      <div className="mx-auto max-w-6xl px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-sm uppercase tracking-widest text-gray-500"
        >
          {t('title')}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
            >
              <span className="text-xl">{logo.icon}</span>
              <span className="text-lg font-medium">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
