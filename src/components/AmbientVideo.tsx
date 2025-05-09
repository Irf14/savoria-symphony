
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AmbientVideo = () => {
  return (
    <section className="py-16 relative bg-savoria-black">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white">
            Experience <span className="gold-gradient-text">SAVORIA</span>
          </h2>
          <p className="font-cormorant text-xl text-gray-300 max-w-3xl mx-auto">
            Immerse yourself in the ambiance of SAVORIA before you visit. Our elegant spaces
            are crafted to create the perfect dining atmosphere.
          </p>
        </motion.div>

        <motion.div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Increased height for a more immersive video experience */}
          <div className="w-full">
            <iframe
              className="w-full h-[80vh] md:h-[85vh]" 
              src="https://www.youtube.com/embed/nV1w7XQYgPY?autoplay=1&mute=1&loop=1&playlist=nV1w7XQYgPY&controls=0&showinfo=0&rel=0"
              title="SAVORIA Restaurant Ambient Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
        
        {/* Reserve Table button moved below the video */}
        <motion.div 
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link 
            to="/reservation" 
            className="px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm transition-all duration-300 shadow-lg hover:scale-105"
          >
            Reserve Your Table
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbientVideo;
