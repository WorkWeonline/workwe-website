'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const otherLocale = locale === 'tr' ? 'en' : 'tr';
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/verticals`, label: t('verticals') },
    { href: `/${locale}/pricing`, label: t('pricing') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/demo`, label: t('demo') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-xl font-bold text-white">
          Work<span className="text-blue-400">WE</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition ${pathname?.startsWith(l.href) ? 'text-blue-300' : 'text-gray-300 hover:text-white'}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href={`/${otherLocale}`} className="rounded-md bg-white/10 px-3 py-1.5 text-sm text-gray-200 ring-1 ring-white/10 hover:bg-white/20">
            {otherLocale === 'tr' ? 'TR' : 'EN'}
          </Link>
          <Link href={`/${locale}/demo`} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
            {t('ctaDemo')}
          </Link>
        </div>

        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? '✕' : '☰'}
        </button>
      </nav>
      {open && (
        <div className="border-t border-white/5 bg-[#0a0f1a] px-6 py-4 md:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-gray-300 hover:text-white">
              {l.label}
            </Link>
          ))}
          <Link href={`/${otherLocale}`} onClick={() => setOpen(false)} className="block py-2 text-gray-300">
            {otherLocale === 'tr' ? 'Türkçe' : 'English'}
          </Link>
        </div>
      )}
    </header>
  );
}
