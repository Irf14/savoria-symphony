import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define cuisine types and their details
const cuisines = {
  thai: {
    name: 'Thai',
    background: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    intro: 'Experience the vibrant flavors of Thailand with our authentic dishes crafted with traditional herbs and spices.',
    color: 'theme-thai',
    gradient: 'bg-thai-gradient',
    categoryBackgrounds: {
      appetizers: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      mainCourse: 'https://images.unsplash.com/photo-1562167125-ce4c0ec88433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      desserts: 'https://images.unsplash.com/photo-1561295089-95d8eb3503fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80'
    }
  },
  chinese: {
    name: 'Chinese',
    background: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    intro: 'Discover the rich culinary heritage of China through our carefully selected dishes representing various regions.',
    color: 'theme-chinese',
    gradient: 'bg-chinese-gradient',
    categoryBackgrounds: {
      appetizers: 'https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      mainCourse: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2115&q=80',
      desserts: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2327&q=80'
    }
  },
  indian: {
    name: 'Indian',
    background: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    intro: 'Indulge in the aromatic spices and complex flavors of India with our authentic recipes passed down through generations.',
    color: 'theme-indian',
    gradient: 'bg-indian-gradient',
    categoryBackgrounds: {
      appetizers: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      mainCourse: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2036&q=80',
      desserts: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  },
  bengali: {
    name: 'Bengali',
    background: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    intro: 'Sample the subtle yet distinctive flavors of Bengal, where seafood, rice, and mustard come together in perfect harmony.',
    color: 'theme-bengali',
    gradient: 'bg-bengali-gradient',
    categoryBackgrounds: {
      appetizers: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      mainCourse: 'https://images.unsplash.com/photo-1589538539809-8531b89c6b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      desserts: 'https://images.unsplash.com/photo-1589227365533-c092a871e862?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  },
  continental: {
    name: 'Continental',
    background: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    intro: 'Enjoy the refined flavors of Europe with our selection of classic Continental dishes prepared with a modern twist.',
    color: 'theme-continental',
    gradient: 'bg-continental-gradient',
    categoryBackgrounds: {
      appetizers: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      mainCourse: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      desserts: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
    }
  },
};

// Menu data structure
const menuData = {
  thai: {
    appetizers: [
      { id: 1, name: 'Tom Yum Soup', description: 'Hot and sour soup with lemongrass, galangal, and Thai herbs', price: 12.99, rating: 4.8, isChefRecommended: true },
      { id: 2, name: 'Thai Spring Rolls', description: 'Crispy rolls filled with vegetables and served with sweet chili sauce', price: 9.99, rating: 4.5, isChefRecommended: false },
      { id: 3, name: 'Satay Skewers', description: 'Grilled chicken skewers marinated in Thai spices, served with peanut sauce', price: 11.99, rating: 4.7, isChefRecommended: true },
    ],
    mainCourse: [
      { id: 4, name: 'Pad Thai', description: 'Stir-fried rice noodles with egg, tofu, bean sprouts, and crushed peanuts', price: 18.99, rating: 4.9, isChefRecommended: true },
      { id: 5, name: 'Green Curry', description: 'Aromatic curry with coconut milk, Thai eggplant, and basil leaves', price: 19.99, rating: 4.8, isChefRecommended: true },
      { id: 6, name: 'Mango Sticky Rice', description: 'Sweet glutinous rice with fresh mango and coconut cream', price: 16.99, rating: 4.6, isChefRecommended: false },
    ],
    desserts: [
      { id: 7, name: 'Coconut Ice Cream', description: 'Homemade coconut ice cream with caramelized peanuts', price: 8.99, rating: 4.3, isChefRecommended: false },
      { id: 8, name: 'Thai Tea Panna Cotta', description: 'Creamy Thai tea-flavored panna cotta with condensed milk', price: 9.99, rating: 4.7, isChefRecommended: true },
      { id: 9, name: 'Banana in Coconut Milk', description: 'Warm bananas in sweet coconut milk with tapioca pearls', price: 7.99, rating: 4.4, isChefRecommended: false },
    ],
  },
  chinese: {
    appetizers: [
      { id: 1, name: 'Dim Sum Platter', description: 'Assortment of steamed dumplings with various fillings', price: 14.99, rating: 4.7, isChefRecommended: true },
      { id: 2, name: 'Crispy Spring Rolls', description: 'Crispy rolls filled with vegetables and pork, served with sweet sauce', price: 10.99, rating: 4.6, isChefRecommended: false },
      { id: 3, name: 'Hot and Sour Soup', description: 'Spicy and tangy soup with tofu, mushrooms, and bamboo shoots', price: 11.99, rating: 4.8, isChefRecommended: true },
    ],
    mainCourse: [
      { id: 4, name: 'Kung Pao Chicken', description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers', price: 19.99, rating: 4.9, isChefRecommended: true },
      { id: 5, name: 'Peking Duck', description: 'Roasted duck served with thin pancakes, cucumber, and hoisin sauce', price: 29.99, rating: 5.0, isChefRecommended: true },
      { id: 6, name: 'Mapo Tofu', description: 'Spicy Sichuan tofu dish with minced meat and fermented bean paste', price: 17.99, rating: 4.7, isChefRecommended: false },
    ],
    desserts: [
      { id: 7, name: 'Egg Tarts', description: 'Flaky pastry filled with sweet egg custard', price: 8.99, rating: 4.5, isChefRecommended: false },
      { id: 8, name: 'Mango Pudding', description: 'Smooth mango-flavored pudding topped with fresh fruit', price: 9.99, rating: 4.8, isChefRecommended: true },
      { id: 9, name: 'Red Bean Soup', description: 'Warm sweet soup with red beans and tangerine peel', price: 7.99, rating: 4.4, isChefRecommended: false },
    ],
  },
  indian: {
    appetizers: [
      { id: 1, name: 'Vegetable Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: 9.99, rating: 4.6, isChefRecommended: false },
      { id: 2, name: 'Chicken Tikka', description: 'Tandoor-roasted chicken pieces marinated in yogurt and spices', price: 12.99, rating: 4.8, isChefRecommended: true },
      { id: 3, name: 'Onion Bhaji', description: 'Crispy fritters made with sliced onions and chickpea flour', price: 8.99, rating: 4.5, isChefRecommended: false },
    ],
    mainCourse: [
      { id: 4, name: 'Butter Chicken', description: 'Tender chicken in a rich, creamy tomato sauce with butter', price: 21.99, rating: 4.9, isChefRecommended: true },
      { id: 5, name: 'Lamb Biryani', description: 'Fragrant basmati rice cooked with lamb, spices, and herbs', price: 23.99, rating: 4.8, isChefRecommended: true },
      { id: 6, name: 'Palak Paneer', description: 'Cottage cheese cubes in a pureed spinach gravy with spices', price: 18.99, rating: 4.7, isChefRecommended: false },
    ],
    desserts: [
      { id: 7, name: 'Gulab Jamun', description: 'Soft milk dumplings soaked in rose-flavored sugar syrup', price: 8.99, rating: 4.7, isChefRecommended: true },
      { id: 8, name: 'Kulfi', description: 'Traditional Indian ice cream with pistachios and cardamom', price: 9.99, rating: 4.6, isChefRecommended: false },
      { id: 9, name: 'Rasgulla', description: 'Soft, spongy cheese balls in sugar syrup', price: 7.99, rating: 4.5, isChefRecommended: false },
    ],
  },
  bengali: {
    appetizers: [
      { id: 1, name: 'Fish Fry', description: 'Batter-fried fish fillets marinated in Bengali spices', price: 13.99, rating: 4.7, isChefRecommended: true },
      { id: 2, name: 'Beguni', description: 'Crispy eggplant fritters with chickpea flour coating', price: 8.99, rating: 4.5, isChefRecommended: false },
      { id: 3, name: 'Shukto', description: 'Mixed vegetable stew with bitter gourd and milk', price: 11.99, rating: 4.6, isChefRecommended: false },
    ],
    mainCourse: [
      { id: 4, name: 'Ilish Bhapa', description: 'Steamed hilsa fish with mustard sauce in banana leaf', price: 26.99, rating: 4.9, isChefRecommended: true },
      { id: 5, name: 'Kosha Mangsho', description: 'Slow-cooked spicy mutton curry with potatoes', price: 24.99, rating: 4.8, isChefRecommended: true },
      { id: 6, name: 'Chingri Malai Curry', description: 'Prawns cooked in coconut milk with spices', price: 25.99, rating: 4.8, isChefRecommended: true },
    ],
    desserts: [
      { id: 7, name: 'Mishti Doi', description: 'Sweet yogurt with caramelized flavor', price: 7.99, rating: 4.7, isChefRecommended: true },
      { id: 8, name: 'Sandesh', description: 'Sweet milk cheese fudge with cardamom', price: 9.99, rating: 4.6, isChefRecommended: false },
      { id: 9, name: 'Patishapta', description: 'Thin crepes with coconut and jaggery filling', price: 8.99, rating: 4.5, isChefRecommended: false },
    ],
  },
  continental: {
    appetizers: [
      { id: 1, name: 'French Onion Soup', description: 'Caramelized onion soup with cheese crouton', price: 11.99, rating: 4.6, isChefRecommended: false },
      { id: 2, name: 'Escargot', description: 'Classic French dish of snails with garlic butter', price: 15.99, rating: 4.7, isChefRecommended: true },
      { id: 3, name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze', price: 12.99, rating: 4.5, isChefRecommended: false },
    ],
    mainCourse: [
      { id: 4, name: 'Beef Wellington', description: 'Fillet steak coated with pâté and duxelles in puff pastry', price: 34.99, rating: 4.9, isChefRecommended: true },
      { id: 5, name: 'Coq au Vin', description: 'Chicken braised with wine, mushrooms, and garlic', price: 26.99, rating: 4.8, isChefRecommended: true },
      { id: 6, name: 'Ratatouille', description: 'Provençal vegetable stew with eggplant, zucchini, and tomato', price: 19.99, rating: 4.6, isChefRecommended: false },
    ],
    desserts: [
      { id: 7, name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar topping', price: 10.99, rating: 4.8, isChefRecommended: true },
      { id: 8, name: 'Tiramisu', description: 'Italian dessert with coffee-soaked ladyfingers and mascarpone', price: 11.99, rating: 4.7, isChefRecommended: false },
      { id: 9, name: 'Apple Tarte Tatin', description: 'Upside-down caramelized apple tart', price: 12.99, rating: 4.6, isChefRecommended: false },
    ],
  },
};

const MenuPage = () => {
  const { cuisine } = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('appetizers');
  const [loaded, setLoaded] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Record<string, boolean>>({});
  
  // Validate cuisine parameter
  const validCuisine = cuisine && cuisine in cuisines ? cuisine : 'thai';
  const currentCuisine = cuisines[validCuisine as keyof typeof cuisines];
  const menuItems = menuData[validCuisine as keyof typeof menuData];
  
  const categories = [
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mainCourse', name: 'Main Course' },
    { id: 'desserts', name: 'Desserts' },
  ];
  
  // Handle cuisine navigation
  const handleCuisineChange = (newCuisine: string) => {
    navigate(`/menu/${newCuisine}`);
  };
  
  // Enhanced preloading strategy for all images
  useEffect(() => {
    const preloadAllImages = async () => {
      // Start with loading = false but don't immediately reset background
      setLoaded(false);
      
      // We'll keep the previous background until the new one is ready
      // This creates a smoother transition
      
      // Create a list of all images to preload
      const allBackgrounds = [
        currentCuisine.background,
        currentCuisine.categoryBackgrounds.appetizers,
        currentCuisine.categoryBackgrounds.mainCourse,
        currentCuisine.categoryBackgrounds.desserts
      ];
      
      // Sort the background images so the active category loads first
      const sortedBackgrounds = [
        currentCuisine.categoryBackgrounds[activeCategory as keyof typeof currentCuisine.categoryBackgrounds],
        ...allBackgrounds.filter(bg => 
          bg !== currentCuisine.categoryBackgrounds[activeCategory as keyof typeof currentCuisine.categoryBackgrounds]
        )
      ];
      
      // First, attempt to load the active category background immediately
      const priorityImage = new Image();
      priorityImage.src = sortedBackgrounds[0];
      
      // Set up tracking for which images have loaded
      const newPreloadedStatus: Record<string, boolean> = {...preloadedImages};
      
      // Load the primary image first
      await new Promise<void>(resolve => {
        priorityImage.onload = () => {
          newPreloadedStatus[sortedBackgrounds[0]] = true;
          setBackgroundLoaded(true);
          resolve();
        };
        priorityImage.onerror = () => {
          console.error(`Failed to load priority image: ${sortedBackgrounds[0]}`);
          resolve();
        };
        
        // If image takes too long, continue anyway
        setTimeout(resolve, 1000);
      });
      
      // Then preload all other images in the background
      const remainingImages = sortedBackgrounds.slice(1);
      remainingImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          newPreloadedStatus[src] = true;
          setPreloadedImages({...newPreloadedStatus});
        };
      });
      
      // Mark the page as loaded so content can display
      setLoaded(true);
      setPreloadedImages(newPreloadedStatus);
    };
    
    // Reset category when cuisine changes
    setActiveCategory('appetizers');
    
    // Start preloading
    preloadAllImages();
  }, [cuisine]);
  
  // Update background when category changes
  useEffect(() => {
    if (loaded) {
      const currentBg = currentCuisine.categoryBackgrounds[activeCategory as keyof typeof currentCuisine.categoryBackgrounds];
      
      // Temporarily set backgroundLoaded to false to trigger a fade transition
      setBackgroundLoaded(false);
      
      // Small timeout before loading new background for smoother transition
      setTimeout(() => {
        // If this image was already preloaded, set backgroundLoaded immediately
        if (preloadedImages[currentBg]) {
          setBackgroundLoaded(true);
        } else {
          // If not yet preloaded, try to load it now
          const img = new Image();
          img.src = currentBg;
          img.onload = () => {
            setBackgroundLoaded(true);
            setPreloadedImages(prev => ({ ...prev, [currentBg]: true }));
          };
          
          // If loading takes too long, show anyway after 1 second
          setTimeout(() => {
            if (!backgroundLoaded) {
              setBackgroundLoaded(true);
            }
          }, 1000);
        }
      }, 200);
    }
  }, [activeCategory, loaded, currentCuisine]);
  
  // Get next and previous cuisines for navigation
  const cuisineKeys = Object.keys(cuisines);
  const currentIndex = cuisineKeys.indexOf(validCuisine);
  const prevCuisine = cuisineKeys[(currentIndex - 1 + cuisineKeys.length) % cuisineKeys.length];
  const nextCuisine = cuisineKeys[(currentIndex + 1) % cuisineKeys.length];
  
  // Get current background based on cuisine and active category
  const currentBackground = currentCuisine.categoryBackgrounds[activeCategory as keyof typeof currentCuisine.categoryBackgrounds] || currentCuisine.background;
  
  // Render a single menu item
  const renderMenuItem = (item: any) => (
    <motion.div 
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="menu-item p-6 bg-savoria-black bg-opacity-80 backdrop-blur-sm rounded-lg"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="font-playfair text-2xl text-white mr-3">{item.name}</h3>
            {item.isChefRecommended && (
              <span className="bg-gold text-savoria-black text-xs uppercase tracking-wider px-2 py-1 rounded">
                Chef's Choice
              </span>
            )}
          </div>
          
          <p className="text-gray-300 font-cormorant text-lg mb-2">{item.description}</p>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  size={16}
                  className={`${star <= Math.floor(item.rating) ? 'text-gold' : 'text-gray-500'} ${
                    star === Math.ceil(item.rating) && star > Math.floor(item.rating)
                      ? 'fill-gold/50'
                      : star <= Math.floor(item.rating)
                      ? 'fill-gold'
                      : ''
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm">{item.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="font-playfair text-2xl text-gold mt-4 md:mt-0">
          ${item.price}
        </div>
      </div>
    </motion.div>
  );
  
  return (
    <div className={`min-h-screen ${currentCuisine.color}`}>
      {/* Fallback background to ensure something is always visible */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: `url(${currentCuisine.background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.5
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </div>
      
      {/* Main category background with animation */}
      <AnimatePresence mode="wait">
        {(backgroundLoaded || loaded) && (
          <motion.div 
            key={`${validCuisine}-${activeCategory}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="fixed inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: `url(${currentBackground})`,
              backgroundAttachment: 'fixed',
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* If no background has loaded yet, show a temporary loader */}
      {!backgroundLoaded && !loaded && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-savoria-black bg-opacity-90">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-24">
          {/* Cuisine title and navigation */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => handleCuisineChange(prevCuisine)}
              className="text-gold hover:text-white transition-colors"
              aria-label="Previous cuisine"
            >
              <ChevronLeft size={32} />
            </button>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center font-playfair text-5xl md:text-6xl lg:text-7xl font-bold ${currentCuisine.gradient} bg-clip-text text-transparent`}
            >
              {currentCuisine.name} Cuisine
            </motion.h1>
            
            <button 
              onClick={() => handleCuisineChange(nextCuisine)}
              className="text-gold hover:text-white transition-colors"
              aria-label="Next cuisine"
            >
              <ChevronRight size={32} />
            </button>
          </div>
          
          {/* Cuisine description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-gray-300 max-w-3xl mx-auto font-cormorant text-xl md:text-2xl mb-12"
          >
            {currentCuisine.intro}
          </motion.p>
          
          {/* Category navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-savoria-black bg-opacity-60 backdrop-blur-md rounded-lg p-1.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-md font-cormorant text-lg transition-colors ${
                    activeCategory === category.id
                      ? 'bg-gold text-savoria-black'
                      : 'text-white hover:text-gold'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Menu items */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {loaded ? (
