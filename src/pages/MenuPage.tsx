import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, ChefHat } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for menu items with added fields for ratings and reviews
const menuData = {
  thai: [
    {
      id: 1,
      name: 'Tom Yum Goong',
      description: 'Spicy and sour shrimp soup with lemongrass, galangal, and kaffir lime leaves',
      price: 12,
      image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.8,
      reviews: 126
    },
    {
      id: 2,
      name: 'Satay Gai',
      description: 'Grilled chicken skewers marinated in coconut milk and spices, with peanut sauce',
      price: 10,
      image: 'https://images.unsplash.com/photo-1616716343504-01b7f7e92ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.9,
      reviews: 98
    },
    {
      id: 3,
      name: 'Som Tum',
      description: 'Traditional green papaya salad with chili, lime, peanuts and dried shrimp',
      price: 9,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.6,
      reviews: 87
    },
    {
      id: 4,
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with tofu, bean sprouts, egg, and ground peanuts',
      price: 18,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 210
    },
    {
      id: 5,
      name: 'Gaeng Keow Wan',
      description: 'Green curry with chicken, Thai eggplant, and sweet basil in coconut milk',
      price: 22,
      image: 'https://images.unsplash.com/photo-1624781748172-7151704a42e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.7,
      reviews: 152
    },
    {
      id: 6,
      name: 'Pla Neung Manao',
      description: 'Steamed sea bass with chili, garlic, and lime sauce',
      price: 28,
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 106
    },
    {
      id: 7,
      name: 'Khao Niew Mamuang',
      description: 'Sweet sticky rice with fresh mango and coconut cream',
      price: 9,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
      category: 'Desserts',
      rating: 4.8,
      reviews: 134
    },
    {
      id: 8,
      name: 'Tab Tim Krob',
      description: 'Water chestnuts in syrup with coconut milk and crushed ice',
      price: 8,
      image: 'https://images.unsplash.com/photo-1625490939776-28a1c2d3ad56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.7,
      reviews: 92
    },
  ],
  chinese: [
    {
      id: 1,
      name: 'Dim Sum Platter',
      description: 'Assortment of steamed dumplings, buns, and rolls with dipping sauces',
      price: 16,
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2029&q=80',
      category: 'Starters',
      rating: 4.9,
      reviews: 143
    },
    {
      id: 2,
      name: 'Spring Rolls',
      description: 'Crispy vegetable spring rolls with sweet chili dipping sauce',
      price: 10,
      image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.7,
      reviews: 98
    },
    {
      id: 3,
      name: 'Wonton Soup',
      description: 'Clear broth with pork wontons, bok choy and green onions',
      price: 12,
      image: 'https://images.unsplash.com/photo-1591985666643-1eac7833b34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.6,
      reviews: 87
    },
    {
      id: 4,
      name: 'Peking Duck',
      description: 'Crispy roasted duck served with thin pancakes, scallions, cucumber, and hoisin sauce',
      price: 42,
      image: 'https://images.unsplash.com/photo-1582883496181-b2bd0a86dd1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 5,
      name: 'Kung Pao Chicken',
      description: 'Spicy stir-fried chicken with peanuts, vegetables, and chilies',
      price: 24,
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.8,
      reviews: 112
    },
    {
      id: 6,
      name: 'Mapo Tofu',
      description: 'Spicy tofu dish with minced pork, Sichuan peppercorns and chili bean paste',
      price: 18,
      image: 'https://images.unsplash.com/photo-1583032937544-8e7b179a5f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Main Courses',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 7,
      name: 'Egg Custard Tarts',
      description: 'Flaky pastry tarts with sweet egg custard filling',
      price: 8,
      image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.7,
      reviews: 101
    },
    {
      id: 8,
      name: 'Red Bean Soup',
      description: 'Warm sweet soup with red beans, lotus seeds and dried tangerine peel',
      price: 7,
      image: 'https://images.unsplash.com/photo-1518975658798-6a46cebe6723?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.5,
      reviews: 77
    },
  ],
  indian: [
    {
      id: 1,
      name: 'Samosas',
      description: 'Crispy fried pastries filled with spiced potatoes and peas',
      price: 8,
      image: 'https://images.unsplash.com/photo-1632515587244-e5c589711b90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.7,
      reviews: 112
    },
    {
      id: 2,
      name: 'Vegetable Pakoras',
      description: 'Mixed vegetable fritters in spiced chickpea batter',
      price: 9,
      image: 'https://images.unsplash.com/photo-1616397683729-669429556005?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Aloo Tikki',
      description: 'Spiced potato patties with chutneys and yogurt',
      price: 10,
      image: 'https://images.unsplash.com/photo-1621905391427-9c775940197a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.8,
      reviews: 95
    },
    {
      id: 4,
      name: 'Butter Chicken',
      description: 'Tender chicken in a rich tomato, butter, and cream sauce',
      price: 26,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 178
    },
    {
      id: 5,
      name: 'Biryani',
      description: 'Fragrant basmati rice cooked with aromatic spices and layered with meat',
      price: 28,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
      category: 'Main Courses',
      rating: 4.7,
      reviews: 145
    },
    {
      id: 6,
      name: 'Palak Paneer',
      description: 'Cottage cheese in a creamy spinach sauce',
      price: 22,
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2017&q=80',
      category: 'Main Courses',
      rating: 4.8,
      reviews: 123
    },
    {
      id: 7,
      name: 'Gulab Jamun',
      description: 'Deep-fried milk balls in rose-flavored syrup',
      price: 7,
      image: 'https://images.unsplash.com/photo-1614566942452-35239a794696?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.9,
      reviews: 111
    },
    {
      id: 8,
      name: 'Kulfi',
      description: 'Traditional Indian ice cream with nuts and cardamom',
      price: 8,
      image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.7,
      reviews: 88
    },
  ],
  bengali: [
    {
      id: 1,
      name: 'Aloo Chop',
      description: 'Spiced potato fritters coated in breadcrumbs',
      price: 7,
      image: 'https://images.unsplash.com/photo-1689195806771-9c969b09f4ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.6,
      reviews: 76
    },
    {
      id: 2,
      name: 'Beguni',
      description: 'Eggplant slices dipped in batter and fried',
      price: 6,
      image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Starters',
      rating: 4.5,
      reviews: 65
    },
    {
      id: 3,
      name: 'Fish Fry',
      description: 'Crispy fried fish marinated in spices',
      price: 9,
      image: 'https://plus.unsplash.com/premium_photo-1663853051825-5db9554de1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Starters',
      rating: 4.7,
      reviews: 82
    },
    {
      id: 4,
      name: 'Ilish Bhapa',
      description: 'Steamed hilsa fish with mustard paste, coconut, and green chilies',
      price: 32,
      image: 'https://plus.unsplash.com/premium_photo-1663853051825-5db9554de1e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 118
    },
    {
      id: 5,
      name: 'Kosha Mangsho',
      description: 'Slow-cooked mutton in a rich and spicy gravy',
      price: 30,
      image: 'https://images.unsplash.com/photo-1689195806771-9c969b09f4ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.8,
      reviews: 95
    },
    {
      id: 6,
      name: 'Chingri Malai Curry',
      description: 'Prawns cooked in a creamy coconut sauce with subtle spices',
      price: 34,
      image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      category: 'Main Courses',
      rating: 4.7,
      reviews: 84
    },
    {
      id: 7,
      name: 'Rosogolla',
      description: 'Soft cheese balls in light syrup',
      price: 6,
      image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      category: 'Desserts',
      rating: 4.9,
      reviews: 102
    },
    {
      id: 8,
      name: 'Mishti Doi',
      description: 'Sweet yogurt dessert',
      price: 5,
      image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      category: 'Desserts',
      rating: 4.8,
      reviews: 91
    },
  ],
  continental: [
    {
      id: 1,
      name: 'French Onion Soup',
      description: 'Classic soup with caramelized onions and Gruyère cheese',
      price: 14,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.8,
      reviews: 123
    },
    {
      id: 2,
      name: 'Escargots',
      description: 'Snails cooked in garlic and parsley butter',
      price: 16,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.7,
      reviews: 98
    },
    {
      id: 3,
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
      price: 12,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Starters',
      rating: 4.6,
      reviews: 78
    },
    {
      id: 4,
      name: 'Beef Wellington',
      description: 'Tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto',
      price: 42,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Main Courses',
      rating: 4.9,
      reviews: 145
    },
    {
      id: 5,
      name: 'Lobster Thermidor',
      description: 'Lobster with egg yolks and brandy, cooked and served in its shell',
      price: 48,
      image: 'https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2178&q=80',
      category: 'Main Courses',
      rating: 4.8,
      reviews: 112
    },
    {
      id: 6,
      name: 'Coq au Vin',
      description: 'Chicken braised with wine, mushrooms, bacon, and garlic',
      price: 36,
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
      category: 'Main Courses',
      rating: 4.7,
      reviews: 91
    },
    {
      id: 7,
      name: 'Crème brûlée',
      description: 'Custard base with a hard caramel top',
      price: 9,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.9,
      reviews: 105
    },
    {
      id: 8,
      name: 'Chocolate Fondant',
      description: 'Warm chocolate cake with a molten center',
      price: 10,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Desserts',
      rating: 4.8,
      reviews: 94
    },
  ],
};

