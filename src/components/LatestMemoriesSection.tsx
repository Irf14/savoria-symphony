
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LatestMemoriesSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1539622106114-e0df812097e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1691881235811-568677709895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  useEffect(() => {
    // Auto-advance background slideshow
    const bgInterval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(bgInterval);
  }, [backgroundImages.length]);

  const memories = [
    {
      id: 1,
      title: 'Anniversary Celebration',
      description: 'A beautiful evening of romance and exquisite dining',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      title: 'Corporate Gathering',
      description: 'Elegant space for important business discussions',
      image: 'https://images.unsplash.com/photo-1539622106114-e0df812097e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 3,
      title: 'Cultural Night',
      description: 'Celebrating diversity through food and performances',
      image: 'https://images.unsplash.com/photo-1691881235811-568677709895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    },
    {
      id: 4,
      title: 'Wine Tasting Event',
      description: 'Exploring premium vintages from around the world',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  return (
    <section className="py-20 bg-savoria-dark relative overflow-hidden">
      {/* Background slideshow */}
      {backgroundImages.map((image, index) => (
        <div 
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            backgroundIndex === index ? 'opacity-15' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Latest Memories</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Beautiful moments shared in our space, creating lasting impressions and stories.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-savoria-muted">
              <TabsTrigger value="all" className="text-white data-[state=active]:text-gold">All</TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:text-gold">Events</TabsTrigger>
              <TabsTrigger value="dining" className="text-white data-[state=active]:text-gold">Dining</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.slice(0, 2).map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="dining">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.slice(2, 4).map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="inline-block px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
          >
            View All Memories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestMemoriesSection;
