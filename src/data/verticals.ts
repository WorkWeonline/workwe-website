// 10 dikey tanımı — dikey sayfalar + ana sayfa kartları için ortak veri
export type Vertical = {
  slug: string;
  icon: string;
  titleKey: string; // i18n anahtarı: verticals.{slug}.title
  headlineKey: string;
  subheadlineKey: string;
  stats: string[]; // kısa istatistik rozetleri
  features: string[]; // öne çıkan modüller
};

export const verticals: Vertical[] = [
  {
    slug: 'manufacturing',
    icon: '🏭',
    titleKey: 'verticals.manufacturing.title',
    headlineKey: 'verticals.manufacturing.headline',
    subheadlineKey: 'verticals.manufacturing.subheadline',
    stats: ['MES', 'MRP', 'OEE', 'Kalite'],
    features: ['verticals.manufacturing.f1', 'verticals.manufacturing.f2', 'verticals.manufacturing.f3', 'verticals.manufacturing.f4', 'verticals.manufacturing.f5', 'verticals.manufacturing.f6'],
  },
  {
    slug: 'healthcare',
    icon: '🩺',
    titleKey: 'verticals.healthcare.title',
    headlineKey: 'verticals.healthcare.headline',
    subheadlineKey: 'verticals.healthcare.subheadline',
    stats: ['FHIR', 'PACS', 'LIS', 'Tele-tıp'],
    features: ['verticals.healthcare.f1', 'verticals.healthcare.f2', 'verticals.healthcare.f3', 'verticals.healthcare.f4', 'verticals.healthcare.f5', 'verticals.healthcare.f6'],
  },
  {
    slug: 'construction',
    icon: '🏗️',
    titleKey: 'verticals.construction.title',
    headlineKey: 'verticals.construction.headline',
    subheadlineKey: 'verticals.construction.subheadline',
    stats: ['İhale', 'Hakediş', 'İSG', 'BIM'],
    features: ['verticals.construction.f1', 'verticals.construction.f2', 'verticals.construction.f3', 'verticals.construction.f4', 'verticals.construction.f5', 'verticals.construction.f6'],
  },
  {
    slug: 'education',
    icon: '🎓',
    titleKey: 'verticals.education.title',
    headlineKey: 'verticals.education.headline',
    subheadlineKey: 'verticals.education.subheadline',
    stats: ['LMS', 'SIS', 'MEB', 'Sanal Sınıf'],
    features: ['verticals.education.f1', 'verticals.education.f2', 'verticals.education.f3', 'verticals.education.f4', 'verticals.education.f5', 'verticals.education.f6'],
  },
  {
    slug: 'fintech',
    icon: '💰',
    titleKey: 'verticals.fintech.title',
    headlineKey: 'verticals.fintech.headline',
    subheadlineKey: 'verticals.fintech.subheadline',
    stats: ['Bankacılık', 'Kredi', 'Yatırım', 'POS'],
    features: ['verticals.fintech.f1', 'verticals.fintech.f2', 'verticals.fintech.f3', 'verticals.fintech.f4', 'verticals.fintech.f5', 'verticals.fintech.f6'],
  },
  {
    slug: 'retail',
    icon: '🛒',
    titleKey: 'verticals.retail.title',
    headlineKey: 'verticals.retail.headline',
    subheadlineKey: 'verticals.retail.subheadline',
    stats: ['POS', 'E-ticaret', 'Stok', 'CRM'],
    features: ['verticals.retail.f1', 'verticals.retail.f2', 'verticals.retail.f3', 'verticals.retail.f4', 'verticals.retail.f5', 'verticals.retail.f6'],
  },
  {
    slug: 'logistics',
    icon: '🚛',
    titleKey: 'verticals.logistics.title',
    headlineKey: 'verticals.logistics.headline',
    subheadlineKey: 'verticals.logistics.subheadline',
    stats: ['Filo', 'Rota', 'Soğuk Zincir', 'Depo'],
    features: ['verticals.logistics.f1', 'verticals.logistics.f2', 'verticals.logistics.f3', 'verticals.logistics.f4', 'verticals.logistics.f5', 'verticals.logistics.f6'],
  },
  {
    slug: 'government',
    icon: '🏛️',
    titleKey: 'verticals.government.title',
    headlineKey: 'verticals.government.headline',
    subheadlineKey: 'verticals.government.subheadline',
    stats: ['EBYS', 'EKAP', '5018', 'e-İmza'],
    features: ['verticals.government.f1', 'verticals.government.f2', 'verticals.government.f3', 'verticals.government.f4', 'verticals.government.f5', 'verticals.government.f6'],
  },
  {
    slug: 'restaurant',
    icon: '🍽️',
    titleKey: 'verticals.restaurant.title',
    headlineKey: 'verticals.restaurant.headline',
    subheadlineKey: 'verticals.restaurant.subheadline',
    stats: ['POS', 'Mutfak', 'Rezervasyon', 'Envanter'],
    features: ['verticals.restaurant.f1', 'verticals.restaurant.f2', 'verticals.restaurant.f3', 'verticals.restaurant.f4', 'verticals.restaurant.f5', 'verticals.restaurant.f6'],
  },
  {
    slug: 'realestate',
    icon: '🏘️',
    titleKey: 'verticals.realestate.title',
    headlineKey: 'verticals.realestate.headline',
    subheadlineKey: 'verticals.realestate.subheadline',
    stats: ['Portföy', 'Kira', 'Aidat', 'Tapu'],
    features: ['verticals.realestate.f1', 'verticals.realestate.f2', 'verticals.realestate.f3', 'verticals.realestate.f4', 'verticals.realestate.f5', 'verticals.realestate.f6'],
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}
