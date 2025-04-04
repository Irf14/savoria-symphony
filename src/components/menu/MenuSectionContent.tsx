
import React from 'react';
import { motion } from 'framer-motion';
import { MenuSection, MenuItem } from '@/types/menu';
import MenuItemCard from './MenuItemCard';

type MenuSectionContentProps = {
  section: MenuSection | null;
  onItemHover: (id: number | null) => void;
  contentRef: React.RefObject<HTMLDivElement>;
};

const MenuSectionContent = ({ section, onItemHover, contentRef }: MenuSectionContentProps) => {
  if (!section) return null;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div ref={contentRef} className="container mx-auto px-4 py-10 relative z-10">
      <motion.div
        key={section.name}
        variants={container}
        initial="hidden"
        animate="show"
        exit="exit"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {section.items.map((item: MenuItem) => (
          <motion.div key={item.id} variants={item}>
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
