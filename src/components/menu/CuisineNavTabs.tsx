
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CuisineMenu } from '@/types/menu';

type CuisineNavTabsProps = {
  cuisines: CuisineMenu[];
  activeCuisine: CuisineMenu;
  isTransitioning: boolean;
  onCuisineChange: (cuisineId: string) => void;
};

const CuisineNavTabs = ({ 
  cuisines, 
  activeCuisine, 
  isTransitioning, 
  onCuisineChange 
}: CuisineNavTabsProps) => {
  return (
    <div className="sticky top-0 z-30 bg-black/40 backdrop-blur-lg shadow-lg py-2 border-t border-b border-gold/20">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full">
          <div className="flex py-2 px-2">
            {cuisines.map((cuisine) => (
              <motion.button
                key={cuisine.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mx-2 px-5 py-2 font-cormorant text-lg rounded-sm transition-all duration-300 whitespace-nowrap
                  ${activeCuisine.id === cuisine.id 
                    ? 'bg-gold text-savoria-black font-semibold' 
                    : 'text-white hover:bg-white/10'
                  }`}
                onClick={() => {
                  if (isTransitioning) return;
                  onCuisineChange(cuisine.id);
                }}
              >
                {cuisine.name}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default CuisineNavTabs;
