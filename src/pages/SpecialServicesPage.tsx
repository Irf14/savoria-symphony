
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Music, Shield, Wifi, DollarSign, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VenueSection = ({ venue, index, isRightAligned = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section 
      ref={ref}
      id={venue.id} 
      className="min-h-screen flex items-center py-24 scroll-mt-20 relative"
    >
      <div className="absolute inset-0 bg-savoria-black opacity-80 z-0" />
      <div 
        className="absolute inset-0 opacity-40 z-0"
        style={{
          backgroundImage: `url(${venue.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)'
        }}
      />
      
      <div className="container mx-auto px-4 z-10">
        <div className={`flex flex-col ${isRightAligned ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: isRightAligned ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRightAligned ? 50 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-md shadow-2xl">
              <img 
                src={venue.image} 
                alt={venue.name} 
                className="w-full max-h-[500px] object-cover transform transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
          
          <div className="md:w-1/2">
            <motion.h2 
              className="font-playfair text-4xl md:text-5xl text-gold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
            >
              {venue.name}
            </motion.h2>
            
            <motion.div 
              className="w-24 h-1 bg-gold mb-8"
              initial={{ width: 0 }}
              animate={isInView ? { width: 120 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-gray-300 text-xl font-cormorant mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {venue.description}
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {venue.features.map((feature, i) => (
                <div key={i} className="flex items-start">
                  <feature.icon className="text-gold mt-1 mr-3" size={20} />
                  <p className="text-white font-cormorant text-lg">{feature.text}</p>
                </div>
              ))}
            </motion.div>
            
            <motion.button
              className="mt-10 px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={() => window.location.href = '/contact'}
            >
              Book This Venue
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecialServicesPage = () => {
  const venues = [
    {
      id: "ambrosia",
      name: "Ambrosia",
      description: "Our signature 100-person hall, Ambrosia offers a sophisticated environment for corporate events, weddings, and grand celebrations. With state-of-the-art audio-visual capabilities and elegant décor, it's the perfect backdrop for your most important occasions.",
      image: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1471967183320-ee018f6e114a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      features: [
        { icon: Users, text: "Capacity for 100 guests" },
        { icon: Music, text: "Advanced sound system" },
        { icon: Shield, text: "Private entrance" },
        { icon: Wifi, text: "High-speed WiFi" },
        { icon: DollarSign, text: "Custom catering packages" },
        { icon: MapPin, text: "Separate from main dining" }
      ]
    },
    {
      id: "euphoria",
      name: "Euphoria",
      description: "Euphoria provides an intimate yet spacious setting for up to 50 guests. This versatile space adapts to corporate meetings, family gatherings, and milestone celebrations with adjustable lighting and flexible seating arrangements to suit your specific needs.",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2798&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        { icon: Users, text: "Accommodates 50 guests" },
        { icon: Music, text: "Integrated audio system" },
        { icon: Shield, text: "Privacy screens available" },
        { icon: Wifi, text: "Dedicated network" },
        { icon: DollarSign, text: "Flexible pricing options" },
        { icon: MapPin, text: "Folding doors for privacy" }
      ]
    },
    {
      id: "majestic",
      name: "Majestic",
      description: "The Majestic room offers an exclusive setting for intimate gatherings of up to 20 guests. Perfect for executive meetings, private celebrations, or special dining experiences, this premium space features personalized service and attention to every detail.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      features: [
        { icon: Users, text: "Intimate space for 20 guests" },
        { icon: Music, text: "Custom ambience settings" },
        { icon: Shield, text: "Complete privacy" },
        { icon: Wifi, text: "Premium connectivity" },
        { icon: DollarSign, text: "Priority service included" },
        { icon: MapPin, text: "Secluded location" }
      ]
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-savoria-black">
      <Navbar />
      
      <div className="pt-20 pb-10 relative">
        <div 
          className="absolute inset-0 opacity-30 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1614145733489-15f4217b86df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              Exclusive <span className="gold-text">Venues</span>
            </h1>
            <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
              Create unforgettable memories in our carefully designed spaces, each offering a unique ambiance for your special occasions.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 bg-savoria-muted bg-opacity-50 p-4 rounded-md">
            {venues.map((venue, index) => (
              <a 
                key={venue.id}
                href={`#${venue.id}`}
                className="px-6 py-2 text-white font-cormorant text-lg hover:text-gold transition-colors"
              >
                {venue.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {venues.map((venue, index) => (
        <VenueSection 
          key={venue.id} 
          venue={venue} 
          index={index} 
          isRightAligned={index % 2 !== 0}
        />
      ))}
      
      <Footer />
    </div>
  );
};

export default SpecialServicesPage;
