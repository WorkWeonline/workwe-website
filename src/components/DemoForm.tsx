'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { verticals } from '@/data/verticals';

export default function DemoForm() {
  const t = useTranslations('demo');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    vertical: 'manufacturing',
    demo_type: 'live_demo',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot koruması
    setStatus('sending');
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
      const res = await fetch(`${apiBase}/landing/demo-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, honeypot }),
      });
      if (res.ok || res.status === 429) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('success'); // offline demo modu — kabul et
    }
  };

  const input =
    'w-full rounded-lg bg-white/5 px-4 py-3 text-white ring-1 ring-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-blue-500';

  return (
    <div className="mx-auto max-w-xl">
      {status === 'success' ? (
        <div className="rounded-2xl bg-emerald-500/10 p-10 text-center ring-1 ring-emerald-500/40">
          <div className="text-5xl">🎉</div>
          <h3 className="mt-4 text-2xl font-bold text-emerald-300">{t('successTitle')}</h3>
          <p className="mt-2 text-gray-300">{t('successSub')}</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
          {/* Honeypot (görünmez) */}
          <input type="text" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('name')} *</label>
            <input required className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('email')} *</label>
            <input required type="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('company')} *</label>
            <input required className={input} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('vertical')}</label>
            <select className={input} value={form.vertical} onChange={(e) => setForm({ ...form, vertical: e.target.value })}>
              {verticals.map((v) => (
                <option key={v.slug} value={v.slug} className="bg-gray-900">
                  {v.icon} {v.slug}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('demoType')}</label>
            <select className={input} value={form.demo_type} onChange={(e) => setForm({ ...form, demo_type: e.target.value })}>
              <option value="live_demo" className="bg-gray-900">{t('live')}</option>
              <option value="recorded_video" className="bg-gray-900">{t('recorded')}</option>
              <option value="self_service_trial" className="bg-gray-900">{t('trial')}</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-300">{t('message')}</label>
            <textarea rows={3} className={input} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <button
            disabled={status === 'sending'}
            className="w-full rounded-lg bg-blue-600 py-3 font-bold hover:bg-blue-500 disabled:opacity-50"
          >
            {status === 'sending' ? '...' : t('submit')}
          </button>
          {status === 'error' && <p className="text-sm text-rose-400">{t('error')}</p>}
        </form>
      )}
    </div>
  );
}
