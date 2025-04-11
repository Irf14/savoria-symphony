
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CuisineMenu } from '@/types/menu';

type CuisineHeroProps = {
  activeCuisine: CuisineMenu;
  isTransitioning: boolean;
  onPrevCuisine: () => void;
  onNextCuisine: () => void;
};

const CuisineHero = ({ 
  activeCuisine, 
  isTransitioning, 
  onPrevCuisine, 
  onNextCuisine 
}: CuisineHeroProps) => {
  return (
    <motion.div 
      key={`hero-${activeCuisine.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `url(${activeCuisine.backgroundImage || activeCuisine.background})`,
      }}
    >
      {/* Enhanced overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Cuisine navigation arrows */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full 
                  backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all z-10"
        onClick={() => {
          if (isTransitioning) return;
          onPrevCuisine();
        }}
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full 
                  backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all z-10"
        onClick={() => {
          if (isTransitioning) return;
          onNextCuisine();
        }}
      >
        <ChevronRight size={24} className="text-white" />
      </button>
      
      <div className="container mx-auto px-4 relative z-10 text-center py-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-playfair text-5xl md:text-7xl font-bold mb-6 gold-gradient-text"
        >
          {activeCuisine.name}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-cormorant text-xl md:text-2xl max-w-3xl mx-auto"
        >
          {activeCuisine.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CuisineHero;
