
/**
 * Preloads a list of images and calls back when all are loaded or when timeout occurs
 */
export const preloadImages = (
  imagesToLoad: string[],
  existingCache: Record<string, boolean> = {},
  onComplete: (loadedImages: Record<string, boolean>) => void,
  timeoutDuration = 3000
) => {
  let loadedCount = 0;
  const newImagesLoaded = { ...existingCache };
  
  // If no images to load, complete immediately
  if (imagesToLoad.length === 0) {
    onComplete(newImagesLoaded);
    return;
  }

  const preloadImage = (src: string, index: number) => {
    // If already cached, consider it loaded
    if (existingCache[src]) {
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        onComplete(newImagesLoaded);
      }
      return;
    }
    
    const img = new Image();
    
    // Set a timeout to prevent hanging
    const timeout = setTimeout(() => {
      console.warn(`Image load timeout: ${src}`);
      newImagesLoaded[src] = true;
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        onComplete(newImagesLoaded);
      }
    }, timeoutDuration);
    
    img.onload = () => {
      clearTimeout(timeout);
      newImagesLoaded[src] = true;
      loadedCount++;
      if (loadedCount === imagesToLoad.length) {
        onComplete(newImagesLoaded);
      }
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      console.error(`Failed to load image: ${src}`);
      // Use fallback images
      const fallbacks = [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
        'https://images.unsplash.com/photo-1505253758473-96b7015fcd40',
        'https://images.unsplash.com/photo-1585032226651-759b368d7246'
      ];
      
      // Try a fallback image
      if (index < fallbacks.length) {
        console.log(`Trying fallback image for: ${src}`);
        preloadImage(fallbacks[index], index);
      } else {
        newImagesLoaded[src] = true;
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          onComplete(newImagesLoaded);
        }
      }
    };
    
    img.src = src;
  };
  
  imagesToLoad.forEach((src, index) => preloadImage(src, index));
};
