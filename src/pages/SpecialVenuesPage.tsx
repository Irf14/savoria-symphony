
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { venues } from '@/data/venueData';
import { motion } from 'framer-motion';

const SpecialVenuesPage = () => {
  const location = useLocation();
  const venueRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Scroll to the venue specified in the URL hash
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash && venueRefs.current[hash]) {
      setTimeout(() => {
        venueRefs.current[hash]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 500);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 min-h-[50vh] flex items-center justify-center bg-cover bg-center" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/backgrounds/venues-bg.jpg')` 
        }}>
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-playfair font-bold mb-6 gold-gradient-text"
          >
            Special Venues
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Create unforgettable memories in our exquisite venues designed for every occasion
          </motion.p>
        </div>
      </section>
      
      {/* Venues Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {venues.map((venue, index) => (
            <div 
              key={venue.id}
              id={venue.id}
              ref={el => venueRefs.current[venue.id] = el}
              className={`venue-section flex flex-col md:flex-row items-center gap-8 py-16 ${
                index < venues.length - 1 ? 'border-b border-gold/10' : ''
              }`}
            >
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 aspect-video overflow-hidden rounded-lg"
              >
                <img 
                  src={venue.imageSrc} 
                  alt={venue.name} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}
              >
                <h2 className="text-4xl font-playfair font-bold mb-4 text-gold">{venue.name}</h2>
                <p className="text-xl mb-2">Capacity: {venue.capacity} guests</p>
                <p className="text-lg mb-6 text-gray-300">{venue.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-4">Features & Amenities</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {venue.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button className="bg-gold hover:bg-gold/90 text-black px-6 py-3 rounded font-medium transition-all hover:shadow-gold">
                  Inquire About {venue.name}
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SpecialVenuesPage;
