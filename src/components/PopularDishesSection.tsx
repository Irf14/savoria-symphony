
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PopularDishesSection = () => {
  const [timeframe, setTimeframe] = useState('week');
  
  const weeklyDishes = [
    {
      id: 1,
      name: 'Butter Chicken',
      cuisine: 'Indian',
      description: 'Tender chicken in a rich tomato, butter, and cream sauce',
      price: 26,
      rating: 4.9,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/indian'
    },
    {
      id: 2,
      name: 'Pad Thai',
      cuisine: 'Thai',
      description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and crushed peanuts',
      price: 22,
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/thai'
    },
    {
      id: 3,
      name: 'Beef Wellington',
      cuisine: 'Continental',
      description: 'Tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto',
      price: 42,
      rating: 4.8,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/continental'
    },
  ];

  const monthlyDishes = [
    {
      id: 4,
      name: 'Tom Yum Soup',
      cuisine: 'Thai',
      description: 'Hot and sour soup with lemongrass, galangal, lime and chili',
      price: 18,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/thai'
    },
    {
      id: 5,
      name: 'Peking Duck',
      cuisine: 'Chinese',
      description: 'Roasted duck known for its thin, crispy skin, served with pancakes',
      price: 38,
      rating: 4.8,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      path: '/menu/chinese'
    },
    {
      id: 6,
      name: 'Biryani',
      cuisine: 'Indian',
      description: 'Fragrant rice dish with aromatic spices, tender meat, and saffron',
      price: 28,
      rating: 4.9,
      reviews: 187,
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2487&q=80',
      path: '/menu/indian'
    },
  ];

  useEffect(() => {
    // Auto-switch between week and month every 5 seconds
    const interval = setInterval(() => {
      setTimeframe((prev) => (prev === 'week' ? 'month' : 'week'));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const dishes = timeframe === 'week' ? weeklyDishes : monthlyDishes;

  return (
    <section className="py-20 bg-savoria-dark relative overflow-hidden">
      {/* Artistic food background */}
      <div 
        className="absolute inset-0 opacity-10 bg-fixed"
        style={{
          backgroundImage: `url(${timeframe === 'week' 
            ? 'https://images.unsplash.com/photo-1543353071-087092ec393a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80'
            : 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            Popular Dishes of the{' '}
            <motion.span
              key={timeframe}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {timeframe === 'week' ? 'Week' : 'Month'}
            </motion.span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Discover our most beloved creations that have captivated the hearts and palates of our guests.
          </p>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            key={timeframe}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {dishes.map((dish, index) => (
              <motion.div
                key={dish.id}
                className="bg-savoria-black rounded-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-playfair text-xl font-semibold text-white">{dish.name}</h3>
                    <span className="text-gold font-cormorant text-xl">${dish.price}</span>
                  </div>
                  <span className="text-gold/80 text-sm block mb-2">{dish.cuisine} Cuisine</span>
                  <p className="text-gray-300 mb-3 font-cormorant">{dish.description}</p>
                  
                  {/* Ratings */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-4 w-4 ${i < Math.floor(dish.rating) ? 'text-gold' : 'text-gray-500'}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-400 text-sm">{dish.rating} ({dish.reviews} reviews)</span>
                  </div>
                  
                  <Link 
                    to={dish.path} 
                    className="text-gold font-cormorant hover:text-gold-light transition-colors inline-flex items-center"
                  >
                    View on Menu
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PopularDishesSection;
