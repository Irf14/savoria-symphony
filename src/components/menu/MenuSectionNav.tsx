
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
    <div className="bg-black/80 border-b border-gold/20 backdrop-blur-md sticky top-[106px] z-30">
      <div className="container mx-auto px-4 py-4">
        <ScrollArea className="w-full">
          <div className="flex space-x-4 px-2 pb-1">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                className={`relative px-4 md:px-6 py-3 rounded-md transition-all duration-300 font-cormorant text-lg md:text-xl whitespace-nowrap
                  ${activeSection === section.id 
                    ? 'text-gold font-semibold' 
                    : 'text-white/80 hover:text-white'
                  }`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.name}
                {activeSection === section.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 mx-auto w-2/3 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
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
