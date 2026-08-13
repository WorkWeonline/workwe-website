'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function CTA() {
  const t = useTranslations('cta');
  const common = useTranslations('common');
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard?.writeText(common('installCommand'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cta" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center"
      >
        <h2 className="text-3xl font-bold sm:text-5xl">
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {t('title')}
          </span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">{t('subtitle')}</p>

        <div className="mt-8">
          <p className="mb-3 text-sm text-gray-500">{t('installLabel')}</p>
          <div className="mx-auto flex max-w-xl items-center rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            <code className="flex-1 overflow-x-auto px-4 py-2 text-left font-mono text-sm text-cyan-300">
              {common('installCommand')}
            </code>
            <button
              onClick={copyCommand}
              className="shrink-0 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-purple-400 hover:to-cyan-400"
            >
              {copied ? common('copied') : common('copy')}
            </button>
          </div>
        </div>

        <a
          href="#"
          className="mt-10 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:from-purple-400 hover:to-cyan-400"
        >
          {common('ctaPrimary')}
        </a>
      </motion.div>
    </section>
  );
}
