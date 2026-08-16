'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';

type Props = {
  locale: string;
};

export default function PricingCalculator({ locale }: Props) {
  const t = useTranslations('pricing');
  const [companySize, setCompanySize] = useState('smb');
  const [selectedVerticals, setSelectedVerticals] = useState<string[]>(['manufacturing']);
  const [modules, setModules] = useState<string[]>(['crm', 'finance']);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const moduleOptions = ['crm', 'finance', 'stock', 'hr', 'purchase', 'project', 'ai', 'bi', 'mobile', 'integration'];

  const toggle = (arr: string[], set: (v: string[]) => void, item: string) => {
    if (arr.includes(item)) {
      set(arr.filter((x) => x !== item));
    } else {
      set([...arr, item]);
    }
  };

  const calculate = async () => {
    setLoading(true);
    setError('');
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
      const res = await fetch(`${apiBase}/landing/pricing/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_size: companySize,
          selected_verticals: selectedVerticals,
          selected_modules: modules,
          billing,
        }),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error.message || 'Error');
      } else {
        setResult(json.data);
      }
    } catch {
      // offline fallback: basit istemci hesabı
      const base = { startup: 5000, smb: 15000, enterprise: 50000 }[companySize] ?? 15000;
      const vCost = selectedVerticals.length * 30000;
      const mCost = modules.length * 3500;
      let monthly = base + vCost + mCost;
      if (billing === 'annual') monthly *= 0.9;
      setResult({
        estimated_monthly_cost_try: Math.round(monthly),
        estimated_annual_cost_try: Math.round(monthly * 12),
        discount_applied: billing === 'annual' ? 'annual_10' : null,
      });
    } finally {
      setLoading(false);
    }
  };

  const fmt = (v: unknown) =>
    new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0,
    }).format(Number(v || 0));

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* Sol: form */}
      <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
        <label className="block text-sm font-medium text-gray-300">{t('companySize')}</label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(['startup', 'smb', 'enterprise'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setCompanySize(s)}
              className={`rounded-lg px-3 py-2 text-sm font-medium ring-1 transition ${
                companySize === s ? 'bg-blue-600 text-white ring-blue-500' : 'bg-white/5 text-gray-300 ring-white/10 hover:bg-white/10'
              }`}
            >
              {t(`size.${s}`)}
            </button>
          ))}
        </div>

        <label className="mt-6 block text-sm font-medium text-gray-300">{t('verticals')}</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {verticals.slice(0, 6).map((v) => (
            <button
              key={v.slug}
              onClick={() => toggle(selectedVerticals, setSelectedVerticals, v.slug)}
              className={`rounded-lg px-3 py-2 text-left text-sm ring-1 transition ${
                selectedVerticals.includes(v.slug)
                  ? 'bg-blue-600/20 text-blue-200 ring-blue-500'
                  : 'bg-white/5 text-gray-300 ring-white/10 hover:bg-white/10'
              }`}
            >
              {v.icon} {v.slug}
            </button>
          ))}
        </div>

        <label className="mt-6 block text-sm font-medium text-gray-300">{t('modules')}</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {moduleOptions.map((m) => (
            <button
              key={m}
              onClick={() => toggle(modules, setModules, m)}
              className={`rounded-full px-3 py-1 text-xs ring-1 transition ${
                modules.includes(m) ? 'bg-emerald-600/20 text-emerald-200 ring-emerald-500' : 'bg-white/5 text-gray-400 ring-white/10 hover:bg-white/10'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <label className="mt-6 block text-sm font-medium text-gray-300">{t('billing')}</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-lg px-3 py-2 text-sm ring-1 ${billing === 'monthly' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 ring-white/10'}`}
          >
            {t('monthly')}
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`rounded-lg px-3 py-2 text-sm ring-1 ${billing === 'annual' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-300 ring-white/10'}`}
          >
            {t('annual')} -10%
          </button>
        </div>

        <button
          onClick={calculate}
          disabled={loading}
          className="mt-8 w-full rounded-lg bg-emerald-600 py-3 font-semibold hover:bg-emerald-500 disabled:opacity-50"
        >
          {loading ? '...' : t('calculate')}
        </button>
        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
      </div>

      {/* Sağ: sonuç */}
      <div className="rounded-2xl bg-gradient-to-b from-blue-900/40 to-transparent p-6 ring-1 ring-blue-800/40">
        <h3 className="text-lg font-semibold text-blue-200">{t('estimate')}</h3>
        {result ? (
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm text-gray-400">{t('monthlyCost')}</p>
              <p className="text-4xl font-bold text-white">{fmt(result.estimated_monthly_cost_try)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">{t('annualCost')}</p>
              <p className="text-2xl font-semibold text-emerald-300">{fmt(result.estimated_annual_cost_try)}</p>
            </div>
            {result.discount_applied ? (
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                {t('discount')}: {String(result.discount_applied)}
              </span>
            ) : null}
            <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold hover:bg-blue-500">{t('getQuote')}</button>
          </div>
        ) : (
          <p className="mt-6 text-gray-400">{t('noResult')}</p>
        )}
      </div>
    </div>
  );
}
