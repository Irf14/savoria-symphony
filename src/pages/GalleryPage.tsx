
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { X, ZoomIn } from 'lucide-react';
import AmbientVideo from '@/components/AmbientVideo';

// Gallery image data
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Elegant Dining Area',
    category: 'Interior',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    title: 'Mouth-watering Appetizers',
    category: 'Food',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Fine Dining Experience',
    category: 'Ambience',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Culinary Masterpiece',
    category: 'Food',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Private Dining Room',
    category: 'Interior',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600891964599-f61f4c5b0a00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Chef\'s Special',
    category: 'Food',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    title: 'Wine Cellar',
    category: 'Interior',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Celebration Night',
    category: 'Events',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    title: 'Gourmet Dessert',
    category: 'Food',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1455279032140-49a4bf46f343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Cocktail Craftsmanship',
    category: 'Drinks',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    title: 'Chef at Work',
    category: 'Kitchen',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    title: 'Artful Plating',
    category: 'Food',
  },
];

const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [filter, setFilter] = useState('All');
  
  useEffect(() => {
    // Add theme class to body and set elegant background
    document.body.className = 'theme-gallery';
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Cleanup function to remove theme class
    return () => {
      document.body.className = '';
    };
  }, []);
  
  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);
  
  return (
    <div className="min-h-screen relative">
      {/* Elegant background with overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1633783156075-a01661455344?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-savoria-black/90 via-savoria-black/70 to-savoria-black/80"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        <section className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="text-center font-playfair text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Gallery
            </motion.h1>
            
            <motion.p 
              className="text-center text-gray-300 max-w-3xl mx-auto font-cormorant text-xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Relive the exquisite moments and culinary masterpieces that define the SAVORIA experience.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={cn(
                    'px-6 py-2 rounded-sm font-cormorant text-lg transition-colors',
                    filter === category
                      ? 'bg-gold text-savoria-black'
                      : 'bg-transparent border border-gold/50 text-gold hover:bg-gold/10'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              layout
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="gallery-image aspect-square group relative overflow-hidden rounded-md cursor-pointer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  onClick={() => setSelectedImage(image)}
                >
                  <img 
                    src={image.src} 
                    alt={image.title} 
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="font-playfair text-lg text-white">{image.title}</h3>
                    <p className="text-gold text-sm">{image.category}</p>
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="text-white" size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* New Ambient Video Section */}
        <AmbientVideo />
        
        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gold"
            >
              <X size={32} />
            </button>
            
            <div className="max-w-5xl max-h-[80vh] relative">
              <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/70 p-4">
                <h3 className="font-playfair text-xl text-white">{selectedImage.title}</h3>
                <p className="text-gold text-sm">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default GalleryPage;
