
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Luxury Fine-Dining at SAVORIA',
      subtitle: 'Experience the pinnacle of culinary craftsmanship in our elegant dining space, where every detail is perfected for your enjoyment',
      buttonText: 'Explore Menu',
      buttonLink: '/menu'
    },
    {
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Exclusive Venues by SAVORIA',
      subtitle: 'Discover our three magnificent venues—Sapphire Hall, Emerald Room, and Ruby Lounge—each perfect for your special celebrations',
      buttonText: 'View Venues',
      buttonLink: '/special-services'
    },
    {
      image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Global Cuisines at SAVORIA',
      subtitle: 'Embark on a global culinary journey with our five exquisite cuisines: Thai, Chinese, Indian, Bengali, and Continental',
      buttonText: 'View Cuisines',
      buttonLink: '/menu'
    },
    {
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'SAVORIA Hospitality Excellence',
      subtitle: 'Immerse yourself in unparalleled service where our passion for hospitality creates memories that last a lifetime',
      buttonText: 'Reserve Now',
      buttonLink: '/reservation'
    }
  ];

  useEffect(() => {
    setLoaded(true);
    
    // Auto-advance slideshow with longer duration
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); // 8 seconds per slide
    
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

  const renderTitleWithGoldGradient = (title) => {
    if (!title.includes('SAVORIA')) return title;
    
    const parts = title.split('SAVORIA');
    return (
      <>
        {parts[0]}
        <span className="gold-gradient-text">SAVORIA</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="hero-section relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background slideshow */}
      {slides.map((slide, index) => (
        <motion.div 
          key={`slide-bg-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for text readability with more modern gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40"></div>
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 z-10 text-center relative">
        <motion.div
          key={`slide-content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Subtitle label for context */}
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gold/20 backdrop-blur-sm px-4 py-1 rounded-sm text-white/90 font-cormorant text-lg mb-4 inline-block"
          >
            {currentSlide === 0 ? "Fine Dining Experience" : 
             currentSlide === 1 ? "Private Event Spaces" :
             currentSlide === 2 ? "Culinary Diversity" : "Service Excellence"}
          </motion.span>
          
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            {renderTitleWithGoldGradient(slides[currentSlide].title)}
          </h1>
          
          <p className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            {slides[currentSlide].subtitle}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link 
              to={slides[currentSlide].buttonLink}
              className="px-8 py-3 bg-gold/90 text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold transition-colors shadow-lg"
            >
              {slides[currentSlide].buttonText}
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Modern slide indicators with pulse animation */}
      <div className="absolute bottom-28 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-gold w-10 gold-pulse' 
                : 'bg-white/30 hover:bg-white/50'
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
