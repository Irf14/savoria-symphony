
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import CuisineShowcase from '@/components/CuisineShowcase';
import GalleryPreview from '@/components/GalleryPreview';
import TestimonialSection from '@/components/TestimonialSection';
import SpecialServicesSection from '@/components/SpecialServicesSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PopularDishesSection from '@/components/PopularDishesSection';
import TrendingOffersSection from '@/components/TrendingOffersSection';
import LatestMemoriesSection from '@/components/LatestMemoriesSection';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-savoria-black">
      <Navbar />
      <HeroSection />
      <PopularDishesSection />
      <CuisineShowcase />
      <SpecialServicesSection />
      <TrendingOffersSection />
      <LatestMemoriesSection />
      <GalleryPreview />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
