
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CuisineCardProps {
  cuisine: {
    name: string;
    description: string;
    shortDescription: string;
    image: string;
    color: string;
    gradient: string;
    path: string;
  };
  onHover: () => void;
  isHovered: boolean;
}

const CuisineCard = ({ cuisine, onHover, isHovered }: CuisineCardProps) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Link 
      to={cuisine.path}
      className="cuisine-card group h-full block rounded-lg relative overflow-hidden"
      onMouseEnter={() => {
        setIsCardHovered(true);
        onHover();
      }}
      onMouseLeave={() => {
        setIsCardHovered(false);
      }}
      onTouchStart={() => {
        setIsCardHovered(true);
        onHover();
      }}
      onTouchEnd={() => setTimeout(() => setIsCardHovered(false), 1000)}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ scale: isCardHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage: `url(${cuisine.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Darker overlay with reduced blur for better visibility */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-300 z-10",
        "bg-black/80"
      )} />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <h3 className="font-playfair text-2xl font-bold gold-gradient-text mb-2">{cuisine.name}</h3>
        
        <motion.div
          initial={{ height: "0px", opacity: 0 }}
          animate={{ 
            height: isCardHovered || isMobile ? "auto" : "0px", 
            opacity: isCardHovered || isMobile ? 1 : 0,
            marginBottom: isCardHovered || isMobile ? "0.75rem" : "0"
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-cormorant text-lg text-white">
            {cuisine.description}
          </p>
        </motion.div>
        
        {!isMobile && (
          <motion.p 
            className="font-cormorant text-gray-200 mb-4"
            animate={{ opacity: isCardHovered ? 0 : 1 }}
          >
            {cuisine.shortDescription}
          </motion.p>
        )}
        
        <motion.div 
          className="w-12 h-0.5 bg-gold"
          animate={{ width: isCardHovered ? "5rem" : "3rem" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
};

const CuisineShowcase = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeBackground, setActiveBackground] = useState('default');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [backgroundIsLoading, setBackgroundIsLoading] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Updated cuisine images with more reliable sources
  const cuisines = [
    {
      name: 'Thai',
      shortDescription: 'Aromatic herbs and spices',
      description: 'Experience the aromatic herbs and spices of Thailand in every bite, crafted with authentic techniques.',
      image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=2064&auto=format&fit=crop',
      color: 'bg-savoria-thai',
      gradient: 'bg-thai-gradient',
      path: '/menu/thai',
      background: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Chinese',
      shortDescription: 'Perfect harmony of flavors',
      description: 'Savor the perfect harmony of flavors in our authentic Chinese dishes, prepared with traditional methods.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2070&auto=format&fit=crop',
      color: 'bg-savoria-chinese',
      gradient: 'bg-chinese-gradient',
      path: '/menu/chinese',
      background: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2060&auto=format&fit=crop'
    },
    {
      name: 'Indian',
      shortDescription: 'Rich tapestry of spices',
      description: 'Discover the rich tapestry of spices that define Indian culinary tradition, creating bold and memorable flavors.',
      image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=2080&auto=format&fit=crop',
      color: 'bg-savoria-indian',
      gradient: 'bg-indian-gradient',
      path: '/menu/indian',
      background: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop'
    },
    {
      name: 'Bengali',
      shortDescription: 'Subtle flavors and artistry',
      description: 'Enjoy the subtle flavors and artistic preparations of traditional Bengali food, highlighting regional specialties.',
      image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?q=80&w=2069&auto=format&fit=crop',
      color: 'bg-savoria-bengali',
      gradient: 'bg-bengali-gradient',
      path: '/menu/bengali',
      background: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Continental',
      shortDescription: 'Sophisticated European flavors',
      description: 'Experience the sophisticated flavors of European culinary excellence with our refined continental offerings.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
      color: 'bg-savoria-continental',
      gradient: 'bg-continental-gradient',
      path: '/menu/continental',
      background: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop'
    },
  ];

  // More aggressive image preloading to ensure images are available
  useEffect(() => {
    const preloadAllImages = async () => {
      setImagesLoaded(false);
      
      // Create an array of promises for all images
      const imagePromises = [];
      
      // Preload card images and backgrounds
      for (const cuisine of cuisines) {
        // Main image
        imagePromises.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = cuisine.image;
            img.onload = () => resolve();
            img.onerror = () => {
              console.error(`Failed to load cuisine image: ${cuisine.image}`);
              resolve(); // Still resolve to prevent blocking
            };
          })
        );
        
        // Background image
        imagePromises.push(
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = cuisine.background;
            img.onload = () => resolve();
            img.onerror = () => {
              console.error(`Failed to load background image: ${cuisine.background}`);
              resolve(); // Still resolve to prevent blocking
            };
          })
        );
      }
      
      // Also preload default background
      const defaultBackground = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop';
      imagePromises.push(
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = defaultBackground;
          img.onload = () => resolve();
          img.onerror = () => {
            console.error(`Failed to load default background: ${defaultBackground}`);
            resolve();
          };
        })
      );
      
      // Wait for all images to load (or fail)
      try {
        await Promise.all(imagePromises);
        console.log("All cuisine images preloaded successfully");
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Set loaded anyway to prevent blocking the UI
        setImagesLoaded(true);
      }
    };
    
    preloadAllImages();
    
    // Auto-switch background for mobile
    if (window.innerWidth < 768) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setActiveIndex(currentIndex);
        currentIndex = (currentIndex + 1) % cuisines.length;
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Default food-related background 
  const defaultBackground = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop';

  // Set the current background based on activeBackground
  const currentBackground = activeIndex >= 0 ? cuisines[activeIndex].background : defaultBackground;

  // Improved cuisine hover handler with smoother transitions and failsafe
  const handleCuisineHover = (index: number) => {
    if (index < 0 || index >= cuisines.length) {
      console.error("Invalid cuisine index:", index);
      return;
    }

    setBackgroundIsLoading(true);
    setActiveIndex(index);
    
    // Improved preloading with timeout protection
    const img = new Image();
    img.src = cuisines[index].background;
    
    // Set a timeout to ensure we don't wait forever
    const loadTimeout = setTimeout(() => {
      setBackgroundIsLoading(false);
    }, 1000);
    
    img.onload = () => {
      clearTimeout(loadTimeout);
      setBackgroundIsLoading(false);
    };
    
    img.onerror = () => {
      clearTimeout(loadTimeout);
      console.error(`Failed to load background image: ${cuisines[index].background}`);
      setBackgroundIsLoading(false);
    };
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-savoria-black to-savoria-dark">
      {/* Dynamic cuisine background with smoother fade transition */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 z-0 bg-fixed transition-all duration-500"
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: backgroundIsLoading ? 0.2 : 0.4,
        }}
      />
      
      {/* Enhanced overlay for better section flow - removed blur for cleaner look */}
      <div className="absolute inset-0 bg-black/70 z-1"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-5xl font-bold mb-4">
            Our <span className="gold-gradient-text">Culinary</span> Journey
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-2 mb-6"></div>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl mt-4">
            Discover our diverse culinary heritage spanning five distinct cuisines, each prepared with passion and precision.
          </p>
        </motion.div>
        
        {imagesLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {cuisines.map((cuisine, index) => (
              <motion.div
                key={cuisine.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="h-80 md:h-96"
              >
                <CuisineCard 
                  cuisine={cuisine} 
                  onHover={() => handleCuisineHover(index)}
                  isHovered={activeIndex === index}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-60">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CuisineShowcase;
