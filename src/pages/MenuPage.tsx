
import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ChevronDown, Filter, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useMenuCuisine from '@/hooks/useMenuCuisine'; // Fixed: Changed from named import to default import
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
                  <h2 className="text-xl font-playfair mb-4 text-gold">Search Our Menu</h2>
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
          className="relative min-h-[50vh] bg-gradient-to-b from-black/40 to-black/80 pb-20"
          style={{
            backgroundImage: currentSection ? `url(${currentSection.backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundBlendMode: 'overlay'
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          
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
