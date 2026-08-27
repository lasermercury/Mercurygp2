'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/language-store';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import TrustBar from './TrustBar';
import FeaturesSection from './FeaturesSection';
import TechnologySection from './TechnologySection';
import HowToUseSection from './HowToUseSection';
import TreatmentJourneySection from './TreatmentJourneySection';
import SpecsSection from './SpecsSection';
import SuitabilitySection from './SuitabilitySection';
import SkinToneGuideSection from './SkinToneGuideSection';
import BeforeAfterGallerySection from './BeforeAfterGallerySection';
import BodyMapSection from './BodyMapSection';
import TestimonialsSection from './TestimonialsSection';
import BlogSection from './BlogSection';
import FAQSection from './FAQSection';
import ClaimsRegistrySection from './ClaimsRegistrySection';
import CTASection from './CTASection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

export default function MercuryPage() {
  const { dir, locale } = useLanguageStore();

  // Set document dir and lang attributes for RTL support
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', locale);
  }, [dir, locale]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main id="main" className="flex-1">
        <HeroSection />
        <TrustBar />
        <FeaturesSection />
        <TechnologySection />
        <HowToUseSection />
        <TreatmentJourneySection />
        <SpecsSection />
        <SuitabilitySection />
        <SkinToneGuideSection />
        <BeforeAfterGallerySection />
        <BodyMapSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
        <ClaimsRegistrySection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
