
import React, { useRef, RefObject } from 'react';
import { MenuSection, MenuItem } from '@/types/menu';
import { motion, Variants } from 'framer-motion';
import MenuItemCard from './MenuItemCard';

interface MenuSectionContentProps {
  section: MenuSection | null;
  onItemHover: (id: number | null) => void;
  contentRef: RefObject<HTMLDivElement>;
}

const MenuSectionContent: React.FC<MenuSectionContentProps> = ({ section, onItemHover, contentRef }) => {
  if (!section) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[500px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Please select a section</p>
      </div>
    );
  }

  // Fixed variants types for TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div ref={contentRef} className="container mx-auto px-4 py-16 relative z-10 overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mb-12 text-center"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-playfair font-bold text-gold mb-4">
          {section.name}
        </motion.h2>
        <motion.div variants={itemVariants} className="w-24 h-0.5 bg-gold/50 mx-auto mb-6" />
        <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto font-cormorant text-lg">
          {section.description}
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {section.items.map((item: MenuItem) => (
          <motion.div key={item.id} variants={itemVariants}>
            <MenuItemCard
              item={item}
              onHover={() => onItemHover(item.id)}
              // Using custom prop for leave functionality
              onMouseLeave={() => onItemHover(null)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MenuSectionContent;
