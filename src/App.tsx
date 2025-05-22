
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
import "./App.css";
import "./styles/mobile.css";

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

const App = () => {
  // Simple preloading for critical images
  useEffect(() => {
    // Load critical CSS first
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/mobile.css';
    document.head.appendChild(link);
    
    // Add performance optimizations
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(() => {
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
