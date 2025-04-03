
import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useMenuCuisine } from '@/hooks/useMenuCuisine';
import CuisineHero from '@/components/menu/CuisineHero';
import CuisineNavTabs from '@/components/menu/CuisineNavTabs';
import MenuSectionNav from '@/components/menu/MenuSectionNav';
import MenuSectionContent from '@/components/menu/MenuSectionContent';
import LoadingOverlay from '@/components/menu/LoadingOverlay';
import { cuisines } from '@/data/cuisineData';

const MenuPage = () => {
  const { cuisine: cuisineParam } = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const {
    activeCuisine,
    activeSection,
    loadingImages,
    isTransitioning,
    hoveredItemId,
    setActiveSection,
    handleCuisineChange,
    handlePrevCuisine,
    handleNextCuisine,
    getCurrentSection,
    setHoveredItemId
  } = useMenuCuisine(cuisineParam);
  
  // Scroll to top when changing sections
  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  if (!activeCuisine) {
    return (
      <div className="min-h-screen bg-savoria-black text-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const currentSection = getCurrentSection();

  return (
    <div className="min-h-screen bg-savoria-black text-white overflow-hidden">
      <Navbar />
      
      <main className="relative pt-16">
        <LoadingOverlay isLoading={loadingImages} />
        
        <CuisineHero 
          activeCuisine={activeCuisine}
          isTransitioning={isTransitioning}
          onPrevCuisine={handlePrevCuisine}
          onNextCuisine={handleNextCuisine}
        />
        
        <CuisineNavTabs 
          cuisines={cuisines}
          activeCuisine={activeCuisine}
          isTransitioning={isTransitioning}
          onCuisineChange={handleCuisineChange}
        />
        
        <MenuSectionNav 
          sections={activeCuisine.sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        
        <AnimatePresence mode="wait">
          <MenuSectionContent 
            key={activeSection}
            section={currentSection}
            onItemHover={setHoveredItemId}
            contentRef={contentRef}
          />
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
