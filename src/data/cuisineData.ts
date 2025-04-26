import { CuisineMenu, MenuSection } from '@/types/menu';

// Thai Cuisine
const thaiCuisine: CuisineMenu = {
  id: 'thai',
  name: 'Thai Cuisine',
  description: 'Experience authentic Thai flavors with our carefully crafted dishes blending sweet, sour, salty, and spicy elements.',
  background: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=2070&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=2070&q=80',
  sections: [
    {
      id: 'thai-appetizers',
      name: 'Appetizers',
      description: 'Start your Thai culinary journey with these flavorful starters',
      backgroundImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80',
      items: [
        {
          id: 1,
          name: 'Satay Gai',
          description: 'Grilled chicken skewers marinated in Thai spices, served with peanut sauce',
          price: '$8.95',
          rating: 4.7,
          chefsChoice: true
        },
        {
          id: 2,
          name: 'Tom Yum Soup',
          description: 'Hot and sour soup with shrimp, lemongrass, and chili',
          price: '$7.95',
          rating: 4.6,
          chefsChoice: false
        },
        {
          id: 3,
          name: 'Fresh Spring Rolls',
          description: 'Rice paper rolls filled with fresh vegetables and herbs, served with a sweet chili sauce',
          price: '$6.95',
          rating: 4.5,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'thai-main-courses',
      name: 'Main Courses',
      description: 'Explore our selection of authentic Thai main courses',
      backgroundImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80',
      items: [
        {
          id: 4,
          name: 'Pad Thai',
          description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts',
          price: '$12.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 5,
          name: 'Green Curry',
          description: 'Green curry with chicken, bamboo shoots, and Thai basil',
          price: '$13.95',
          rating: 4.8,
          chefsChoice: false
        },
        {
          id: 6,
          name: 'Massaman Curry',
          description: 'Mild curry with beef, potatoes, and peanuts',
          price: '$14.95',
          rating: 4.7,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'thai-desserts',
      name: 'Desserts',
      description: 'End your meal with these sweet Thai treats',
      backgroundImage: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80',
      items: [
        {
          id: 7,
          name: 'Mango Sticky Rice',
          description: 'Sweet sticky rice with fresh mango and coconut milk',
          price: '$9.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 8,
          name: 'Banana Fritters',
          description: 'Deep-fried banana slices with honey and sesame seeds',
          price: '$8.95',
          rating: 4.6,
          chefsChoice: false
        },
      ]
    }
  ]
};

// Indian Cuisine
const indianCuisine: CuisineMenu = {
  id: 'indian',
  name: 'Indian Cuisine',
  description: 'Discover the rich tapestry of flavors from across the Indian subcontinent, featuring aromatic spices and diverse cooking techniques.',
  background: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=2070&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=2070&q=80',
  sections: [
    {
      id: 'indian-appetizers',
      name: 'Appetizers',
      description: 'Begin your journey through Indian flavors with these traditional starters',
      backgroundImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80',
      items: [
        {
          id: 1,
          name: 'Vegetable Samosas',
          description: 'Crispy pastry filled with spiced potatoes and peas, served with tamarind chutney',
          price: '$7.95',
          rating: 4.8,
          chefsChoice: true
        },
        {
          id: 2,
          name: 'Onion Bhajis',
          description: 'Deep-fried onion fritters with gram flour and spices',
          price: '$6.95',
          rating: 4.6,
          chefsChoice: false
        },
        {
          id: 3,
          name: 'Aloo Tikki',
          description: 'Potato patties spiced with herbs and served with mint chutney',
          price: '$7.95',
          rating: 4.5,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'indian-main-courses',
      name: 'Main Courses',
      description: 'Explore our flavorful Indian main courses',
      backgroundImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80',
      items: [
        {
          id: 4,
          name: 'Butter Chicken',
          description: 'Tender chicken in a creamy tomato-based sauce',
          price: '$14.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 5,
          name: 'Lamb Rogan Josh',
          description: 'Aromatic lamb curry with Kashmiri chili and spices',
          price: '$16.95',
          rating: 4.8,
          chefsChoice: false
        },
        {
          id: 6,
          name: 'Vegetable Biryani',
          description: 'Fragrant rice dish with mixed vegetables and spices',
          price: '$13.95',
          rating: 4.7,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'indian-desserts',
      name: 'Desserts',
      description: 'Satisfy your sweet tooth with these Indian desserts',
      backgroundImage: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80',
      items: [
        {
          id: 7,
          name: 'Gulab Jamun',
          description: 'Deep-fried milk balls in rose-flavored syrup',
          price: '$8.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 8,
          name: 'Rasmalai',
          description: 'Cheese patties soaked in sweetened, thickened milk',
          price: '$9.95',
          rating: 4.6,
          chefsChoice: false
        },
      ]
    }
  ]
};

// Chinese Cuisine
const chineseCuisine: CuisineMenu = {
  id: 'chinese',
  name: 'Chinese Cuisine',
  description: 'Savor the balance of flavors and textures in our authentic Chinese dishes, prepared with traditional techniques.',
  background: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=2070&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=2070&q=80',
  sections: [
    {
      id: 'chinese-appetizers',
      name: 'Appetizers',
      description: 'Traditional starters from various regions of China',
      backgroundImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
      items: [
        {
          id: 1,
          name: 'Spring Rolls',
          description: 'Crispy rolls filled with vegetables and meat, served with sweet and sour sauce',
          price: '$6.95',
          rating: 4.7,
          chefsChoice: true
        },
        {
          id: 2,
          name: 'Dumplings',
          description: 'Steamed or fried dumplings filled with pork or vegetables',
          price: '$7.95',
          rating: 4.6,
          chefsChoice: false
        },
        {
          id: 3,
          name: 'Wonton Soup',
          description: 'Clear broth with wontons filled with shrimp and pork',
          price: '$6.95',
          rating: 4.5,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'chinese-main-courses',
      name: 'Main Courses',
      description: 'Enjoy our classic Chinese main dishes',
      backgroundImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
      items: [
        {
          id: 4,
          name: 'Kung Pao Chicken',
          description: 'Stir-fried chicken with peanuts, vegetables, and chili peppers',
          price: '$13.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 5,
          name: 'Sweet and Sour Pork',
          description: 'Deep-fried pork in a tangy sweet and sour sauce',
          price: '$14.95',
          rating: 4.8,
          chefsChoice: false
        },
        {
          id: 6,
          name: 'Mapo Tofu',
          description: 'Tofu in a spicy fermented black bean sauce',
          price: '$12.95',
          rating: 4.7,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'chinese-desserts',
      name: 'Desserts',
      description: 'Complete your meal with these Chinese desserts',
      backgroundImage: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
      items: [
        {
          id: 7,
          name: 'Sesame Balls',
          description: 'Deep-fried glutinous rice balls coated with sesame seeds',
          price: '$7.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 8,
          name: 'Almond Jelly',
          description: 'Chilled almond-flavored jelly with fruit',
          price: '$8.95',
          rating: 4.6,
          chefsChoice: false
        },
      ]
    }
  ]
};

// Bengali Cuisine
const bengaliCuisine: CuisineMenu = {
  id: 'bengali',
  name: 'Bengali Cuisine',
  description: 'Experience the subtle flavors and delicate spices of traditional Bengali cooking, highlighting fish, rice, and mustard.',
  background: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=2070&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=2070&q=80',
  sections: [
    {
      id: 'bengali-appetizers',
      name: 'Appetizers',
      description: 'Start your Bengali dining experience with these authentic starters',
      backgroundImage: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80',
      items: [
        {
          id: 1,
          name: 'Aloo Chop',
          description: 'Spiced potato fritters, a classic Bengali snack',
          price: '$5.95',
          rating: 4.7,
          chefsChoice: true
        },
        {
          id: 2,
          name: 'Beguni',
          description: 'Eggplant slices dipped in batter and deep-fried',
          price: '$4.95',
          rating: 4.6,
          chefsChoice: false
        },
        {
          id: 3,
          name: 'Fish Fry',
          description: 'Crispy fried fish marinated in Bengali spices',
          price: '$7.95',
          rating: 4.5,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'bengali-main-courses',
      name: 'Main Courses',
      description: 'Discover the heart of Bengali cuisine with these main dishes',
      backgroundImage: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80',
      items: [
        {
          id: 4,
          name: 'Shorshe Ilish',
          description: 'Hilsa fish cooked in mustard sauce, a Bengali delicacy',
          price: '$18.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 5,
          name: 'Chingri Malaikari',
          description: 'Prawns in a creamy coconut milk-based gravy',
          price: '$17.95',
          rating: 4.8,
          chefsChoice: false
        },
        {
          id: 6,
          name: 'Aloo Posto',
          description: 'Potatoes cooked in poppy seed paste',
          price: '$12.95',
          rating: 4.7,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'bengali-desserts',
      name: 'Desserts',
      description: 'End your Bengali meal with these sweet treats',
      backgroundImage: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80',
      items: [
        {
          id: 7,
          name: 'Rosogolla',
          description: 'Soft cheese balls in light syrup',
          price: '$7.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 8,
          name: 'Mishti Doi',
          description: 'Sweetened yogurt, a Bengali classic',
          price: '$6.95',
          rating: 4.6,
          chefsChoice: false
        },
      ]
    }
  ]
};

// Continental Cuisine
const continentalCuisine: CuisineMenu = {
  id: 'continental',
  name: 'Continental Cuisine',
  description: 'Enjoy classic European dishes with modern interpretations, featuring premium ingredients and refined techniques.',
  background: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&w=2070&q=80',
  backgroundImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&w=2070&q=80',
  sections: [
    {
      id: 'continental-appetizers',
      name: 'Appetizers',
      description: 'Begin your continental dining experience with these elegant starters',
      backgroundImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80',
      items: [
        {
          id: 1,
          name: 'Bruschetta',
          description: 'Toasted bread topped with tomatoes, basil, and balsamic glaze',
          price: '$8.95',
          rating: 4.7,
          chefsChoice: true
        },
        {
          id: 2,
          name: 'French Onion Soup',
          description: 'Classic French soup with caramelized onions and Gruyère cheese',
          price: '$7.95',
          rating: 4.6,
          chefsChoice: false
        },
        {
          id: 3,
          name: 'Caprese Salad',
          description: 'Fresh mozzarella, tomatoes, and basil with balsamic dressing',
          price: '$9.95',
          rating: 4.5,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'continental-main-courses',
      name: 'Main Courses',
      description: 'Savor our refined continental main courses',
      backgroundImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80',
      items: [
        {
          id: 4,
          name: 'Steak Frites',
          description: 'Grilled steak served with French fries and béarnaise sauce',
          price: '$24.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 5,
          name: 'Chicken Alfredo',
          description: 'Pasta with creamy Alfredo sauce and grilled chicken',
          price: '$18.95',
          rating: 4.8,
          chefsChoice: false
        },
        {
          id: 6,
          name: 'Salmon with Asparagus',
          description: 'Pan-seared salmon with roasted asparagus and lemon butter sauce',
          price: '$22.95',
          rating: 4.7,
          chefsChoice: false
        },
      ]
    },
    {
      id: 'continental-desserts',
      name: 'Desserts',
      description: 'Indulge in our exquisite continental desserts',
      backgroundImage: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?auto=format&fit=crop&q=80',
      items: [
        {
          id: 7,
          name: 'Crème brûlée',
          description: 'Classic custard dessert with a brittle caramelized sugar crust',
          price: '$9.95',
          rating: 4.9,
          chefsChoice: true
        },
        {
          id: 8,
          name: 'Tiramisu',
          description: 'Coffee-flavored Italian dessert',
          price: '$8.95',
          rating: 4.6,
          chefsChoice: false
        },
      ]
    }
  ]
};

export const cuisines = [thaiCuisine, indianCuisine, chineseCuisine, bengaliCuisine, continentalCuisine];
export const defaultCuisine = thaiCuisine;
