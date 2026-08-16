import type { Metadata } from 'next';
import type { MetadataRoute } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://workwe.com.tr'),
  title: {
    default: 'WorkWE — Türkiye\'nin İlk Tam Entegre Dikey ERP Platformu',
    template: '%s',
  },
  alternates: {
    languages: {
      'tr-TR': '/tr',
      'en-US': '/en',
    },
  },
  description:
    'Üretimden sağlığa, inşaattan lojistiğe — 10 dikey, tek platform. Yapay zeka destekli, bulut veya on-premise.',
  keywords: ['ERP', 'dikey ERP', 'WorkWE', 'MES', 'FHIR', 'KİK', 'işletme yazılımı'],
  authors: [{ name: 'WorkWE' }],
  openGraph: {
    title: 'WorkWE — Dikey ERP Platformu',
    description: '10 dikey, tek platform. Yapay zeka destekli, bulut veya on-premise.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'WorkWE',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
