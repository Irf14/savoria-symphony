
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Mock data for menu items
const menuData = {
  thai: [
    {
      id: 1,
      name: 'Tom Yum Goong',
      description: 'Spicy and sour shrimp soup with lemongrass, lime leaves, and chilies',
      price: 18,
      image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Soups',
    },
    {
      id: 2,
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and crushed peanuts',
      price: 22,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
    {
      id: 3,
      name: 'Green Curry',
      description: 'Rich coconut curry with eggplant, bamboo shoots, and choice of protein',
      price: 26,
      image: 'https://images.unsplash.com/photo-1624781748172-7151704a42e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
  ],
  chinese: [
    {
      id: 1,
      name: 'Peking Duck',
      description: 'Crispy roasted duck served with thin pancakes, scallions, cucumber, and hoisin sauce',
      price: 34,
      image: 'https://images.unsplash.com/photo-1582883496181-b2bd0a86dd1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      category: 'House Specialties',
    },
    {
      id: 2,
      name: 'Dim Sum Platter',
      description: 'Assortment of steamed dumplings, buns, and rolls with dipping sauces',
      price: 28,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
      category: 'Appetizers',
    },
    {
      id: 3,
      name: 'Kung Pao Chicken',
      description: 'Spicy stir-fried chicken with peanuts, vegetables, and chilies',
      price: 24,
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
  ],
  indian: [
    {
      id: 1,
      name: 'Butter Chicken',
      description: 'Tender chicken in a rich tomato, butter, and cream sauce',
      price: 26,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
    {
      id: 2,
      name: 'Biryani',
      description: 'Fragrant basmati rice cooked with aromatic spices and layered with meat',
      price: 28,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
      category: 'Rice Specialties',
    },
    {
      id: 3,
      name: 'Paneer Tikka',
      description: 'Marinated and grilled cottage cheese with bell peppers and onions',
      price: 22,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2017&q=80',
      category: 'Appetizers',
    },
  ],
  bengali: [
    {
      id: 1,
      name: 'Ilish Bhapa',
      description: 'Steamed hilsa fish with mustard paste, coconut, and green chilies',
      price: 32,
      image: 'https://plus.unsplash.com/premium_photo-1663853051825-5db9554de1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Seafood',
    },
    {
      id: 2,
      name: 'Kosha Mangsho',
      description: 'Slow-cooked mutton in a rich and spicy gravy',
      price: 30,
      image: 'https://images.unsplash.com/photo-1689195806771-9c969b09f4ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
    {
      id: 3,
      name: 'Chingri Malai Curry',
      description: 'Prawns cooked in a creamy coconut sauce with subtle spices',
      price: 34,
      image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Seafood',
    },
  ],
  continental: [
    {
      id: 1,
      name: 'Beef Wellington',
      description: 'Tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto',
      price: 42,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Course',
    },
    {
      id: 2,
      name: 'Lobster Thermidor',
      description: 'Lobster with egg yolks and brandy, cooked and served in its shell',
      price: 48,
      image: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2178&q=80',
      category: 'Seafood',
    },
    {
      id: 3,
      name: 'Coq au Vin',
      description: 'Chicken braised with wine, mushrooms, bacon, and garlic',
      price: 36,
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
      category: 'Main Course',
    },
  ],
};

const cuisineInfo = {
  thai: {
    name: 'Thai Cuisine',
    description: 'Experience the harmonious blend of sweet, sour, salty, and spicy flavors that define authentic Thai cuisine.',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    theme: 'theme-thai',
  },
  chinese: {
    name: 'Chinese Cuisine',
    description: 'Discover the rich culinary traditions of China, where balance, color, and flavor create a harmonious dining experience.',
    image: 'https://images.unsplash.com/photo-1583032937544-8e7b179a5f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    theme: 'theme-chinese',
  },
  indian: {
    name: 'Indian Cuisine',
    description: 'Indulge in the aromatic spices and diverse regional flavors that make Indian cuisine one of the most celebrated in the world.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    theme: 'theme-indian',
  },
  bengali: {
    name: 'Bengali Cuisine',
    description: 'Savor the subtle yet complex flavors of Bengal, where seafood, rice, and mustard create a distinctive culinary identity.',
    image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    theme: 'theme-bengali',
  },
  continental: {
    name: 'Continental Cuisine',
    description: 'Experience the refined elegance of European culinary traditions, where technique and quality ingredients take center stage.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    theme: 'theme-continental',
  },
};

const cuisineTypes = Object.keys(menuData) as Array<keyof typeof menuData>;

const MenuPage = () => {
  const { cuisine = 'thai' } = useParams<{ cuisine: keyof typeof menuData }>();
  const navigate = useNavigate();
  const [selectedCuisine, setSelectedCuisine] = useState<keyof typeof menuData>(
    cuisineTypes.includes(cuisine as keyof typeof menuData) ? cuisine as keyof typeof menuData : 'thai'
  );
  
  useEffect(() => {
    if (cuisineTypes.includes(cuisine as keyof typeof menuData)) {
      setSelectedCuisine(cuisine as keyof typeof menuData);
      
      // Add theme class to body
      document.body.className = cuisineInfo[cuisine as keyof typeof menuData].theme;
    } else {
      navigate('/menu/thai');
    }
    
    // Scroll to top when cuisine changes
    window.scrollTo(0, 0);
    
    // Cleanup function to remove theme class
    return () => {
      document.body.className = '';
    };
  }, [cuisine, navigate]);
  
  const handleCuisineChange = (cuisine: keyof typeof menuData) => {
    navigate(`/menu/${cuisine}`);
  };
  
  const currentCuisineInfo = cuisineInfo[selectedCuisine];
  const menuItems = menuData[selectedCuisine];
  
  return (
    <div className={`min-h-screen ${currentCuisineInfo.theme}`}>
      <Navbar />
      
      <section className="pt-24 pb-12 relative">
        <div 
          className="absolute inset-0 z-0 bg-black opacity-60"
          style={{
            backgroundImage: `url(${currentCuisineInfo.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentCuisineInfo.name}
            </motion.h1>
            
            <motion.p 
              className="text-gray-200 text-lg md:text-xl font-cormorant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentCuisineInfo.description}
            </motion.p>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {cuisineTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleCuisineChange(type)}
                className={cn(
                  'px-6 py-2 rounded-sm font-cormorant text-lg transition-colors',
                  selectedCuisine === type
                    ? 'bg-gold text-savoria-black'
                    : 'bg-transparent border border-gold/50 text-gold hover:bg-gold/10'
                )}
              >
                {cuisineInfo[type].name.split(' ')[0]}
              </button>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            {menuItems.map((item, index) => (
              <motion.div 
                key={item.id}
                className="menu-item grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="md:col-span-1">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-32 md:h-48 object-cover rounded-md"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-playfair text-xl font-semibold text-white">{item.name}</h3>
                    <span className="text-gold font-cormorant text-xl">${item.price}</span>
                  </div>
                  <p className="text-gray-300 mb-2 font-cormorant">{item.description}</p>
                  <span className="text-gold/80 text-sm">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
