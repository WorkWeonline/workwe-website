import type { MetadataRoute } from 'next';
import { verticals } from '@/data/verticals';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://workwe.com.tr';
  const locales = ['tr', 'en'];
  const entries: MetadataRoute.Sitemap = [];

  // Ana sayfalar
  for (const locale of locales) {
    entries.push(
      { url: `${base}/${locale}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
      { url: `${base}/${locale}/pricing`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
      { url: `${base}/${locale}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
      { url: `${base}/${locale}/demo`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    );
  }

  // Dikey sayfaları
  for (const locale of locales) {
    for (const v of verticals) {
      entries.push({
        url: `${base}/${locale}/verticals/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
