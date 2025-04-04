
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import SpecialServicesPage from "./pages/SpecialServicesPage";
import ReservationPage from "./pages/ReservationPage";
import NotFound from "./pages/NotFound";
import ChatAssistant from "@/components/ChatAssistant";
import { useEffect } from "react";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  // Enhanced preloading for key images with improved reliability
  useEffect(() => {
    // Preload important images for faster initial loading
    const preloadImages = [
      // Home page images
      'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600314731229-d6149d4e5f9e?auto=format&fit=crop&q=80',
      // Menu page images
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
      // Gallery images
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1585937421612-70a008356c36?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80',
      // Food images
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80'
    ];
    
    console.log("Preloading critical images for faster experience...");
    
    // Concurrent image loading with better error handling
    let loadedCount = 0;
    const totalImages = preloadImages.length;
    
    const preloadPromises = preloadImages.map((src, index) => {
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
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:cuisine" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/special-services" element={<SpecialServicesPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
