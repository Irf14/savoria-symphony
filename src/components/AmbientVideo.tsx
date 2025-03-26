
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
          {/* Increased size by removing aspect ratio constraint */}
          <div className="w-full">
            <iframe
              className="w-full h-[60vh] md:h-[70vh]" 
              src="https://www.youtube.com/embed/nV1w7XQYgPY?autoplay=1&mute=1&loop=1&playlist=nV1w7XQYgPY"
              title="SAVORIA Restaurant Ambient Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Subtle gradient overlay for aesthetics, not blocking the video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent pointer-events-none" />
          
          {/* Reserve Table button positioned at the bottom instead of over the video */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center">
            <Link 
              to="/reservation" 
              className="px-8 py-3 bg-gold/90 hover:bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm transition-colors shadow-lg"
            >
              Reserve Your Table
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbientVideo;
