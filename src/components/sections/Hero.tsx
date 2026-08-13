'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');
  const stats = t.raw('stats') as { value: string; label: string }[];

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-24">
      {/* Aurora gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute left-[20%] top-[30%] h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute right-[15%] top-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-md"
        >
          {t('badge')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl"
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-cyan-400"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 blur-lg transition-opacity group-hover:opacity-60" />
            <span className="relative">{t('ctaPrimary')}</span>
          </a>
          <a
            href="#demo"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/10"
          >
            {t('ctaSecondary')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-3xl font-bold text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
