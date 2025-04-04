
/**
 * Preloads critical images for faster initial experience
 * @param imageUrls Array of image URLs to preload
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  console.log("Preloading critical images for faster experience...");
  
  // Concurrent image loading with better error handling
  let loadedCount = 0;
  const totalImages = imageUrls.length;
  
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
        console.error(`Failed to preload image: ${src.substring(0, 50)}...`);
        resolve(); // Still resolve to not block others
      };
    });
  });
  
  // Track overall loading progress
  Promise.all(preloadPromises)
    .then(() => console.log(`Preloaded ${loadedCount}/${totalImages} critical images`))
    .catch(err => console.error("Image preloading encountered an error:", err));
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
