
import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { MenuItem } from '@/types/menu';
import StarRating from './StarRating';

type MenuItemCardProps = {
  item: MenuItem;
  onHover: (id: number | null) => void;
};

const MenuItemCard = ({ item, onHover }: MenuItemCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * (item.id % 6) }}
      className="relative bg-black/40 backdrop-blur-lg border border-zinc-800 hover:border-gold/40 rounded-xl overflow-hidden group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="p-6 relative z-10">
        {/* Top section with name and price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-playfair font-bold text-white group-hover:text-gold transition-colors">
            {item.name}
          </h3>
          <span className="text-gold text-lg font-bold bg-black/40 px-3 py-1 rounded-full">
            ${item.price}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 font-cormorant text-base line-clamp-2 min-h-[48px]">
          {item.description}
        </p>
        
        {/* Bottom section with rating and chef's choice */}
        <div className="flex justify-between items-center">
          <StarRating rating={item.rating || 0} />
          
          {item.chefsChoice && (
            <div className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-md text-xs font-semibold">
              <ChefHat size={14} />
              <span>CHEF'S CHOICE</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
};

export default MenuItemCard;
