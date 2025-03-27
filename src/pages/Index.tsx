
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

// Transitional divider component
const SectionDivider = ({ light = false }: { light?: boolean }) => (
  <div className={`relative w-full ${light ? 'bg-savoria-black/50' : 'bg-savoria-dark/70'} py-8 overflow-hidden`}>
    <div className="container mx-auto px-4">
      <div className="flex justify-center">
        <div className="w-24 h-0.5 bg-gold/30"></div>
      </div>
    </div>
    <div className={`absolute inset-0 backdrop-blur-sm -z-10 ${light ? 'bg-black/10' : 'bg-black/30'}`}></div>
  </div>
);

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
      
      // We'll show the loading screen for 2 seconds
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

  // Safeguard to ensure the page doesn't get stuck
  useEffect(() => {
    // Force transition to main content after 4 seconds
    const welcomeTimeout = setTimeout(() => {
      if (showWelcome) {
        console.log("Force transitioning from welcome to main content");
        setShowWelcome(false);
        setInitialized(true);
      }
    }, 4000);
    
    // Force transition to main content after 2.5 seconds
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
        
        <div className="relative">
          <SectionDivider light />
          <PopularDishesSection />
          
          <SectionDivider />
          <CuisineShowcase />
          
          <SectionDivider light />
          <ExcellenceSection />
          
          <SectionDivider />
          <AmbientVideo />
          
          <SectionDivider light />
          <SpecialServicesSection />
          
          <SectionDivider />
          <TrendingOffersSection />
          
          <SectionDivider light />
          <LatestMemoriesSection />
          
          <SectionDivider />
          <GalleryPreview />
          
          <SectionDivider light />
          <TestimonialSection />
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
