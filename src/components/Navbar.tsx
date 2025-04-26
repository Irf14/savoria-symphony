
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Define better types for our navigation items
interface NavLink {
  name: string;
  path: string;
  dropdown?: NavDropdownItem[];
}

interface NavDropdownItem {
  name: string;
  path: string;
  hash?: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
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

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { 
      name: 'Menu',
      path: '/menu',
      dropdown: [
        { name: 'All Cuisines', path: '/menu' },
        { name: 'Thai Cuisine', path: '/menu/thai' },
        { name: 'Indian Cuisine', path: '/menu/indian' },
        { name: 'Chinese Cuisine', path: '/menu/chinese' },
        { name: 'Bengali Cuisine', path: '/menu/bengali' },
        { name: 'Continental Cuisine', path: '/menu/continental' },
      ]
    },
    { name: 'Gallery', path: '/gallery' },
    { 
      name: 'Special Venues', 
      path: '/special-services',
      dropdown: [
        { name: 'Overview', path: '/special-services' },
        { name: 'Ambrosia Hall', path: '/special-services', hash: '#ambrosia' },
        { name: 'Euphoria Hall', path: '/special-services', hash: '#euphoria' },
        { name: 'Majestic Room', path: '/special-services', hash: '#majestic' },
      ]
    },
    { name: 'Reservation', path: '/reservation' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleDropdownToggle = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleDropdownItemClick = (path: string, hash?: string) => {
    setIsOpen(false);
    if (hash) {
      navigate(path + hash);
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <nav
      className={cn(
        'fixed w-full top-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-black/40 backdrop-blur-lg border-b border-gold/10 py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center relative z-10">
          <motion.img 
            src="/lovable-uploads/c66deafa-ac0d-468b-ae58-5882755f77e8.png"
            alt="SAVORIA"
            className="h-12 md:h-14 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <button 
                  className={cn(
                    'nav-link flex items-center px-3 py-2',
                    isActive(link.path) ? 'text-gold' : 'text-white'
                  )}
                  onClick={() => handleDropdownToggle(link.name)}
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span className="font-cormorant text-lg tracking-wide">{link.name}</span>
                  <ChevronDown size={16} className="ml-1 transition-transform duration-300" style={{
                    transform: activeDropdown === link.name ? 'rotate(180deg)' : 'rotate(0deg)'
                  }} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={cn(
                    'nav-link px-3 py-2 font-cormorant text-lg tracking-wide',
                    isActive(link.path) ? 'text-gold' : 'text-white'
                  )}
                >
                  {link.name}
                </Link>
              )}
              
              {/* Dropdown menu */}
              {link.dropdown && (
                <div 
                  className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-zinc-900/95 border border-gold/10 overflow-hidden"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  style={{
                    opacity: activeDropdown === link.name ? 1 : 0,
                    visibility: activeDropdown === link.name ? 'visible' : 'hidden',
                    transform: activeDropdown === link.name ? 'translateY(0)' : 'translateY(-10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease'
                  }}
                >
                  <div className="py-1">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleDropdownItemClick(item.path, item.hash)}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gold/20 transition-colors duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Book a Table button */}
          <Link
            to="/reservation"
            className="bg-gold hover:bg-gold/90 text-black px-5 py-2 rounded text-sm font-medium transition-colors duration-300"
          >
            Book a Table
          </Link>
        </div>
        
        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden text-white p-2 z-50"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-savoria-black/95 z-40 flex flex-col items-center pt-20 pb-10 px-6 md:hidden overflow-auto"
          >
            {navLinks.map((link, index) => (
              <div key={link.name} className="w-full py-3">
                {link.dropdown ? (
                  <div className="w-full">
                    <button 
                      onClick={() => handleDropdownToggle(link.name)}
                      className={cn(
                        "w-full flex items-center justify-between text-2xl font-cormorant tracking-wider py-2",
                        isActive(link.path) ? 'text-gold' : 'text-white'
                      )}
                    >
                      {link.name}
                      <ChevronDown 
                        size={20}
                        className={cn(
                          "transition-transform duration-300",
                          activeDropdown === link.name && "transform rotate-180"
                        )}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 border-l border-gold/30 mt-2 overflow-hidden"
                        >
                          {link.dropdown.map((item) => (
                            <button
                              key={item.name}
                              className="block w-full text-left text-lg font-cormorant py-2 text-gray-300 hover:text-gold"
                              onClick={() => handleDropdownItemClick(item.path, item.hash)}
                            >
                              {item.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block text-2xl font-cormorant tracking-wider py-2",
                      isActive(link.path) ? 'text-gold' : 'text-white'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
                
                {index < navLinks.length - 1 && (
                  <div className="w-16 h-px bg-gold/20 mx-auto my-3" />
                )}
              </div>
            ))}

            {/* Mobile reservation button */}
            <Link
              to="/reservation"
              className="mt-6 bg-gold hover:bg-gold/90 text-black px-10 py-3 text-lg font-medium rounded"
              onClick={() => setIsOpen(false)}
            >
              Reserve Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
