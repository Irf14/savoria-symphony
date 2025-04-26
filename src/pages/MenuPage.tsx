
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronDown, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useMenuCuisine from '@/hooks/useMenuCuisine';
import CuisineHero from '@/components/menu/CuisineHero';
import CuisineNavTabs from '@/components/menu/CuisineNavTabs';
import MenuSectionNav from '@/components/menu/MenuSectionNav';
import MenuSectionContent from '@/components/menu/MenuSectionContent';
import LoadingOverlay from '@/components/menu/LoadingOverlay';
import { cuisines } from '@/data/cuisineData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';

const MenuPage = () => {
  const { cuisine: cuisineParam } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle cuisine selection from search
  const handleCuisineSelect = (cuisineId: string) => {
    setIsSearchOpen(false);
    navigate(`/menu/${cuisineId}`);
    // Using the function from useMenuCuisine
    handleCuisineChange(cuisineId);
  };

  if (!activeCuisine) {
    return (
      <div className="min-h-screen bg-savoria-black text-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const currentSection = getCurrentSection();
  
  // Determine cuisine-specific background class
  const getCuisineBackgroundClass = () => {
    switch (activeCuisine.id) {
      case 'thai':
        return 'cuisine-thai-bg';
      case 'chinese':
        return 'cuisine-chinese-bg';
      case 'indian':
        return 'cuisine-indian-bg';
      case 'bengali':
        return 'cuisine-bengali-bg';
      case 'continental':
        return 'cuisine-continental-bg';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-savoria-black text-white overflow-hidden">
      <Navbar />
      
      <main className="relative pt-16">
        {/* Improved loading overlay */}
        <LoadingOverlay isLoading={loadingImages} />
        
        {/* Enhanced cuisine hero section */}
        <CuisineHero 
          activeCuisine={activeCuisine}
          isTransitioning={isTransitioning}
          onPrevCuisine={handlePrevCuisine}
          onNextCuisine={handleNextCuisine}
        />
        
        {/* Global search & filter bar */}
        <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-lg border-b border-gold/20 py-3 px-4">
          <div className="container mx-auto flex items-center justify-between gap-4">
            {/* Search component */}
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700/80 px-4 py-2 rounded-full border border-zinc-700 transition-all">
                  <Search size={18} className="text-gold" />
                  <span className="text-sm text-zinc-300">Search menu...</span>
                </button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full max-w-screen-lg mx-auto bg-zinc-900 border-gold/20">
                <div className="py-4">
                  <div className="flex items-center justify-center mb-4">
                    <img 
                      src="/lovable-uploads/4299270d-c31d-4824-a46f-62d57b49b12d.png" 
                      alt="SAVORIA" 
                      className="h-12 object-contain"
                    />
                  </div>
                  <Command className="rounded-lg border border-zinc-700 bg-zinc-900">
                    <CommandInput 
                      placeholder="Search dishes or cuisines..." 
                      className="text-white" 
                      onValueChange={handleSearch}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Cuisines">
                        {cuisines.map((cuisine) => (
                          <CommandItem 
                            key={cuisine.id}
                            onSelect={() => handleCuisineSelect(cuisine.id)}
                            className="cursor-pointer"
                          >
                            <span className="text-white">{cuisine.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </SheetContent>
            </Sheet>

            {/* Enhanced cuisine tabs nav - now with proper types */}
            <div className="flex-1">
              <CuisineNavTabs 
                cuisines={cuisines}
                activeCuisine={activeCuisine}
                isTransitioning={isTransitioning}
                onCuisineChange={handleCuisineChange}
              />
            </div>
          </div>
        </div>
        
        {/* Redesigned section navigation */}
        <MenuSectionNav 
          sections={activeCuisine.sections}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        
        {/* Menu content with beautiful animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative min-h-[50vh] pb-20 ${getCuisineBackgroundClass()}`}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
          
          <AnimatePresence mode="sync">
            <MenuSectionContent 
              key={activeSection}
              section={currentSection}
              onItemHover={setHoveredItemId}
              contentRef={contentRef}
            />
          </AnimatePresence>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