const cuisineInfo = {
  thai: {
    name: 'Thai Cuisine',
    description: 'Experience the harmonious blend of sweet, sour, salty, and spicy flavors that define Thai cuisine, prepared with authentic ingredients and techniques.',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    theme: 'theme-thai',
    color: '#8B5742',
    chefRecommendation: {
      text: "The true essence of Thai cuisine lies in the balance of flavors and textures. Allow us to guide you through a curated journey.",
      course: "Our master chef recommends experiencing the complete traditional meal course to fully appreciate the depth and harmony of Thai cuisine",
      chef: "Chef Alessandro Romano"
    }
  },
  chinese: {
    name: 'Chinese Cuisine',
    description: 'Discover the rich culinary traditions of China, where balance, color, and flavor create a harmonious dining experience.',
    image: 'https://images.unsplash.com/photo-1583032937544-8e7b179a5f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    theme: 'theme-chinese',
    color: '#C12D00',
    chefRecommendation: {
      text: "Chinese cuisine celebrates the art of balance - in texture, flavor, and nutritional elements. Each dish tells a story of tradition.",
      course: "Our executive chef suggests trying our Peking Duck with all the traditional accompaniments for an authentic imperial dining experience",
      chef: "Chef Lin Wei"
    }
  },
  indian: {
    name: 'Indian Cuisine',
    description: 'Indulge in the aromatic spices and diverse regional flavors that make Indian cuisine one of the most celebrated in the world.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    theme: 'theme-indian',
    color: '#E49B5D',
    chefRecommendation: {
      text: "The beauty of Indian cuisine lies in its diversity and depth of flavors, each representing centuries of culinary evolution.",
      course: "For a truly memorable experience, our chef recommends the Royal Thali - a curated selection of dishes that showcase India's culinary diversity",
      chef: "Chef Priya Sharma"
    }
  },
