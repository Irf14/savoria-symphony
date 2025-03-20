
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
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if this is the first visit
    const isFirstVisit = localStorage.getItem('visited') !== 'true';
    
    if (isFirstVisit) {
      // First visit, show loading screen and welcome animation
      setLoading(true);
      localStorage.setItem('visited', 'true');
      
      // Simulate loading
      const timer = setTimeout(() => {
        setLoading(false);
        setShowWelcome(true);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // Not first visit, skip animations
      setLoading(false);
      setShowWelcome(false);
      setInitialized(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    console.log("Loading complete, showing welcome");
    setLoading(false);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    console.log("Welcome complete, showing main content");
    setShowWelcome(false);
    setInitialized(true);
  };

  // Safeguard to ensure the page doesn't get stuck
  useEffect(() => {
    // Force transition to main content after 5 seconds if stuck (reduced from 8)
    const forceTransition = setTimeout(() => {
      if (!initialized) {
        console.log("Force transitioning to main content");
        setLoading(false);
        setShowWelcome(false);
        setInitialized(true);
      }
    }, 5000);
    
    return () => clearTimeout(forceTransition);
  }, [initialized]);

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {showWelcome && <WelcomeAnimation visible={showWelcome} onComplete={handleWelcomeComplete} />}
      
      <div className={`min-h-screen transition-opacity duration-700 ${initialized ? 'opacity-100' : 'opacity-0'}`}>
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
