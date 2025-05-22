
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
      {/* Enhanced luxury frosted glass effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-black/20 to-black/10 backdrop-blur-lg group-hover:backdrop-blur-xl transition-all duration-500 -z-10"></div>
      
      <div className="p-6 relative z-10">
        {/* Top section with name and price */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-playfair font-bold text-white group-hover:text-gold transition-colors">
            {item.name}
          </h3>
          <span className="price-tag text-gold text-lg font-cormorant">
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
      
      {/* Enhanced golden gradient hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Enhanced glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      
      {/* Golden shimmer effect on focus */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div 
          className="absolute -inset-full h-[300%] w-[300%] opacity-0 group-hover:opacity-100 group-focus:opacity-100 bg-gradient-conic from-transparent via-gold/20 to-transparent -z-10 animate-[spin_4s_linear_infinite]"
          style={{
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50% 50%',
          }}
        />
      </div>
      
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-xl border border-gold/0 group-hover:border-gold/30 transition-all duration-300"></div>
    </motion.div>
  );
};

export default MenuItemCard;
