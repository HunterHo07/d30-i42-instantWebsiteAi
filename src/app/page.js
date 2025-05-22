import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProcessSection from '@/components/home/ProcessSection';
import TemplatesSection from '@/components/home/TemplatesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CtaSection from '@/components/home/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <TemplatesSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}
