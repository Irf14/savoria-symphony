
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
      
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Prevent content jump without using position fixed which causes issues
      document.body.style.overflow = 'hidden';
      document.body.style.top = `-${scrollY}px`;
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      // Restore scroll position
      const scrollY = document.body.dataset.scrollY || '0';
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.top = '';
      
      // Only scroll if we have a stored position
      if (document.body.dataset.scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10));
        delete document.body.dataset.scrollY;
      }
    }

    // Clean up function
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.top = '';
      delete document.body.dataset.scrollY;
    };
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
}
