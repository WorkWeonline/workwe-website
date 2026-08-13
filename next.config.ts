import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withIntl(nextConfig);
