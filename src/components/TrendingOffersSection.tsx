import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrendingOffersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);
  
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Enjoy a four-course menu for two with complimentary wine pairing on Friday and Saturday nights.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      title: 'Chef\'s Table Experience',
      description: 'Reserve our exclusive Chef\'s Table for a personalized dining journey with our executive chef.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2077&q=80',
    },
    {
      id: 3,
      title: 'Seasonal Tasting Menu',
      description: 'Experience our limited-time menu featuring the freshest seasonal ingredients from local farms.',
      image: 'https://images.unsplash.com/photo-1583608564476-c6c97c2ddfac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  useEffect(() => {
    // Preload all images to avoid jumpy transitions
    setLoadingImages(true);
    
    const imagePromises = offers.map(offer => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = offer.image;
        img.onload = resolve;
        img.onerror = resolve; // Still resolve even on error to avoid hanging
      });
    });
    
    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
      setLoadingImages(false);
    });
    
    // Auto-advance slideshow
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [offers.length]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fixed background with glassy effect */}
      <div 
        className="absolute inset-0 bg-savoria-black"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }}
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      
      {/* Subtle shimmer effect */}
      <div className="absolute inset-0 bg-gold/5 animate-gold-shimmer"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Trending Offers</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Limited-time experiences designed to delight your senses and create unforgettable memories.
          </p>
        </div>
        
        {imagesLoaded ? (
          <div className="max-w-5xl mx-auto relative">
            {/* Fixed height container to prevent jumps */}
            <div className="min-h-[400px] relative">
              <AnimatePresence mode="wait">
                {offers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    className={`absolute top-0 left-0 w-full overflow-hidden rounded-lg ${index === currentSlide ? 'z-10' : 'z-0'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      scale: currentSlide === index ? 1 : 0.95
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={offer.image} 
                        alt={offer.title} 
                        className="w-full h-96 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <motion.h3 
                        className="font-playfair text-3xl text-white mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {offer.title}
                      </motion.h3>
                      <motion.p 
                        className="text-gray-200 font-cormorant text-xl max-w-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {offer.description}
                      </motion.p>
                      
                      <motion.button 
                        className="mt-6 w-fit px-6 py-2 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Fixed size slide indicators */}
            <div className="relative flex justify-center space-x-2 mt-6">
              {offers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`rounded-full transition-all ${
                    currentSlide === index ? 'bg-gold w-6 sm:w-6 h-2 sm:h-2' : 'bg-white/30 w-2 h-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto h-96 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingOffersSection;
