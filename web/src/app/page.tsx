"use client";

import React from 'react';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import VSLBlock from '@/components/sections/VSLBlock';
import NarrativeIntro from '@/components/sections/NarrativeIntro';
import YouTubeQuotes from '@/components/sections/YouTubeQuotes';
import ThreeSystems from '@/components/sections/ThreeSystems';
import WhyNothingWorked from '@/components/sections/WhyNothingWorked';
import NotForYouFilter from '@/components/sections/NotForYouFilter';
import ProductIntro from '@/components/sections/ProductIntro';
import ValueStack from '@/components/sections/ValueStack';
import BonusSection from '@/components/sections/BonusSection';
import FastActionBonus from '@/components/sections/FastActionBonus';
import ComparisonTable from '@/components/sections/ComparisonTable';
import PriceReveal from '@/components/sections/PriceReveal';
import Guarantee72h from '@/components/sections/Guarantee72h';
import FAQ from '@/components/sections/FAQ';
import AboutFounder from '@/components/sections/AboutFounder';
import FinalCTA from '@/components/sections/FinalCTA';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/sections/Footer';
import { StickyCTABar } from '@/components/ui/StickyCTABar';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-bone)] text-[var(--color-ink)] selection:bg-[var(--color-clinical)] selection:text-[var(--color-bone)] antialiased pb-20 md:pb-0 overflow-x-hidden">
      <Header />
      <Hero />
      <VSLBlock />
      
      {/* Fase B - Narrative */}
      <NarrativeIntro />
      
      {/* Fase C - Mechanism */}
      <YouTubeQuotes />
      <ThreeSystems />
      <WhyNothingWorked />
      
      {/* Fase D - Offer */}
      <NotForYouFilter />
      <ProductIntro />
      <ValueStack />
      <BonusSection />
      <FastActionBonus />
      
      {/* Fase E - Conversion */}
      <ComparisonTable />
      <PriceReveal />
      <Guarantee72h />
      
      {/* Fase F - Close */}
      <FAQ />
      <AboutFounder />
      <FinalCTA />
      <Testimonials />
      <Footer />

      <StickyCTABar />
    </div>
  );
}
