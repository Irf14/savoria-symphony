
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Music, Shield } from 'lucide-react';

const SpecialServicesSection = () => {
  const navigate = useNavigate();
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const services = [
    {
      name: 'Ambrosia',
      capacity: '100 Person Meeting Hall',
      description: 'An elegant space for large gatherings, conferences, and celebrations.',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80'
    },
    {
      name: 'Euphoria',
      capacity: '50 Person Hall',
      description: 'A versatile space perfect for medium-sized events and business meetings.',
      icon: Music,
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2798&q=80'
    },
    {
      name: 'Majestic',
      capacity: '20 Person Priority Room',
      description: 'An intimate setting for exclusive gatherings and private dining experiences.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  useEffect(() => {
    // Auto-advance background slideshow
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="py-24 bg-savoria-muted relative overflow-hidden">
      {/* Background slideshow */}
      {services.map((service, index) => (
        <div 
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            backgroundIndex === index ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Special Venues</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Exclusive spaces designed for memorable gatherings, meetings, and celebrations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              className="bg-savoria-black bg-opacity-70 rounded-md overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => navigate('/special-services')}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <service.icon className="text-gold mr-2" size={24} />
                  <h3 className="font-playfair text-2xl font-semibold text-white">{service.name}</h3>
                </div>
                <p className="text-gold/80 mb-2 font-cormorant text-lg">{service.capacity}</p>
                <p className="text-gray-300 font-cormorant text-lg">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/special-services')}
            className="px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
          >
            Discover Our Venues
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialServicesSection;
