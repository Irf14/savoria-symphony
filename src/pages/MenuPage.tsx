
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Types for menu data
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  rating?: number;
  chefsChoice?: boolean;
};

type MenuSection = {
  name: string;
  items: MenuItem[];
  backgroundImage: string;
};

type CuisineMenu = {
  id: string;
  name: string;
  description: string;
  sections: MenuSection[];
  backgroundImage: string;
};

// Sample data for different cuisines with reliable image sources
const cuisines: CuisineMenu[] = [
  {
    id: 'thai',
    name: 'Thai Cuisine',
    description: 'Experience the vibrant flavors of Thailand with our authentic dishes crafted with traditional herbs and spices.',
    backgroundImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        backgroundImage: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=2064&auto=format&fit=crop',
        items: [
          {
            id: 1,
            name: 'Tom Yum Soup',
            description: 'Hot and sour soup with lemongrass, galangal, and Thai herbs',
            price: '12.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 2,
            name: 'Thai Spring Rolls',
            description: 'Crispy rolls filled with vegetables and served with sweet chili sauce',
            price: '9.99',
            rating: 4.5
          },
          {
            id: 3,
            name: 'Satay Chicken',
            description: 'Grilled chicken skewers with peanut sauce and cucumber relish',
            price: '11.99',
            rating: 4.7
          }
        ]
      },
      {
        name: 'Main Course',
        backgroundImage: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 4,
            name: 'Pad Thai',
            description: 'Stir-fried rice noodles with tofu, bean sprouts, peanuts and lime',
            price: '16.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 5,
            name: 'Green Curry',
            description: 'Aromatic curry with coconut milk, Thai eggplant, and sweet basil',
            price: '18.99',
            rating: 4.8
          },
          {
            id: 6,
            name: 'Pineapple Fried Rice',
            description: 'Aromatic rice with pineapple chunks, cashews, and curry powder',
            price: '17.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Desserts',
        backgroundImage: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 7,
            name: 'Mango Sticky Rice',
            description: 'Sweet sticky rice with fresh mango slices and coconut cream',
            price: '9.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 8,
            name: 'Thai Tea Panna Cotta',
            description: 'Creamy panna cotta infused with Thai tea flavors',
            price: '8.99',
            rating: 4.7
          },
          {
            id: 9,
            name: 'Coconut Ice Cream',
            description: 'Homemade coconut ice cream served with crushed peanuts',
            price: '7.99',
            rating: 4.6
          }
        ]
      }
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese Cuisine',
    description: 'Discover the rich culinary traditions of China with our selection of authentic dishes representing various regional styles.',
    backgroundImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2060&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        backgroundImage: 'https://images.unsplash.com/photo-1625938145744-533e82abfaf9?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 10,
            name: 'Dim Sum Platter',
            description: 'Assortment of dumplings including har gow, siu mai, and vegetable dumplings',
            price: '14.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 11,
            name: 'Spring Rolls',
            description: 'Crispy rolls filled with vegetables and shiitake mushrooms',
            price: '9.99',
            rating: 4.5
          },
          {
            id: 12,
            name: 'Hot and Sour Soup',
            description: 'Traditional soup with tofu, bamboo shoots, and wood ear mushrooms',
            price: '8.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Main Course',
        backgroundImage: 'https://images.unsplash.com/photo-1623689043725-b190a3a293b0?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 13,
            name: 'Kung Pao Chicken',
            description: 'Stir-fried chicken with peanuts, vegetables, and dried chili peppers',
            price: '17.99',
            rating: 4.7
          },
          {
            id: 14,
            name: 'Peking Duck',
            description: 'Roasted duck served with thin pancakes, scallions, cucumber, and hoisin sauce',
            price: '32.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 15,
            name: 'Mapo Tofu',
            description: 'Soft tofu in a spicy sauce with minced pork and Sichuan peppercorns',
            price: '15.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Desserts',
        backgroundImage: 'https://images.unsplash.com/photo-1547414368-ac947d00b91d?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 16,
            name: 'Egg Custard Tarts',
            description: 'Flaky pastry shells filled with sweet egg custard',
            price: '6.99',
            rating: 4.7
          },
          {
            id: 17,
            name: 'Tangyuan',
            description: 'Sweet rice balls filled with black sesame paste in ginger syrup',
            price: '7.99',
            rating: 4.6,
            chefsChoice: true
          },
          {
            id: 18,
            name: 'Mango Pudding',
            description: 'Smooth mango-flavored pudding topped with fresh fruit',
            price: '8.99',
            rating: 4.8
          }
        ]
      }
    ]
  },
  {
    id: 'indian',
    name: 'Indian Cuisine',
    description: 'Journey through the diverse culinary landscape of India with our selection of aromatic and flavorful dishes from various regions.',
    backgroundImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2000&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        backgroundImage: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2588&auto=format&fit=crop',
        items: [
          {
            id: 19,
            name: 'Samosa Platter',
            description: 'Crispy pastries filled with spiced potatoes and peas, served with chutneys',
            price: '9.99',
            rating: 4.7
          },
          {
            id: 20,
            name: 'Paneer Tikka',
            description: 'Grilled cottage cheese marinated in yogurt and spices',
            price: '12.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 21,
            name: 'Onion Bhaji',
            description: 'Crispy fritters made with sliced onions and chickpea flour',
            price: '8.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Main Course',
        backgroundImage: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?q=80&w=2136&auto=format&fit=crop',
        items: [
          {
            id: 22,
            name: 'Butter Chicken',
            description: 'Tandoori chicken in a rich tomato and butter sauce with cream',
            price: '18.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 23,
            name: 'Lamb Biryani',
            description: 'Fragrant basmati rice cooked with tender lamb and aromatic spices',
            price: '21.99',
            rating: 4.8
          },
          {
            id: 24,
            name: 'Palak Paneer',
            description: 'Cottage cheese cubes in a creamy spinach sauce',
            price: '16.99',
            rating: 4.7
          }
        ]
      },
      {
        name: 'Desserts',
        backgroundImage: 'https://images.unsplash.com/photo-1589308154028-d591034a4af6?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 25,
            name: 'Gulab Jamun',
            description: 'Soft milk dumplings soaked in rose-flavored sugar syrup',
            price: '6.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 26,
            name: 'Rasmalai',
            description: 'Soft cottage cheese patties in sweetened, cardamom-flavored milk',
            price: '7.99',
            rating: 4.7
          },
          {
            id: 27,
            name: 'Kheer',
            description: 'Creamy rice pudding with cardamom, saffron, and nuts',
            price: '6.99',
            rating: 4.6
          }
        ]
      }
    ]
  },
  {
    id: 'bengali',
    name: 'Bengali Cuisine',
    description: 'Indulge in the subtle yet complex flavors of Bengal, featuring seafood, rice, and distinctive mustard and poppy seed preparations.',
    backgroundImage: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?q=80&w=2069&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        backgroundImage: 'https://images.unsplash.com/photo-1603099080016-5ee7be05c186?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 28,
            name: 'Beguni',
            description: 'Crispy eggplant fritters coated in gram flour batter',
            price: '7.99',
            rating: 4.5
          },
          {
            id: 29,
            name: 'Phuchka',
            description: 'Hollow crispy puris filled with spiced potatoes and tangy water',
            price: '8.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 30,
            name: 'Fish Chop',
            description: 'Spiced fish cakes with potato and panko coating',
            price: '10.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Main Course',
        backgroundImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 31,
            name: 'Ilish Bhapa',
            description: 'Steamed hilsa fish in a mustard and coconut sauce',
            price: '24.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 32,
            name: 'Kosha Mangsho',
            description: 'Slow-cooked Bengali mutton curry with aromatic spices',
            price: '22.99',
            rating: 4.8
          },
          {
            id: 33,
            name: 'Chingri Malaikari',
            description: 'Prawns cooked in a creamy coconut sauce with spices',
            price: '23.99',
            rating: 4.7
          }
        ]
      },
      {
        name: 'Desserts',
        backgroundImage: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop',
        items: [
          {
            id: 34,
            name: 'Rasgulla',
            description: 'Spongy cottage cheese balls soaked in light sugar syrup',
            price: '6.99',
            rating: 4.7
          },
          {
            id: 35,
            name: 'Mishti Doi',
            description: 'Sweetened yogurt dessert with caramelized flavor',
            price: '5.99',
            rating: 4.6
          },
          {
            id: 36,
            name: 'Sandesh',
            description: 'Delicate Bengali sweet made from paneer with cardamom',
            price: '7.99',
            rating: 4.8,
            chefsChoice: true
          }
        ]
      }
    ]
  },
  {
    id: 'continental',
    name: 'Continental Cuisine',
    description: 'Experience classic European flavors with our carefully crafted Continental dishes representing the finest culinary traditions from across Europe.',
    backgroundImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        backgroundImage: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 37,
            name: 'Escargot',
            description: 'Snails baked with garlic herb butter, served with baguette',
            price: '14.99',
            rating: 4.6
          },
          {
            id: 38,
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil with balsamic reduction',
            price: '12.99',
            rating: 4.7,
            chefsChoice: true
          },
          {
            id: 39,
            name: 'Beef Carpaccio',
            description: 'Thinly sliced raw beef with capers, arugula, and parmesan',
            price: '15.99',
            rating: 4.8
          }
        ]
      },
      {
        name: 'Main Course',
        backgroundImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop',
        items: [
          {
            id: 40,
            name: 'Beef Wellington',
            description: 'Filet mignon wrapped in puff pastry with mushroom duxelles',
            price: '38.99',
            rating: 4.9,
            chefsChoice: true
          },
          {
            id: 41,
            name: 'Coq au Vin',
            description: 'Chicken braised with wine, bacon, mushrooms, and garlic',
            price: '26.99',
            rating: 4.7
          },
          {
            id: 42,
            name: 'Risotto ai Funghi',
            description: 'Creamy Arborio rice with wild mushrooms and Parmesan',
            price: '22.99',
            rating: 4.6
          }
        ]
      },
      {
        name: 'Desserts',
        backgroundImage: 'https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=2068&auto=format&fit=crop',
        items: [
          {
            id: 43,
            name: 'Crème Brûlée',
            description: 'Classic vanilla custard with a caramelized sugar crust',
            price: '9.99',
            rating: 4.8,
            chefsChoice: true
          },
          {
            id: 44,
            name: 'Tiramisu',
            description: 'Espresso-soaked ladyfingers with mascarpone cream',
            price: '8.99',
            rating: 4.7
          },
          {
            id: 45,
            name: 'Apple Tarte Tatin',
            description: 'Caramelized upside-down apple tart with crème fraîche',
            price: '10.99',
            rating: 4.6
          }
        ]
      }
    ]
  }
];

