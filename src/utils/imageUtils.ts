
/**
 * Preloads critical images for faster initial experience
 * @param imageUrls Array of image URLs to preload
 * @returns Promise that resolves when all images are loaded (or failed)
 */
export const preloadCriticalImages = (imageUrls: string[]): Promise<void> => {
  console.log("Preloading critical images for faster experience...");
  
  // Concurrent image loading with better error handling
  let loadedCount = 0;
  const totalImages = imageUrls.length;
  
  // Return a Promise that resolves when all images are loaded
  return new Promise<void>((resolveAll) => {
    if (imageUrls.length === 0) {
      console.log("No critical images to preload");
      resolveAll();
      return;
    }
    
    const preloadPromises = imageUrls.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src + "&_t=" + new Date().getTime(); // Add cache buster
        
        img.onload = () => {
          loadedCount++;
          console.log(`Image preloaded (${loadedCount}/${totalImages}): ${src.substring(0, 50)}...`);
          resolve();
        };
        
        img.onerror = () => {
          loadedCount++;
          console.error(`Failed to preload image: ${src.substring(0, 50)}...`);
          resolve(); // Still resolve to not block others
        };
      });
    });
    
    // Track overall loading progress
    Promise.all(preloadPromises)
      .then(() => {
        console.log(`Preloaded ${loadedCount}/${totalImages} critical images`);
        resolveAll(); // Resolve the outer promise
      })
      .catch(err => {
        console.error("Image preloading encountered an error:", err);
        resolveAll(); // Resolve anyway to prevent app from breaking
      });
  });
};

/**
 * Preloads images for UI components and tracks loading status
 * @param imageUrls Array of image URLs to preload
 * @param imagesLoaded Current status of loaded images
 * @param onComplete Callback function when all images are loaded
 */
export const preloadImages = (
  imageUrls: string[],
  imagesLoaded: Record<string, boolean>,
  onComplete: (newImagesLoaded: Record<string, boolean>) => void
) => {
  console.log(`Preloading ${imageUrls.length} component images...`);
  
  const newImagesLoaded = { ...imagesLoaded };
  let loadedCount = 0;
  
  // Handle case of empty image array
  if (imageUrls.length === 0) {
    onComplete(newImagesLoaded);
    return;
  }
  
  imageUrls.forEach(src => {
    // Skip already loaded images
    if (newImagesLoaded[src]) {
      loadedCount++;
      
      // If all images are already loaded, call the callback
      if (loadedCount === imageUrls.length) {
        console.log(`All ${loadedCount} images already loaded`);
        onComplete(newImagesLoaded);
      }
      return;
    }
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      loadedCount++;
      newImagesLoaded[src] = true;
      console.log(`Component image loaded (${loadedCount}/${imageUrls.length}): ${src.substring(0, 50)}...`);
      
      if (loadedCount === imageUrls.length) {
        console.log(`All ${loadedCount} component images loaded successfully`);
        onComplete(newImagesLoaded);
      }
    };
    
    img.onerror = () => {
      loadedCount++;
      console.error(`Failed to load component image: ${src.substring(0, 50)}...`);
      
      // Mark as loaded even on error to prevent blocking
      newImagesLoaded[src] = true;
      
      if (loadedCount === imageUrls.length) {
        onComplete(newImagesLoaded);
      }
    };
  });
};

/**
 * Adds optimization parameters to image URLs
 * @param url Original image URL
 * @param width Target width
 * @param quality Image quality (0-100)
 * @returns Optimized image URL
 */
export const optimizeImage = (url: string, width: number = 800, quality: number = 80): string => {
  if (!url) return '';
  
  // If URL is already from an image CDN or service with optimization parameters
  if (url.includes('?auto=format') || url.includes('&auto=format')) {
    return url;
  }
  
  // If it's an Unsplash image, add optimization parameters
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  
  return url;
};
