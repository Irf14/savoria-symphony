
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CuisineMenu } from '@/types/chat';

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
    <ScrollArea className="w-full">
      <div className="flex py-2 px-2">
        {cuisines.map((cuisine, index) => (
          <motion.button
            key={cuisine.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`relative mx-2 px-5 py-2 font-cormorant text-lg rounded-md transition-all duration-300 whitespace-nowrap
              ${activeCuisine.id === cuisine.id 
                ? 'text-gold font-semibold' 
                : 'text-white/80 hover:text-white'
              }`}
            onClick={() => {
              if (isTransitioning) return;
              onCuisineChange(cuisine.id);
            }}
          >
            {cuisine.name}
            {activeCuisine.id === cuisine.id && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CuisineNavTabs;
