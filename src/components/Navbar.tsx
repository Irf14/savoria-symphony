
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

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
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-savoria-black/90 backdrop-blur-md py-3' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-gold font-playfair text-3xl font-bold tracking-wider">
          SAVORIA
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
      
      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-savoria-black/95 z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 md:hidden',
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
  );
};

export default Navbar;
