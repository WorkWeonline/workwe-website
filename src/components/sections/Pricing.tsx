'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
}

const plansByLocale: Record<string, Plan[]> = {
  tr: [
    {
      name: 'Ücretsiz',
      price: '₺0',
      period: '/ay',
      description: 'Küçük ekipler ve başlangıç için',
      features: ['1 kullanıcı', 'Temel CRM', '1 depo', 'Topluluk desteği'],
      highlight: false
    },
    {
      name: 'Pro',
      price: '₺999',
      period: '/ay',
      description: 'Büyüyen işletmeler için',
      features: ['10 kullanıcı', 'Tüm modüller', 'Çoklu depo', 'AI Asistan', 'Öncelikli destek'],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Özel',
      period: '',
      description: 'Büyük ölçekli kurumlar için',
      features: ['Sınırsız kullanıcı', 'Özel entegrasyon', 'Özel sunucu', '7/24 destek', 'SLA garantisi'],
      highlight: false
    }
  ],
  en: [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      description: 'For small teams and getting started',
      features: ['1 user', 'Basic CRM', '1 warehouse', 'Community support'],
      highlight: false
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/mo',
      description: 'For growing businesses',
      features: ['10 users', 'All modules', 'Multi-warehouse', 'AI Assistant', 'Priority support'],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale organizations',
      features: ['Unlimited users', 'Custom integrations', 'Dedicated hosting', '24/7 support', 'SLA guarantee'],
      highlight: false
    }
  ]
};

export default function Pricing() {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const plans = plansByLocale[locale];

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
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
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur-xl ${
                plan.highlight
                  ? 'border-cyan-500/40 bg-white/10 shadow-2xl shadow-cyan-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-1 text-xs font-bold uppercase tracking-wide">
                  {t('popular')}
                </span>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-400">{plan.period}</span>}
              </div>
              <p className="mt-2 text-sm text-gray-400">{plan.description}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-8 rounded-xl py-4 text-center text-lg font-semibold transition-all ${
                  plan.highlight
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:from-purple-400 hover:to-cyan-400'
                    : 'border border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {plan.name === 'Enterprise' || plan.name === 'Enterprise'
                  ? t('contactUs')
                  : t('getStarted')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
