
import { useState, useEffect } from 'react';

export function useMenuToggle() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Add/remove body class to prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
      
      // Ensure mobile menu is properly displayed without automatically closing
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = `-${window.scrollY}px`; // Prevent content jump
    } else {
      const scrollY = document.body.style.top;
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    // Clean up function
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
}
