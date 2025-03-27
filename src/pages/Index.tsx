
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
import AmbientVideo from '@/components/AmbientVideo';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if this is the first visit in this session
    const isFirstVisitInSession = sessionStorage.getItem('visited') !== 'true';
    
    if (isFirstVisitInSession) {
      // First visit in this session, show loading screen and welcome animation
      setLoading(true);
      sessionStorage.setItem('visited', 'true');
      
      // We'll show the loading screen for 2 seconds (reduced from 2.5)
      setTimeout(() => {
        setLoading(false);
        setShowWelcome(true);
      }, 2000);
    } else {
      // Not first visit in this session, skip animations
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

  // Safeguard to ensure the page doesn't get stuck - reduced timeouts
  useEffect(() => {
    // Force transition to main content after 4 seconds (reduced from 5)
    const welcomeTimeout = setTimeout(() => {
      if (showWelcome) {
        console.log("Force transitioning from welcome to main content");
        setShowWelcome(false);
        setInitialized(true);
      }
    }, 4000);
    
    // Force transition to main content after 2.5 seconds (reduced from 3)
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("Force transitioning from loading to welcome");
        setLoading(false);
        setShowWelcome(true);
      }
    }, 2500);
    
    return () => {
      clearTimeout(welcomeTimeout);
      clearTimeout(loadingTimeout);
    };
  }, [loading, showWelcome, initialized]);

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
        <AmbientVideo />
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
