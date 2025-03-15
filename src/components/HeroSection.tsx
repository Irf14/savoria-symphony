
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Experience Fine Dining',
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
    }
  };

  return (
    <section className="hero-section relative flex items-center justify-center min-h-screen">
      <Carousel className="w-full h-full absolute inset-0">
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div 
                className={cn(
                  "w-full h-full transition-opacity duration-1000",
                  currentSlide === index ? "opacity-100" : "opacity-0"
                )}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  inset: 0,
                  filter: 'brightness(0.3)'
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      
      <div className="container mx-auto px-4 z-10 text-center py-32 relative">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              y: currentSlide === index ? 0 : 20
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              {slide.title} <span className="gold-text">SAVORIA</span>
            </h1>
            
            <p className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              {slide.subtitle}
            </p>
          </motion.div>
        ))}
        
        <div className={cn(
          "transition-all duration-1000 transform mt-64",
          loaded ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a 
              href="/menu/thai" 
              className="px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
            >
              Explore Menu
            </a>
            <a 
              href="/gallery" 
              className="px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>
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
