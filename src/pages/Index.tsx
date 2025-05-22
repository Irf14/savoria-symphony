import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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

// Enhanced transitional divider component with parallax effect
const SectionDivider = ({ light = false }: { light?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  
  return (
    <motion.div 
      ref={ref}
      style={{ opacity }}
      className={`relative w-full ${light ? 'bg-savoria-black/50' : 'bg-savoria-dark/70'} py-8 overflow-hidden`}
    >
      <motion.div 
        style={{ y }}
        className="container mx-auto px-4"
      >
        <div className="flex justify-center">
          <div className="w-24 h-0.5 bg-gold/30"></div>
        </div>
      </motion.div>
      <div className={`absolute inset-0 backdrop-blur-sm -z-10 ${light ? 'bg-black/10' : 'bg-black/30'}`}></div>
    </motion.div>
  );
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Smooth scroll handling for section reveals
  const { scrollYProgress } = useScroll();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Check if this is the first visit in this session
    const isFirstVisitInSession = sessionStorage.getItem('visited') !== 'true';
    
    console.log("First visit check:", isFirstVisitInSession);
    
    if (isFirstVisitInSession) {
      // First visit in this session, show loading screen and welcome animation
      setLoading(true);
      sessionStorage.setItem('visited', 'true');
      
      // Show the loading screen for a shorter time to improve perceived performance
      setTimeout(() => {
        setLoading(false);
        setShowWelcome(true);
      }, 1500); // Reduced from 2000ms to 1500ms for better performance
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
    
    // Force chat assistant button to appear
    const chatButton = document.getElementById('chat-toggle-button');
    if (chatButton) {
      chatButton.classList.add('opacity-100');
      chatButton.classList.remove('opacity-0', 'translate-y-10');
    }
  };

  // Safeguard to ensure the page doesn't get stuck
  useEffect(() => {
    // Force transition to main content after 3.5 seconds (reduced from 4)
    const welcomeTimeout = setTimeout(() => {
      if (showWelcome) {
        console.log("Force transitioning from welcome to main content");
        setShowWelcome(false);
        setInitialized(true);
      }
    }, 3500);
    
    // Force transition to main content after 2 seconds (reduced from 2.5)
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.log("Force transitioning from loading to welcome");
        setLoading(false);
        setShowWelcome(true);
      }
    }, 2000);
    
    return () => {
      clearTimeout(welcomeTimeout);
      clearTimeout(loadingTimeout);
    };
  }, [loading, showWelcome, initialized]);

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {showWelcome && <WelcomeAnimation visible={showWelcome} onComplete={handleWelcomeComplete} />}
      
      <motion.div 
        ref={mainContentRef}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: initialized ? 1 : 0,
          transition: { duration: 0.7, ease: "easeInOut" }
        }}
        className="min-h-screen"
      >
        <Navbar />
        <HeroSection />
        
        <div className="relative">
          {/* Apply scroll reveal animations to each section */}
          <SectionDivider light />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <PopularDishesSection />
          </motion.div>
          
          <SectionDivider />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <CuisineShowcase />
          </motion.div>
          
          <SectionDivider light />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ExcellenceSection />
          </motion.div>
          
          <SectionDivider />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <AmbientVideo />
          </motion.div>
          
          <SectionDivider light />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SpecialServicesSection />
          </motion.div>
          
          <SectionDivider />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <TrendingOffersSection />
          </motion.div>
          
          <SectionDivider light />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <LatestMemoriesSection />
          </motion.div>
          
          <SectionDivider />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <GalleryPreview />
          </motion.div>
          
          <SectionDivider light />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <TestimonialSection />
          </motion.div>
        </div>
        
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
