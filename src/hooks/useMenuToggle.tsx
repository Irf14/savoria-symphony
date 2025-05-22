
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
      
      // Ensure mobile menu is properly displayed
      setTimeout(() => {
        const mobileMenu = document.querySelector('.fixed.inset-0.bg-savoria-black\\/95.z-40');
        if (mobileMenu) {
          (mobileMenu as HTMLElement).style.display = 'flex';
          (mobileMenu as HTMLElement).style.opacity = '1';
          (mobileMenu as HTMLElement).style.visibility = 'visible';
        }
      }, 10);
    } else {
      document.body.classList.remove('menu-open');
    }

    // Clean up function
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu
  };
}
