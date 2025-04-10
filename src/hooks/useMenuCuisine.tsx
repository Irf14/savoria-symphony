
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CuisineMenu, MenuSection } from '@/types/menu';
import { cuisines } from '@/data/cuisineData';

const useMenuCuisine = (cuisineParam?: string) => {
  const navigate = useNavigate();
  
  // Store cuisines as state for easier updates
  const [allCuisines] = useState<CuisineMenu[]>(cuisines);
  
  // Active cuisine and section state
  const [activeCuisine, setActiveCuisine] = useState<CuisineMenu | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [loadingImages, setLoadingImages] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  
  // Preload images
  useEffect(() => {
    if (!activeCuisine) return;
    
    setLoadingImages(true);
    
    // Preload cuisine background
    const backgroundImage = new Image();
    backgroundImage.src = activeCuisine.backgroundImage || activeCuisine.background || '';
    
    // Preload section images
    const sectionImages = activeCuisine.sections.map(section => {
      const img = new Image();
      img.src = section.backgroundImage;
      return img;
    });
    
    // Wait for all images to load
    Promise.all([
      new Promise(resolve => {
        backgroundImage.onload = resolve;
        backgroundImage.onerror = resolve; // Handle error case
      }),
      ...sectionImages.map(img => new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve; // Handle error case
      }))
    ]).then(() => {
      setLoadingImages(false);
    });
  }, [activeCuisine]);
  
  // Initialize active cuisine from URL param
  useEffect(() => {
    const initialCuisineId = cuisineParam || allCuisines[0]?.id;
    const foundCuisine = allCuisines.find(cuisine => cuisine.id === initialCuisineId);
    
    if (foundCuisine) {
      setActiveCuisine(foundCuisine);
      if (foundCuisine.sections.length > 0) {
        setActiveSection(foundCuisine.sections[0].id);
      }
    } else if (allCuisines.length > 0) {
      setActiveCuisine(allCuisines[0]);
      if (allCuisines[0].sections.length > 0) {
        setActiveSection(allCuisines[0].sections[0].id);
      }
      navigate(`/menu/${allCuisines[0].id}`);
    }
  }, [cuisineParam, allCuisines, navigate]);
  
  // Handle cuisine change
  const handleCuisineChange = (newCuisineId: string) => {
    const newCuisine = allCuisines.find(cuisine => cuisine.id === newCuisineId);
    if (!newCuisine || newCuisine.id === activeCuisine?.id) return;
    
    setIsTransitioning(true);
    setLoadingImages(true);
    
    setTimeout(() => {
      setActiveCuisine(newCuisine);
      if (newCuisine.sections.length > 0) {
        setActiveSection(newCuisine.sections[0].id);
      }
      setIsTransitioning(false);
    }, 300);
    
    navigate(`/menu/${newCuisineId}`);
  };
  
  // Navigation to previous cuisine
  const handlePrevCuisine = () => {
    const currentIndex = allCuisines.findIndex(cuisine => cuisine.id === activeCuisine?.id);
    const prevIndex = currentIndex === 0 ? allCuisines.length - 1 : currentIndex - 1;
    handleCuisineChange(allCuisines[prevIndex].id);
  };
  
  // Navigation to next cuisine
  const handleNextCuisine = () => {
    const currentIndex = allCuisines.findIndex(cuisine => cuisine.id === activeCuisine?.id);
    const nextIndex = currentIndex === allCuisines.length - 1 ? 0 : currentIndex + 1;
    handleCuisineChange(allCuisines[nextIndex].id);
  };
  
  // Get current active section
  const getCurrentSection = (): MenuSection | null => {
    if (!activeCuisine) return null;
    return activeCuisine.sections.find(section => section.id === activeSection) || null;
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
};

export default useMenuCuisine;
