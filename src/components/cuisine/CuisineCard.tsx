
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CuisineCardProps {
  title: string;
  image: string;
  description: string;
  index: number;
}

const CuisineCard: React.FC<CuisineCardProps> = ({ title, image, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="cuisine-card group relative h-96 overflow-hidden rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Card background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
      </div>
      
      {/* Card content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
        <h3 className="font-playfair text-2xl font-bold mb-2">{title}</h3>
        <div className="opacity-100 translate-y-0 transition-all duration-300 mb-4">
          <p className="text-sm text-gray-200 line-clamp-3">{description}</p>
        </div>
        <Link 
          to={`/menu/${title.toLowerCase()}`}
          className="inline-flex items-center text-gold hover:text-gold/80 text-sm font-medium mt-2 transition-colors"
        >
          <span>Explore Menu</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CuisineCard;
