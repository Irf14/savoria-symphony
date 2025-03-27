
import { useState, useEffect } from 'react';
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
      
      <div className={cn(
        "absolute inset-0 opacity-60 transition-opacity duration-500 z-10",
        "bg-black/50 backdrop-blur-sm"
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
  
  // Updated cuisine images with better food focus and darker backgrounds
  const cuisines = [
    {
      name: 'Thai',
      shortDescription: 'Aromatic herbs and spices',
      description: 'Experience the aromatic herbs and spices of Thailand in every bite, crafted with authentic techniques.',
      image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=90',
      color: 'bg-savoria-thai',
      gradient: 'bg-thai-gradient',
      path: '/menu/thai',
      background: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=90'
    },
    {
      name: 'Chinese',
      shortDescription: 'Perfect harmony of flavors',
      description: 'Savor the perfect harmony of flavors in our authentic Chinese dishes, prepared with traditional methods.',
      image: 'https://images.unsplash.com/photo-1625938145744-533e82abfaf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=90',
      color: 'bg-savoria-chinese',
      gradient: 'bg-chinese-gradient',
      path: '/menu/chinese',
      background: 'https://images.unsplash.com/photo-1623689043725-b190a3a293b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=90'
    },
    {
      name: 'Indian',
      shortDescription: 'Rich tapestry of spices',
      description: 'Discover the rich tapestry of spices that define Indian culinary tradition, creating bold and memorable flavors.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2136&q=90',
      color: 'bg-savoria-indian',
      gradient: 'bg-indian-gradient',
      path: '/menu/indian',
      background: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=90'
    },
    {
      name: 'Bengali',
      shortDescription: 'Subtle flavors and artistry',
      description: 'Enjoy the subtle flavors and artistic preparations of traditional Bengali food, highlighting regional specialties.',
      image: 'https://images.unsplash.com/photo-1631452180775-4e277a5b3f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=90',
      color: 'bg-savoria-bengali',
      gradient: 'bg-bengali-gradient',
      path: '/menu/bengali',
      // Reliable image for Bengali cuisine
      background: 'https://images.unsplash.com/photo-1631452180775-4e277a5b3f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=90'
    },
    {
      name: 'Continental',
      shortDescription: 'Sophisticated European flavors',
      description: 'Experience the sophisticated flavors of European culinary excellence with our refined continental offerings.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=90',
      color: 'bg-savoria-continental',
      gradient: 'bg-continental-gradient',
      path: '/menu/continental',
      background: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=90'
    },
  ];

  useEffect(() => {
    // Preload all cuisine images with higher quality
    const preloadImages = async () => {
      const imagePromises = cuisines.map(cuisine => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = cuisine.image;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Still resolve on error
        });
      });
      
      // Also preload background images
      const backgroundPromises = cuisines.map(cuisine => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = cuisine.background;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Still resolve on error
        });
      });
      
      await Promise.all([...imagePromises, ...backgroundPromises]);
      setImagesLoaded(true);
    };
    
    preloadImages();
    
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
  const defaultBackground = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=90';

  // Set the current background based on activeBackground
  const currentBackground = activeIndex >= 0 ? cuisines[activeIndex].background : defaultBackground;

  const handleCuisineHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-savoria-black to-savoria-dark">
      {/* Dynamic cuisine background with smoother fade transition */}
      <motion.div 
        className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 1.5
        }}
        style={{
          backgroundImage: `url(${currentBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          transition: 'background-image 1.5s ease-in-out'
        }}
      />
      
      {/* Glassy overlay for better section flow */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-1"></div>
      
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
        
        {/* Hidden preloader for cuisine images */}
        <div className="image-preloader">
          {cuisines.map((cuisine, index) => (
            <img key={index} src={cuisine.image} alt="" />
          ))}
          {cuisines.map((cuisine, index) => (
            <img key={`bg-${index}`} src={cuisine.background} alt="" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineShowcase;
