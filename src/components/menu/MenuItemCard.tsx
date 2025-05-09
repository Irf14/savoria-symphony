
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
      className="menu-item-card fine-dining-card relative group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
      tabIndex={0}
    >
      <div className="p-6 relative z-10">
        {/* Top section with name and price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-playfair font-bold text-white group-hover:text-gold transition-colors">
            {item.name}
          </h3>
          <span className="price-tag text-gold text-lg">
            ${item.price}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 font-cormorant text-base line-clamp-2 min-h-[48px]">
          {item.description}
        </p>
        
        {/* Bottom section with optional elements */}
        <div className="flex justify-between items-center">
          {/* Show rating if available */}
          {item.rating !== undefined && <StarRating rating={item.rating} />}
          
          {/* Show chef's choice badge if available */}
          {item.chefsChoice && (
            <div className="flex items-center gap-1 bg-gold/20 text-gold px-2 py-1 rounded-md text-xs font-semibold">
              <ChefHat size={14} />
              <span>CHEF'S CHOICE</span>
            </div>
          )}
          
          {/* Show signature dish indicator if neither rating nor chef's choice is available */}
          {!item.rating && !item.chefsChoice && item.isSignature && (
            <div className="flex items-center gap-1 bg-gold/10 text-gold px-2 py-1 rounded-md text-xs font-semibold">
              <span>SIGNATURE DISH</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Golden gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/15 to-gold/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </motion.div>
  );
};

export default MenuItemCard;
