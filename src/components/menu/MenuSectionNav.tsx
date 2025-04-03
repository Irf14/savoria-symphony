
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
    <div className="bg-black/30 border-b border-gold/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <ScrollArea className="w-full">
          <div className="flex justify-center space-x-6 px-2">
            {sections.map((section) => (
              <motion.button
                key={section.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`px-8 py-3 rounded transition-all duration-300 font-cormorant text-xl whitespace-nowrap
                  ${activeSection === section.name 
                    ? 'bg-gold text-savoria-black font-semibold' 
                    : 'bg-black/20 backdrop-blur-sm border border-gold/20 text-white hover:bg-black/40'
                  }`}
                onClick={() => setActiveSection(section.name)}
              >
                {section.name}
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MenuSectionNav;
