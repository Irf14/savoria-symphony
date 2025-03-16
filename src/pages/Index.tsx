import { useState, useEffect } from 'react';
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
import LoadingScreen from '@/components/LoadingScreen';
import WelcomeAnimation from '@/components/WelcomeAnimation';
import ExcellenceSection from '@/components/ExcellenceSection';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Check if user has already seen the welcome animation
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
      // Show welcome animation only for first-time visitors
      setShowWelcome(true);
    } else {
      // Skip welcome animation for returning visitors
      setLoading(false); // Proceed to content directly for returning users
    }

    // Simulate loading
    const timer = setTimeout(() => {
      if (!hasSeenWelcome) {
        localStorage.setItem("hasSeenWelcome", "true");
      }
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // Once the animation completes, proceed to the page content
    setLoading(false); // Ensures that page loads after animation completes
  };

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {showWelcome && <WelcomeAnimation visible={showWelcome} onComplete={handleWelcomeComplete} />}

      {/* Once loading and welcome animation are complete, display the page content */}
      <div className={`min-h-screen bg-savoria-black ${!loading ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <HeroSection />
        <PopularDishesSection />
        <CuisineShowcase />
        <ExcellenceSection />
        <SpecialServicesSection />
        <TrendingOffersSection />
        <LatestMemoriesSection />
        <GalleryPreview />
        <TestimonialSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
