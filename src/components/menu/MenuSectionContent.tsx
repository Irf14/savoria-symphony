
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
        <p className="text-gray-500 text-lg font-medium">Please select a section</p>
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
        
        {/* Fixed gold divider with proper mobile centering */}
        <div className="flex justify-center">
          <motion.div 
            variants={itemVariants} 
            className="section-gold-divider mx-auto"
            style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,1) 50%, rgba(212,175,55,0.2) 100%)'
            }}
          />
        </div>
        
        <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto font-cormorant text-lg italic">
          {section.description}
        </motion.p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {section.items.map((item: MenuItem) => (
          <motion.div key={item.id} variants={itemVariants}>
            <MenuItemCard
              item={item}
              onHover={onItemHover}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MenuSectionContent;
