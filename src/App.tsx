
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
import { useState, useEffect } from "react";
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
  const [state] = useState("");
  
  // Add preloading for key images
  useEffect(() => {
    // Preload important images for faster initial loading
    const preloadImages = [
      // Add critical images to preload here
      'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1',
      'https://images.unsplash.com/photo-1559314809-0d155014e29e',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d',
      'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
      'https://images.unsplash.com/photo-1616299915952-04c803388e5f',
      'https://images.unsplash.com/photo-1544025162-d76694265947'
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
