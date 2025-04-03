
import { useState, useEffect } from 'react';
import { CuisineMenu, MenuSection } from '@/types/menu';
import { cuisines } from '@/data/cuisineData';
import { preloadImages } from '@/utils/imageUtils';

export function useMenuCuisine(cuisineParam: string | undefined) {
  const [activeCuisine, setActiveCuisine] = useState<CuisineMenu | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [loadingImages, setLoadingImages] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  // Initialize with the selected cuisine
  useEffect(() => {
    // Find the cuisine from the URL parameter or default to Thai
    const selectedCuisine = cuisineParam 
      ? cuisines.find(c => c.id === cuisineParam) 
      : cuisines[0];
    
    if (selectedCuisine) {
      setActiveCuisine(selectedCuisine);
      setActiveSection(selectedCuisine.sections[0].name);
      
      // Preload background image and section images
      const imagesToLoad = [
        selectedCuisine.backgroundImage,
        ...selectedCuisine.sections.map(section => section.backgroundImage)
      ];
      
      preloadImages(
        imagesToLoad, 
        imagesLoaded, 
        (newImagesLoaded) => {
          setLoadingImages(false);
          setImagesLoaded(newImagesLoaded);
        }
      );
    }
  }, [cuisineParam]);

  // Handle cuisine changes with improved transitions
  const handleCuisineChange = (newCuisineId: string) => {
    if (activeCuisine?.id === newCuisineId || isTransitioning) return;
    
    setIsTransitioning(true);
    setLoadingImages(true);
    
    const newCuisine = cuisines.find(c => c.id === newCuisineId);
    
    if (newCuisine) {
      // Set a timeout to ensure we don't wait too long
      const transitionTimeout = setTimeout(() => {
        setActiveCuisine(newCuisine);
        setActiveSection(newCuisine.sections[0].name);
        setLoadingImages(false);
        setIsTransitioning(false);
      }, 1500);
      
      // Preload critical images before showing cuisine
      const imagesToLoad = [
        newCuisine.backgroundImage,
        ...newCuisine.sections.map(section => section.backgroundImage)
      ];
      
      preloadImages(
        imagesToLoad, 
        imagesLoaded, 
        (newImagesLoaded) => {
          clearTimeout(transitionTimeout);
          setActiveCuisine(newCuisine);
          setActiveSection(newCuisine.sections[0].name);
          setLoadingImages(false);
          setIsTransitioning(false);
          setImagesLoaded(newImagesLoaded);
        }
      );
      
      // Update URL without page reload
      window.history.pushState({}, '', `/menu/${newCuisineId}`);
    }
  };

  // Navigate to previous cuisine
  const handlePrevCuisine = () => {
    if (!activeCuisine || isTransitioning) return;
    const currentIndex = cuisines.findIndex(c => c.id === activeCuisine.id);
    const prevIndex = (currentIndex - 1 + cuisines.length) % cuisines.length;
    handleCuisineChange(cuisines[prevIndex].id);
  };

  // Navigate to next cuisine
  const handleNextCuisine = () => {
    if (!activeCuisine || isTransitioning) return;
    const currentIndex = cuisines.findIndex(c => c.id === activeCuisine.id);
    const nextIndex = (currentIndex + 1) % cuisines.length;
    handleCuisineChange(cuisines[nextIndex].id);
  };

  // Get the current section
  const getCurrentSection = (): MenuSection | null => {
    if (!activeCuisine) return null;
    return activeCuisine.sections.find(section => section.name === activeSection) || null;
  };

  return {
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
  };
}
