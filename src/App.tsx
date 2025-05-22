
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
import { useEffect } from "react";
import { preloadCriticalImages } from "@/utils/imageUtils";
import "./App.css";

// Configure the queryClient with improved caching for better performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 10 * 60 * 1000, // 10 minutes
      gcTime: 15 * 60 * 1000, // 15 minutes (previously cacheTime)
    },
  },
});

// Important images for preloading - preload more images to reduce jitter
const criticalImages = [
  // Home page hero images
  'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  
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
  'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&q=80',
];

const App = () => {
  // Enhanced preloading for key images with improved reliability
  useEffect(() => {
    // Preload critical images immediately
    preloadCriticalImages(criticalImages);
    
    // Add performance optimizations
    document.addEventListener('DOMContentLoaded', () => {
      // Optimize paint and layout operations
      requestAnimationFrame(() => {
        // Force browser to calculate layout once images are loaded
        document.body.style.visibility = 'visible';
      });
    });
    
    return () => {
      document.removeEventListener('DOMContentLoaded', () => {});
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:cuisine" element={<MenuPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/special-services" element={<SpecialServicesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          <Toaster />
          <Sonner position="bottom-center" closeButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
