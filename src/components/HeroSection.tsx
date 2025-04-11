
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

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
      subtitle: 'Discover our three magnificent venues—Ambrosia (100 persons), Euphoria (40-50 persons), and Majestic (18-20 persons priority room)—each perfect for your special celebrations',
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
    // Auto-advance slideshow with longer duration
    const slideInterval = setInterval(() => {
      if (!isHovering) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 8000); // 8 seconds per slide
    
    return () => clearInterval(slideInterval);
  }, [slides.length, isHovering]);

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

  // Modified function to render SAVORIA with proper gold gradient without excessive glow
  const renderTitleWithGoldGradient = (title: string) => {
    if (!title.includes('SAVORIA')) return title;
    
    const parts = title.split('SAVORIA');
    return (
      <>
        {parts[0]}
        <span className="gold-gradient-text" style={{ 
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          filter: 'brightness(1.05) contrast(1.05)'
        }}>SAVORIA</span>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, y, scale }}
      className="hero-section relative flex items-center justify-center min-h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background parallax effect */}
      <div className="absolute inset-0 z-0">
        {/* Background slideshow */}
        {slides.map((slide, index) => (
          <motion.div 
            key={`slide-bg-${index}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? [1, 1.05] : 1,
            }}
            transition={{ 
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { 
                duration: 8, 
                ease: "easeInOut",
                times: [0, 1],
              }
            }}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Enhanced overlay with more dynamic gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50"></div>
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-black/20" 
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.07'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </motion.div>
        ))}
      </div>
      
      <div 
        ref={containerRef}
        className="container mx-auto px-4 z-10 text-center relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Floating label with glass effect */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="glass-morphism px-6 py-2 rounded-full mb-6 inline-block"
            >
              <motion.div
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                {currentSlide === 0 ? "Fine Dining Experience" : 
                 currentSlide === 1 ? "Private Event Spaces" :
                 currentSlide === 2 ? "Culinary Diversity" : "Service Excellence"}
              </motion.div>
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
              >
                {renderTitleWithGoldGradient(slides[currentSlide].title)}
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            
            {/* Fixed button size and alignment */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <Link 
                to={slides[currentSlide].buttonLink}
                className="inline-flex items-center justify-center w-48 px-6 py-2.5 bg-gold hover:bg-gold/90 text-black font-medium text-base tracking-wider rounded transition-colors shadow-lg"
              >
                <motion.span 
                  className="flex items-center justify-center w-full"
                  whileHover={{ x: -4 }}
                >
                  {slides[currentSlide].buttonText}
                  <motion.span 
                    initial={{ x: -10, opacity: 0 }}
                    whileHover={{ x: 5, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={16} className="ml-2" />
                  </motion.span>
                </motion.span>
              </Link>
              
              <Link
                to="/reservation"
                className="w-48 px-6 py-2.5 bg-transparent border border-gold/70 text-gold font-medium text-base tracking-wider rounded hover:bg-gold/10 transition-colors shadow-lg flex items-center justify-center"
              >
                <span className="relative z-10">Book Your Table</span>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Modern slide indicators with pulse animation */}
      <div className="absolute bottom-28 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              currentSlide === index 
                ? 'bg-gold w-10 gold-pulse' 
                : 'bg-white/30 hover:bg-white/50'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <motion.button 
        onClick={handleScroll}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hover:text-gold transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.2 }}
      >
        <ChevronDown size={32} />
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;
