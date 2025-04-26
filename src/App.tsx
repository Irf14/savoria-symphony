
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import GalleryPage from '@/pages/GalleryPage';
import SpecialVenuesPage from '@/pages/SpecialVenuesPage';
import ReservationPage from '@/pages/ReservationPage';
import ContactPage from '@/pages/ContactPage';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:cuisine" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/special-venues" element={<SpecialVenuesPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
