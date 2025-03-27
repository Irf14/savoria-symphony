
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import HelperChat from './HelperChat';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Special Venues', path: '/special-services' },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed w-full top-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'backdrop-blur-md py-3 bg-savoria-black/30' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-gold font-playfair text-3xl font-bold tracking-wider">
            <span className="gold-gradient-text">SAVORIA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'nav-link',
                  location.pathname === link.path ? 'text-gold' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Navigation Button */}
          <button className="md:hidden text-white" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu - Fixed position with overflow handling */}
        <div
          className={cn(
            'fixed inset-0 bg-savoria-black/95 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden overflow-auto',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-2xl font-cormorant tracking-wider',
                location.pathname === link.path ? 'text-gold' : 'text-white'
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* How Can I Help Button */}
      <button 
        onClick={() => setShowHelper(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#996515] flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300"
        aria-label="How can I help?"
      >
        <HelpCircle className="text-savoria-black" size={24} />
      </button>

      {/* Helper Agent Modal */}
      {showHelper && <HelperAgent onClose={() => setShowHelper(false)} />}
    </>
  );
};

// Helper Agent Component
const HelperAgent = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="fixed inset-0" onClick={onClose}></div>
      <div 
        className="relative w-full max-w-md h-[600px] max-h-[80vh] rounded-xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <HelperChat onClose={onClose} />
      </div>
    </div>
  );
};

export default Navbar;