const MenuPage = () => {
  const { cuisine: cuisineParam } = useParams();
  const [activeCuisine, setActiveCuisine] = useState<CuisineMenu | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [loadingImages, setLoadingImages] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top when changing sections
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);
  
  // Preload critical images with enhanced loading
  useEffect(() => {
    // Find the cuisine from the URL parameter or default to Thai
    const selectedCuisine = cuisineParam 
      ? cuisines.find(c => c.id === cuisineParam) 
      : cuisines[0];
    
    if (selectedCuisine) {
      setActiveCuisine(selectedCuisine);
      setActiveSection(selectedCuisine.sections[0].name);
      
      // Preload background image and section images
      const imagesToLoad = [
        selectedCuisine.backgroundImage,
        ...selectedCuisine.sections.map(section => section.backgroundImage)
      ];
      
      let loadedCount = 0;
      const newImagesLoaded = {...imagesLoaded};
      
      const preloadImage = (src: string, index: number) => {
        const img = new Image();
        
        // Set a timeout to prevent hanging
        const timeout = setTimeout(() => {
          console.warn(`Image load timeout: ${src}`);
          newImagesLoaded[src] = true;
          loadedCount++;
          if (loadedCount === imagesToLoad.length) {
            setLoadingImages(false);
            setImagesLoaded(newImagesLoaded);
          }
        }, 3000);
        
        img.onload = () => {
          clearTimeout(timeout);
          newImagesLoaded[src] = true;
          loadedCount++;
          if (loadedCount === imagesToLoad.length) {
            setLoadingImages(false);
            setImagesLoaded(newImagesLoaded);
          }
        };
        
        img.onerror = () => {
          clearTimeout(timeout);
          console.error(`Failed to load image: ${src}`);
          // Use fallback images
          const fallbacks = [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
            'https://images.unsplash.com/photo-1505253758473-96b7015fcd40',
            'https://images.unsplash.com/photo-1585032226651-759b368d7246'
          ];
          
          // Try a fallback image
          if (index < fallbacks.length) {
            console.log(`Trying fallback image for: ${src}`);
            preloadImage(fallbacks[index], index);
          } else {
            newImagesLoaded[src] = true;
            loadedCount++;
            if (loadedCount === imagesToLoad.length) {
              setLoadingImages(false);
              setImagesLoaded(newImagesLoaded);
            }
          }
        };
        
        img.src = src;
      };
      
      imagesToLoad.forEach((src, index) => preloadImage(src, index));
    }
  }, [cuisineParam]);

  // Handle cuisine changes with improved transitions
  const handleCuisineChange = (newCuisineId: string) => {
    if (activeCuisine?.id === newCuisineId || isTransitioning) return;
    
    setIsTransitioning(true);
    setLoadingImages(true);
    
    const newCuisine = cuisines.find(c => c.id === newCuisineId);
    
    if (newCuisine) {
      // Set a timeout to ensure we don't wait too long
      const transitionTimeout = setTimeout(() => {
        setActiveCuisine(newCuisine);
        setActiveSection(newCuisine.sections[0].name);
        setLoadingImages(false);
        setIsTransitioning(false);
      }, 1500);
      
      // Preload critical images before showing cuisine
      const imagesToLoad = [
        newCuisine.backgroundImage,
        ...newCuisine.sections.map(section => section.backgroundImage)
      ];
      
      let loadedCount = 0;
      const newImagesLoaded = {...imagesLoaded};
      
      const preloadImage = (src: string) => {
        // If already cached, consider it loaded
        if (imagesLoaded[src]) {
          loadedCount++;
          if (loadedCount === imagesToLoad.length) {
            clearTimeout(transitionTimeout);
            setActiveCuisine(newCuisine);
            setActiveSection(newCuisine.sections[0].name);
            setLoadingImages(false);
            setIsTransitioning(false);
          }
          return;
        }
        
        const img = new Image();
        
        img.onload = () => {
          newImagesLoaded[src] = true;
          loadedCount++;
          if (loadedCount === imagesToLoad.length) {
            clearTimeout(transitionTimeout);
            setActiveCuisine(newCuisine);
            setActiveSection(newCuisine.sections[0].name);
            setLoadingImages(false);
            setIsTransitioning(false);
            setImagesLoaded(newImagesLoaded);
          }
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          newImagesLoaded[src] = true;
          loadedCount++;
          if (loadedCount === imagesToLoad.length) {
            clearTimeout(transitionTimeout);
            setActiveCuisine(newCuisine);
            setActiveSection(newCuisine.sections[0].name);
            setLoadingImages(false);
            setIsTransitioning(false);
            setImagesLoaded(newImagesLoaded);
          }
        };
        
        img.src = src;
      };
      
      // Start preloading all images
      imagesToLoad.forEach(preloadImage);
      
      // Update URL without page reload
      window.history.pushState({}, '', `/menu/${newCuisineId}`);
    }
  };

  // Get the current section
  const getCurrentSection = () => {
    if (!activeCuisine) return null;
    return activeCuisine.sections.find(section => section.name === activeSection);
  };

  // Handle menu item hover for rating display
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  if (!activeCuisine) {
    return (
      <div className="min-h-screen bg-savoria-black text-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  const currentSection = getCurrentSection();

  // Render star ratings
  const renderStarRating = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-gold">★</span>);
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-gold">★</span>);
    }
    
    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gold/30">★</span>);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-savoria-black text-white overflow-hidden">
      <Navbar />
      
      <main className="relative pt-16">
        {/* Loading overlay with improved animation */}
        {loadingImages && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="loader"></div>
          </div>
        )}
        
        {/* Hero section with cuisine background */}
        <motion.div 
          key={`hero-${activeCuisine.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${activeCuisine.backgroundImage})`,
          }}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Cuisine navigation arrows */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full 
                      backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all z-10"
            onClick={() => {
              if (isTransitioning) return;
              const currentIndex = cuisines.findIndex(c => c.id === activeCuisine.id);
              const prevIndex = (currentIndex - 1 + cuisines.length) % cuisines.length;
              handleCuisineChange(cuisines[prevIndex].id);
            }}
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 p-2 rounded-full 
                      backdrop-blur-md border border-white/10 hover:bg-black/50 transition-all z-10"
            onClick={() => {
              if (isTransitioning) return;
              const currentIndex = cuisines.findIndex(c => c.id === activeCuisine.id);
              const nextIndex = (currentIndex + 1) % cuisines.length;
              handleCuisineChange(cuisines[nextIndex].id);
            }}
          >
            <ChevronRight size={24} className="text-white" />
          </button>
          
          <div className="container mx-auto px-4 relative z-10 text-center py-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-playfair text-5xl md:text-7xl font-bold mb-6 gold-gradient-text"
            >
              {activeCuisine.name}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-cormorant text-xl md:text-2xl max-w-3xl mx-auto"
            >
              {activeCuisine.description}
            </motion.p>
          </div>
        </motion.div>
        
        {/* Cuisine navigation tabs */}
        <div className="sticky top-0 z-30 bg-black/40 backdrop-blur-lg shadow-lg py-2 border-t border-b border-gold/20">
          <div className="container mx-auto px-4">
            <ScrollArea className="w-full">
              <div className="flex py-2 px-2">
                {cuisines.map((cuisine) => (
                  <motion.button
                    key={cuisine.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`mx-2 px-5 py-2 font-cormorant text-lg rounded-sm transition-all duration-300 whitespace-nowrap
                      ${activeCuisine.id === cuisine.id 
                        ? 'bg-gold text-savoria-black font-semibold' 
                        : 'text-white hover:bg-white/10'
                      }`}
                    onClick={() => {
                      if (isTransitioning) return;
                      handleCuisineChange(cuisine.id);
                    }}
                  >
                    {cuisine.name}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        {/* Menu section navigation */}
        <div className="bg-black/30 border-b border-gold/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <ScrollArea className="w-full">
              <div className="flex justify-center space-x-6 px-2">
                {activeCuisine.sections.map((section) => (
                  <motion.button
                    key={section.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-8 py-3 rounded transition-all duration-300 font-cormorant text-xl whitespace-nowrap
                      ${activeSection === section.name 
                        ? 'bg-gold text-savoria-black font-semibold' 
                        : 'bg-black/20 backdrop-blur-sm border border-gold/20 text-white hover:bg-black/40'
                      }`}
                    onClick={() => setActiveSection(section.name)}
                  >
                    {section.name}
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
        
        {/* Menu section content */}
        <div ref={contentRef} className="container mx-auto px-4 py-10">
          {currentSection && (
            <motion.div
              key={currentSection.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {currentSection.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (item.id % 6) }}
                  className="glass-card p-6 rounded-lg relative overflow-hidden group"
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                >
                  {/* Chef's choice badge */}
                  {item.chefsChoice && (
                    <div className="absolute top-3 right-3 bg-gold text-savoria-black text-xs font-bold px-2 py-1 rounded-full z-10 gold-pulse">
                      CHEF'S CHOICE
                    </div>
                  )}
                  
                  <h3 className="text-xl font-playfair font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-300 mb-3 font-cormorant text-base">{item.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gold text-lg font-bold">${item.price}</span>
                    {renderStarRating(item.rating)}
                  </div>
                  
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
