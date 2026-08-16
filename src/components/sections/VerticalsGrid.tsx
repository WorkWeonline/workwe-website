import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { verticals } from '@/data/verticals';

export default async function VerticalsGrid({ locale }: { locale: string }) {
  const t = await getTranslations('verticals');

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{t('common.title')}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-gray-400">{t('common.subtitle')}</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {verticals.map((v) => (
          <Link
            key={v.slug}
            href={`/${locale}/verticals/${v.slug}`}
            className="group rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/10 hover:ring-blue-500/50"
          >
            <div className="text-3xl">{v.icon}</div>
            <h3 className="mt-3 font-bold group-hover:text-blue-300">{t(`${v.slug}.title`)}</h3>
            <p className="mt-1 text-xs text-gray-400">{t(`${v.slug}.headline`)}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {v.stats.map((s) => (
                <span key={s} className="rounded-full bg-blue-950/60 px-2 py-0.5 text-[10px] text-blue-300">
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
