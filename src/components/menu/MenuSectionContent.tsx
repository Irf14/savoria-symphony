
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
  
  return (
    <div ref={contentRef} className="container mx-auto px-4 py-10">
      <motion.div
        key={section.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {section.items.map((item: MenuItem) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onHover={onItemHover}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MenuSectionContent;
