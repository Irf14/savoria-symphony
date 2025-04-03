
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
  // Add preloading for key images
  useEffect(() => {
    // Preload important images for faster initial loading
    const preloadImages = [
      // Add critical images to preload here
      'https://images.unsplash.com/photo-1511018556340-d16986a1c194',
      'https://images.unsplash.com/photo-1600314731229-d6149d4e5f9e',
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
      'https://images.unsplash.com/photo-1563379926898-05f4575a45d8',
      'https://images.unsplash.com/photo-1585937421612-70a008356c36',
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
      'https://images.unsplash.com/photo-1495195134817-aeb325a55b65'
    ];
    
    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
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
