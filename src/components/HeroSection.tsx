
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Indulge In The SAVORIA Experience',
      subtitle: 'Embark on a culinary journey through authentic flavors from around the world'
    },
    {
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      title: 'Memorable Gatherings',
      subtitle: 'Create unforgettable moments with friends and family in our elegant spaces'
    },
    {
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Culinary Excellence',
      subtitle: 'Meticulously crafted dishes by our master chefs using the finest ingredients'
    }
  ];

  useEffect(() => {
    setLoaded(true);
    
    // Auto-advance slideshow
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If no about section, scroll to the next section
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence>
        {slides.map((slide, index) => (
          <motion.div 
            key={`slide-bg-${index}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 z-10 text-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              {slides[currentSlide].title === 'Indulge In The SAVORIA Experience' ? (
                <>
                  Indulge In The <span className="gold-text">SAVORIA</span> Experience
                </>
              ) : (
                slides[currentSlide].title
              )}
            </h1>
            
            <p className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
        
        <div className={cn(
          "transition-all duration-1000 transform mt-12",
          loaded ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/menu/thai" 
              className="px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
            >
              Explore Menu
            </Link>
            <Link 
              to="/gallery" 
              className="px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>
      
      {/* Slideshow indicators */}
      <div className="absolute bottom-28 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-gold w-6' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={handleScroll}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hover:text-gold transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
