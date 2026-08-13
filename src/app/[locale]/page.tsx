import Hero from '@/components/sections/Hero';
import LogoStrip from '@/components/sections/LogoStrip';
import Features from '@/components/sections/Features';
import Demo from '@/components/sections/Demo';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0f1a]">
      <Hero />
      <LogoStrip />
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
