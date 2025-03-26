
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for menu data
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  vegan?: boolean;
  popular?: boolean;
};

type MenuSection = {
  name: string;
  items: MenuItem[];
  image: string;
};

type CuisineMenu = {
  id: string;
  name: string;
  description: string;
  sections: MenuSection[];
  backgroundImage: string;
};

// Sample data for different cuisines
const cuisines: CuisineMenu[] = [
  {
    id: 'thai',
    name: 'Thai Cuisine',
    description: 'Experience the vibrant flavors and aromatic spices of Thailand, where sweet, sour, salty, and spicy elements create a perfect harmony.',
    backgroundImage: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?q=80&w=2532&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1580824456624-90e15a242caf?q=80&w=2574&auto=format&fit=crop',
        items: [
          {
            id: 1,
            name: 'Tod Mun Pla (Thai Fish Cakes)',
            description: 'Spiced fish cakes with red curry paste, kaffir lime leaves, and green beans served with cucumber relish.',
            price: '12.95',
            image: 'https://images.unsplash.com/photo-1604908176997-125f7c9c7b92?q=80&w=2013&auto=format&fit=crop',
            spicy: true,
            popular: true
          },
          {
            id: 2,
            name: 'Satay Gai',
            description: 'Marinated chicken skewers grilled to perfection, served with peanut sauce and cucumber relish.',
            price: '10.95',
            image: 'https://images.unsplash.com/photo-1616361782121-83e13661e4f6?q=80&w=2080&auto=format&fit=crop',
          },
          {
            id: 3,
            name: 'Som Tum (Green Papaya Salad)',
            description: 'Shredded green papaya mixed with tomatoes, long beans, peanuts in a spicy lime dressing.',
            price: '11.95',
            image: 'https://images.unsplash.com/photo-1626804475297-41608ea09da1?q=80&w=2070&auto=format&fit=crop',
            spicy: true,
            vegetarian: true
          }
        ]
      },
      {
        name: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 4,
            name: 'Pad Thai',
            description: 'Stir-fried rice noodles with egg, tofu, bean sprouts, and crushed peanuts in our house special sauce.',
            price: '16.95',
            image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2070&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 5,
            name: 'Gaeng Keow Wan (Green Curry)',
            description: 'Aromatic green curry with coconut milk, bamboo shoots, Thai eggplant, and sweet basil.',
            price: '18.95',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop',
            spicy: true
          },
          {
            id: 6,
            name: 'Pla Rad Prik',
            description: 'Crispy whole fish topped with spicy three-flavor sauce, bell peppers, and kaffir lime leaves.',
            price: '24.95',
            image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=2070&auto=format&fit=crop',
            spicy: true,
            featured: true
          }
        ]
      },
      {
        name: 'Desserts',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2066&auto=format&fit=crop',
        items: [
          {
            id: 7,
            name: 'Khao Niao Mamuang',
            description: 'Sweet sticky rice with fresh mango slices and coconut cream.',
            price: '8.95',
            image: 'https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=2070&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 8,
            name: 'Tab Tim Grob',
            description: 'Water chestnut rubies in sweetened coconut milk with crushed ice.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1619011502616-87b5f1b6b2a3?q=80&w=1964&auto=format&fit=crop',
            vegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese Cuisine',
    description: 'Discover the rich culinary traditions of China with our selection of authentic dishes representing various regional styles of Chinese cooking.',
    backgroundImage: 'https://images.unsplash.com/photo-1518983546435-32def8dce589?q=80&w=2067&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1625938145744-533e82abfaf9?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 9,
            name: 'Dim Sum Platter',
            description: 'Assortment of steamed dumplings including har gow, siu mai, and vegetable dumplings.',
            price: '14.95',
            image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=2029&auto=format&fit=crop',
            popular: true
          },
          {
            id: 10,
            name: 'Spring Rolls',
            description: 'Crispy rolls filled with vegetables and shiitake mushrooms, served with sweet chili sauce.',
            price: '9.95',
            image: 'https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?q=80&w=2070&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 11,
            name: 'Crispy Peking Duck Rolls',
            description: 'Thin pancakes wrapped with roasted duck, scallions, cucumber, and hoisin sauce.',
            price: '16.95',
            image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2067&auto=format&fit=crop',
            featured: true
          }
        ]
      },
      {
        name: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1623689043725-b190a3a293b0?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 12,
            name: 'Kung Pao Chicken',
            description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers in a spicy Sichuan sauce.',
            price: '17.95',
            image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=2070&auto=format&fit=crop',
            spicy: true,
            popular: true
          },
          {
            id: 13,
            name: 'Mapo Tofu',
            description: 'Soft tofu in a spicy fermented bean sauce with minced pork and Sichuan peppercorns.',
            price: '15.95',
            image: 'https://images.unsplash.com/photo-1582415892685-48956b19b332?q=80&w=2874&auto=format&fit=crop',
            spicy: true
          },
          {
            id: 14,
            name: 'Peking Duck',
            description: 'Whole roasted duck with crispy skin, served with pancakes, scallions, cucumber, and hoisin sauce.',
            price: '39.95',
            image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?q=80&w=2148&auto=format&fit=crop',
            featured: true
          }
        ]
      },
      {
        name: 'Desserts',
        image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1887&auto=format&fit=crop',
        items: [
          {
            id: 15,
            name: 'Egg Custard Tarts',
            description: 'Flaky pastry shells filled with sweet egg custard, baked to golden perfection.',
            price: '6.95',
            image: 'https://images.unsplash.com/photo-1603736087997-76d754516c97?q=80&w=2532&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 16,
            name: 'Mango Pudding',
            description: 'Smooth mango-flavored pudding topped with fresh mango pieces and evaporated milk.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2069&auto=format&fit=crop',
            vegetarian: true
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
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071&auto=format&fit=crop',
        items: [
          {
            id: 17,
            name: 'Vegetable Samosas',
            description: 'Crispy pastry filled with spiced potatoes and peas, served with tamarind and mint chutneys.',
            price: '8.95',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2071&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 18,
            name: 'Onion Bhaji',
            description: 'Crispy fritters made with sliced onions and chickpea flour, served with mint yogurt sauce.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1619683815207-31fc5ef8ca7d?q=80&w=2067&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 19,
            name: 'Tandoori Chicken Tikka',
            description: 'Tender chicken pieces marinated in yogurt and spices, cooked in a tandoor oven.',
            price: '12.95',
            image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2069&auto=format&fit=crop',
            spicy: true
          }
        ]
      },
      {
        name: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 20,
            name: 'Butter Chicken',
            description: 'Tandoori chicken in a rich tomato and butter sauce, finished with cream and fenugreek.',
            price: '18.95',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop',
            popular: true
          },
          {
            id: 21,
            name: 'Lamb Rogan Josh',
            description: 'Tender lamb pieces slow-cooked in a fragrant Kashmiri spice blend with tomatoes and yogurt.',
            price: '20.95',
            image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=1887&auto=format&fit=crop',
            spicy: true
          },
          {
            id: 22,
            name: 'Vegetable Biryani',
            description: 'Fragrant basmati rice cooked with mixed vegetables, saffron, and aromatic spices.',
            price: '16.95',
            image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop',
            vegetarian: true,
            featured: true
          }
        ]
      },
      {
        name: 'Desserts',
        image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?q=80&w=2015&auto=format&fit=crop',
        items: [
          {
            id: 23,
            name: 'Gulab Jamun',
            description: 'Soft milk dumplings soaked in rose-flavored sugar syrup, garnished with pistachios.',
            price: '6.95',
            image: 'https://images.unsplash.com/photo-1605197948654-68a7e064e911?q=80&w=1974&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 24,
            name: 'Kheer',
            description: 'Creamy rice pudding flavored with cardamom, saffron, and garnished with nuts.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1633275833583-9e3428444204?q=80&w=1972&auto=format&fit=crop',
            vegetarian: true
          }
        ]
      }
    ]
  },
  {
    id: 'bengali',
    name: 'Bengali Cuisine',
    description: 'Indulge in the subtle yet complex flavors of Bengal, featuring seafood, rice, and distinctive mustard and poppy seed preparations.',
    backgroundImage: 'https://images.unsplash.com/photo-1589738943768-8fdd9c2b69d7?q=80&w=2069&auto=format&fit=crop',
    sections: [
      {
        name: 'Appetizers',
        image: 'https://images.unsplash.com/photo-1603099080016-5ee7be05c186?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 25,
            name: 'Beguni',
            description: 'Crispy eggplant fritters coated in gram flour batter, seasoned with nigella seeds.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?q=80&w=2070&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 26,
            name: 'Puchka (Pani Puri)',
            description: 'Hollow crispy spheres filled with spiced potatoes, chickpeas and tangy tamarind water.',
            price: '8.95',
            image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 27,
            name: 'Fish Chop',
            description: 'Spiced fish cakes with potato and panko coating, served with kasundi mustard sauce.',
            price: '10.95',
            image: 'https://images.unsplash.com/photo-1626436819821-79bd89fc3ef5?q=80&w=1974&auto=format&fit=crop'
          }
        ]
      },
      {
        name: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 28,
            name: 'Ilish Bhapa',
            description: 'Steamed hilsa fish in a rich mustard and coconut sauce, wrapped in banana leaf.',
            price: '22.95',
            image: 'https://images.unsplash.com/photo-1611599538835-b52a8c2af7fe?q=80&w=1974&auto=format&fit=crop',
            featured: true
          },
          {
            id: 29,
            name: 'Kosha Mangsho',
            description: 'Slow-cooked Bengali mutton curry with aromatic spices and potatoes.',
            price: '21.95',
            image: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=2074&auto=format&fit=crop',
            popular: true
          },
          {
            id: 30,
            name: 'Chingri Malai Curry',
            description: 'Prawns cooked in a creamy coconut sauce with ginger and green chilies.',
            price: '20.95',
            image: 'https://images.unsplash.com/photo-1665490484977-5ad44e57749a?q=80&w=1780&auto=format&fit=crop'
          }
        ]
      },
      {
        name: 'Desserts',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1864&auto=format&fit=crop',
        items: [
          {
            id: 31,
            name: 'Rasgulla',
            description: 'Spongy cottage cheese balls soaked in light sugar syrup, a Bengali classic.',
            price: '6.95',
            image: 'https://images.unsplash.com/photo-1598140993689-0361bef5e0c7?q=80&w=2068&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 32,
            name: 'Mishti Doi',
            description: 'Sweetened yogurt dessert with caramelized flavor, served chilled in a clay pot.',
            price: '5.95',
            image: 'https://images.unsplash.com/photo-1624813704378-ec63106d53c5?q=80&w=1974&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 33,
            name: 'Sandesh',
            description: 'Delicate Bengali sweet made from paneer and flavored with cardamom and saffron.',
            price: '7.95',
            image: 'https://images.unsplash.com/photo-1608198399988-341f712c3711?q=80&w=2070&auto=format&fit=crop',
            vegetarian: true
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
        image: 'https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?q=80&w=2075&auto=format&fit=crop',
        items: [
          {
            id: 34,
            name: 'Escargot à la Bourguignonne',
            description: 'Snails baked with garlic herb butter, served with crusty baguette.',
            price: '14.95',
            image: 'https://images.unsplash.com/photo-1546549095-5d8bc3c37ffc?q=80&w=2070&auto=format&fit=crop'
          },
          {
            id: 35,
            name: 'Steak Tartare',
            description: 'Hand-cut raw beef seasoned with capers, mustard, shallots, and egg yolk.',
            price: '15.95',
            image: 'https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=2072&auto=format&fit=crop',
            featured: true
          },
          {
            id: 36,
            name: 'Caprese Salad',
            description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic reduction and olive oil.',
            price: '12.95',
            image: 'https://images.unsplash.com/photo-1608682684307-61d5653da583?q=80&w=1974&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          }
        ]
      },
      {
        name: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop',
        items: [
          {
            id: 37,
            name: 'Beef Wellington',
            description: 'Tender filet mignon wrapped in puff pastry with mushroom duxelles and prosciutto.',
            price: '38.95',
            image: 'https://images.unsplash.com/photo-1602196849608-35e863c3f124?q=80&w=1974&auto=format&fit=crop',
            featured: true
          },
          {
            id: 38,
            name: 'Coq au Vin',
            description: 'Chicken braised with wine, lardons, mushrooms, and garlic in a rich sauce.',
            price: '24.95',
            image: 'https://images.unsplash.com/photo-1542854711-359f7afc7a4f?q=80&w=1974&auto=format&fit=crop',
            popular: true
          },
          {
            id: 39,
            name: 'Risotto ai Funghi',
            description: 'Creamy Arborio rice with wild mushrooms, white wine, and Parmesan cheese.',
            price: '20.95',
            image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2069&auto=format&fit=crop',
            vegetarian: true
          }
        ]
      },
      {
        name: 'Desserts',
        image: 'https://images.unsplash.com/photo-1519915028121-7d3463d5b1ff?q=80&w=1887&auto=format&fit=crop',
        items: [
          {
            id: 40,
            name: 'Crème Brûlée',
            description: 'Classic vanilla custard with a caramelized sugar crust, served with fresh berries.',
            price: '9.95',
            image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?q=80&w=1887&auto=format&fit=crop',
            vegetarian: true,
            popular: true
          },
          {
            id: 41,
            name: 'Tiramisu',
            description: 'Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa.',
            price: '8.95',
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2075&auto=format&fit=crop',
            vegetarian: true
          },
          {
            id: 42,
            name: 'Apple Tarte Tatin',
            description: 'Caramelized upside-down apple tart served warm with crème fraîche.',
            price: '10.95',
            image: 'https://images.unsplash.com/photo-1568571780765-9276235b0182?q=80&w=1974&auto=format&fit=crop',
            vegetarian: true
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
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const [sectionBackgrounds, setSectionBackgrounds] = useState<Record<string, boolean>>({});

  // Preload images with a more robust approach
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        resolve(); // Resolve anyway to not block the UI
      };
      img.src = src;
    });
  };

  useEffect(() => {
    // Find the cuisine from the URL parameter or default to Thai
    const selectedCuisine = cuisineParam 
      ? cuisines.find(c => c.id === cuisineParam) 
      : cuisines[0];
    
    if (selectedCuisine) {
      setActiveCuisine(selectedCuisine);
      setActiveSection(selectedCuisine.sections[0].name);
      setIsLoading(true);
      setBackgroundLoaded(false);
      setSectionBackgrounds({});
      
      const sectionLoadingMap: Record<string, boolean> = {};
      selectedCuisine.sections.forEach(section => {
        sectionLoadingMap[section.name] = false;
      });
      
      // Preload main background
      preloadImage(selectedCuisine.backgroundImage)
        .then(() => {
          console.log('Main background loaded:', selectedCuisine.backgroundImage);
          setBackgroundLoaded(true);
        })
        .catch(error => {
          console.error('Error loading main background:', error);
          setBackgroundLoaded(true); // Show content anyway
        });
      
      // Preload all section backgrounds in parallel
      Promise.all(
        selectedCuisine.sections.map(section => 
          preloadImage(section.image)
            .then(() => {
              console.log('Section background loaded:', section.name);
              setSectionBackgrounds(prev => ({
                ...prev,
                [section.name]: true
              }));
            })
            .catch(error => {
              console.error(`Error loading section background for ${section.name}:`, error);
              setSectionBackgrounds(prev => ({
                ...prev,
                [section.name]: true // Mark as loaded even if there was an error
              }));
            })
        )
      ).then(() => {
        console.log('All section backgrounds loaded');
      });
      
      // Preload all item images
      Promise.all(
        selectedCuisine.sections.flatMap(section => 
          section.items.map(item => preloadImage(item.image))
        )
      ).then(() => {
        console.log('All item images loaded');
        setIsLoading(false);
      }).catch(error => {
        console.error('Error loading item images:', error);
        setIsLoading(false); // Show content anyway
      });
    }
  }, [cuisineParam]);

  // Handle cuisine change
  const handleCuisineChange = (cuisine: CuisineMenu) => {
    setIsLoading(true);
    setBackgroundLoaded(false);
    setSectionBackgrounds({});
    setActiveCuisine(cuisine);
    setActiveSection(cuisine.sections[0].name);
    
    // Preload main background
    preloadImage(cuisine.backgroundImage)
      .then(() => {
        setBackgroundLoaded(true);
      })
      .catch(() => {
        setBackgroundLoaded(true); // Show content anyway
      });
    
    // Preload all section backgrounds and item images
    Promise.all([
      ...cuisine.sections.map(section => 
        preloadImage(section.image)
          .then(() => {
            setSectionBackgrounds(prev => ({
              ...prev,
              [section.name]: true
            }));
          })
      ),
      ...cuisine.sections.flatMap(section => 
        section.items.map(item => preloadImage(item.image))
      )
    ]).then(() => {
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false); // Show content anyway
    });
  };

  if (!activeCuisine) return (
    <div className="min-h-screen bg-savoria-black text-white flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );

  // Helper to get current section
  const getCurrentSection = () => {
    if (!activeCuisine) return null;
    return activeCuisine.sections.find(section => section.name === activeSection);
  };

  const currentSection = getCurrentSection();

  return (
    <div className="min-h-screen bg-savoria-black text-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero section with cuisine background */}
        <div 
          className={`relative min-h-[40vh] flex items-center justify-center bg-cover bg-center transition-opacity duration-700 ${backgroundLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(${activeCuisine.backgroundImage})`,
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center py-20">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              <span className="gold-gradient-text">{activeCuisine.name}</span>
            </h1>
            <p className="font-cormorant text-xl md:text-2xl max-w-3xl mx-auto">
              {activeCuisine.description}
            </p>
          </div>
        </div>
        
        {/* Cuisine selection tabs */}
        <div className="bg-savoria-dark/80 py-6 sticky top-0 z-20 shadow-lg backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto pb-2 snap-x scrollbar-none">
              {cuisines.map((cuisine) => (
                <Link 
                  key={cuisine.id} 
                  to={`/menu/${cuisine.id}`}
                  className={`flex-shrink-0 snap-start px-5 py-2 mx-1 rounded-md transition-colors font-cormorant text-lg ${
                    activeCuisine.id === cuisine.id 
                      ? 'bg-gold text-savoria-black font-semibold' 
                      : 'hover:bg-gold/20'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleCuisineChange(cuisine);
                    window.history.pushState({}, '', `/menu/${cuisine.id}`);
                  }}
                >
                  {cuisine.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      
        {/* Menu content */}
        <div className="container mx-auto px-4 py-12">
          {/* Section tabs */}
          <Tabs defaultValue={activeSection} value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="w-full flex justify-center mb-10 overflow-x-auto bg-savoria-black p-1 rounded-md">
              {activeCuisine.sections.map((section) => (
                <TabsTrigger 
                  key={section.name}
                  value={section.name}
                  className="flex-1 max-w-[200px] font-cormorant text-lg data-[state=active]:bg-gold data-[state=active]:text-savoria-black"
                >
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {activeCuisine.sections.map((section) => (
              <TabsContent 
                key={`${activeCuisine.id}-${section.name}`} 
                value={section.name}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCuisine.id}-${section.name}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Section background */}
                    <div className="absolute inset-0 -z-10">
                      {/* Solid color fallback */}
                      <div className="absolute inset-0 bg-savoria-dark/90"></div>
                      
                      {/* Background image with preload check */}
                      <div 
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${sectionBackgrounds[section.name] ? 'opacity-30' : 'opacity-0'}`}
                        style={{ 
                          backgroundImage: `url(${section.image})`,
                          backgroundAttachment: 'fixed'
                        }}
                      />
                    </div>
                    
                    {/* Section title */}
                    <div className="text-center mb-8">
                      <h2 className="font-playfair text-3xl font-bold">
                        {section.name}
                      </h2>
                    </div>
                    
                    {/* Menu items grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="glass-card p-5 relative overflow-hidden group"
                        >
                          {/* Item image */}
                          <div className="h-48 mb-4 overflow-hidden rounded-md">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          
                          {/* Item content */}
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-playfair text-xl font-semibold">
                                {item.name}
                                {item.spicy && <span className="text-red-500 ml-2">🌶️</span>}
                                {item.vegetarian && <span className="text-green-500 ml-2">🥬</span>}
                              </h3>
                              <span className="text-gold font-cormorant font-bold text-xl">
                                ${item.price}
                              </span>
                            </div>
                            
                            <p className="font-cormorant text-gray-300 text-lg">
                              {item.description}
                            </p>
                            
                            {/* Tags */}
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.popular && (
                                <span className="text-xs px-2 py-1 bg-gold/20 rounded-full text-gold">
                                  Popular
                                </span>
                              )}
                              {item.featured && (
                                <span className="text-xs px-2 py-1 bg-purple-500/20 rounded-full text-purple-400">
                                  Chef's Special
                                </span>
                              )}
                              {item.vegetarian && (
                                <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-green-400">
                                  Vegetarian
                                </span>
                              )}
                              {item.vegan && (
                                <span className="text-xs px-2 py-1 bg-emerald-500/20 rounded-full text-emerald-400">
                                  Vegan
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MenuPage;
