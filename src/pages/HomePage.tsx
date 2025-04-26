
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AmbientVideo from '@/components/AmbientVideo';
import ExcellenceSection from '@/components/ExcellenceSection';
import CuisineShowcase from '@/components/CuisineShowcase';
import PopularDishesSection from '@/components/PopularDishesSection';
import SpecialServicesSection from '@/components/SpecialServicesSection';
import TestimonialSection from '@/components/TestimonialSection';
import LatestMemoriesSection from '@/components/LatestMemoriesSection';
import TrendingOffersSection from '@/components/TrendingOffersSection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <AmbientVideo />
        <HeroSection />
        <ExcellenceSection />
        <CuisineShowcase />
        <PopularDishesSection />
        <SpecialServicesSection />
        <TestimonialSection />
        <LatestMemoriesSection />
        <TrendingOffersSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
