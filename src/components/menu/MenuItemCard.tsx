
import React from 'react';
import { MenuItem } from '@/types/menu';
import StarRating from './StarRating';
import { motion } from 'framer-motion';

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
      className="glass-card p-6 rounded-lg relative overflow-hidden group"
      onMouseEnter={() => onHover(item.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Chef's choice badge */}
      {item.chefsChoice && (
        <div className="absolute top-3 right-3 bg-gold text-savoria-black text-xs font-bold px-2 py-1 rounded-full z-10 gold-pulse">
          CHEF'S CHOICE
        </div>
      )}
      
      <h3 className="text-xl font-playfair font-bold text-white mb-2">{item.name}</h3>
      <p className="text-gray-300 mb-3 font-cormorant text-base">{item.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-gold text-lg font-bold">${item.price}</span>
        <StarRating rating={item.rating || 0} />
      </div>
      
      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default MenuItemCard;
