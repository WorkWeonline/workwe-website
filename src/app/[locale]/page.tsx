import Hero from '@/components/sections/Hero';
import LogoStrip from '@/components/sections/LogoStrip';
import VerticalsGrid from '@/components/sections/VerticalsGrid';
import Features from '@/components/sections/Features';
import Demo from '@/components/sections/Demo';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export const dynamic = 'force-dynamic';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <Hero />
      <LogoStrip />
      <VerticalsGrid locale={locale} />
      <Features />
      <Demo />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
