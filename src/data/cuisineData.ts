
import { CuisineMenu } from '@/types/menu';

// Sample data for different cuisines with reliable image sources
export const cuisines: CuisineMenu[] = [
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
