
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { cuisines } from '@/data/cuisineData';
import { venues } from '@/data/venueData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const isActive = (path: string) => {
    // Special case for menu pages
    if (path.startsWith('/menu') && location.pathname.startsWith('/menu')) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/2f779999-3096-48c9-ba52-fac9c216bfce.png" 
            alt="SAVORIA" 
            className="h-10 object-contain"
          />
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex">
            <NavigationMenuItem>
              <Link to="/">
                <Button variant="ghost" className={cn(
                  "text-white hover:text-gold hover:bg-transparent",
                  isActive('/') && "text-gold font-medium"
                )}>
                  Home
                </Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "bg-transparent hover:bg-transparent text-white hover:text-gold",
                isActive('/menu') && "text-gold font-medium"
              )}>
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px] bg-black/90 backdrop-blur-md">
                  <div className="grid grid-cols-2 gap-3">
                    {cuisines.map((cuisine) => (
                      <Link 
                        key={cuisine.id} 
                        to={`/menu/${cuisine.id}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800/50 hover:text-gold focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-base font-medium text-white">{cuisine.name}</div>
                        <p className="line-clamp-2 text-sm text-white/70">
                          {cuisine.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/gallery">
                <Button variant="ghost" className={cn(
                  "text-white hover:text-gold hover:bg-transparent",
                  isActive('/gallery') && "text-gold font-medium"
                )}>
                  Gallery
                </Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(
                "bg-transparent hover:bg-transparent text-white hover:text-gold",
                isActive('/special-venues') && "text-gold font-medium"
              )}>
                Special Venues
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4 md:w-[500px] bg-black/90 backdrop-blur-md">
                  <div className="grid gap-3">
                    {venues.map((venue) => (
                      <Link 
                        key={venue.id} 
                        to={`/special-venues#${venue.id}`}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800/50 hover:text-gold focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-base font-medium text-white">{venue.name}</div>
                        <p className="line-clamp-2 text-sm text-white/70">
                          {venue.shortDescription}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/reservation">
                <Button variant="ghost" className={cn(
                  "text-white hover:text-gold hover:bg-transparent",
                  isActive('/reservation') && "text-gold font-medium"
                )}>
                  Reservation
                </Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/contact">
                <Button variant="ghost" className={cn(
                  "text-white hover:text-gold hover:bg-transparent",
                  isActive('/contact') && "text-gold font-medium"
                )}>
                  Contact
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <Link to="/reservation" className="hidden md:block">
          <Button className="bg-gold hover:bg-gold/90 text-black font-semibold">
            Book a Table
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
