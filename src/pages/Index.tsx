
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import CuisineShowcase from '@/components/CuisineShowcase';
import GalleryPreview from '@/components/GalleryPreview';
import TestimonialSection from '@/components/TestimonialSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-savoria-black">
      <Navbar />
      <HeroSection />
      <CuisineShowcase />
      <GalleryPreview />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
