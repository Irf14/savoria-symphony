
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const GalleryPreview = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Elegant Dining',
      description: 'The perfect setting for an unforgettable meal',
    },
    {
      src: 'https://images.unsplash.com/photo-1551972873-b7e8754e8e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80',
      title: 'Culinary Creations',
      description: 'Art on a plate, crafted by master chefs',
    },
    {
      src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Exquisite Presentation',
      description: 'Every dish tells a story of passion and creativity',
    },
    {
      src: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Special Occasions',
      description: 'Create memories that last a lifetime',
    },
  ];

  useEffect(() => {
    // Auto-advance background slideshow
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-24 relative overflow-hidden theme-gallery">
      {/* Background slideshow */}
      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div 
            key={`bg-${index}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: backgroundIndex === index ? 0.15 : 0,
              zIndex: backgroundIndex === index ? 1 : 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2) blur(8px)',
            }}
          />
        ))}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Gallery</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            A glimpse into the world of SAVORIA, where every moment is a masterpiece waiting to be savored.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-image group rounded-md overflow-hidden h-64 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="font-playfair text-xl text-white">{image.title}</h3>
                <p className="text-gray-300 text-sm">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="inline-block px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
          >
            View All Photos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
