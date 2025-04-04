
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MenuSection } from '@/types/menu';

type MenuSectionNavProps = {
  sections: MenuSection[];
  activeSection: string;
  setActiveSection: (sectionName: string) => void;
};

const MenuSectionNav = ({ sections, activeSection, setActiveSection }: MenuSectionNavProps) => {
  return (
    <div className="bg-black/60 border-b border-gold/20 backdrop-blur-md sticky top-[106px] z-30">
      <div className="container mx-auto px-4 py-4">
        <ScrollArea className="w-full">
          <div className="flex justify-center space-x-4 px-2">
            {sections.map((section) => (
              <motion.button
                key={section.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-8 py-2 rounded-md transition-all duration-300 font-cormorant text-xl whitespace-nowrap
                  ${activeSection === section.name 
                    ? 'text-gold font-semibold' 
                    : 'text-white/80 hover:text-white'
                  }`}
                onClick={() => setActiveSection(section.name)}
              >
                {section.name}
                {activeSection === section.name && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gold"
                    layoutId="activeSectionIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MenuSectionNav;
