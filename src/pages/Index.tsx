import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import CuisineShowcase from '@/components/CuisineShowcase';
import GalleryPreview from '@/components/GalleryPreview';
import TestimonialSection from '@/components/TestimonialSection';
import SpecialServicesSection from '@/components/SpecialServicesSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          key={timeframe}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
      </div>
    </section>
  );
};

const TrendingOffersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const offers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Enjoy a four-course menu for two with complimentary wine pairing on Friday and Saturday nights.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      title: 'Chef\'s Table Experience',
      description: 'Reserve our exclusive Chef\'s Table for a personalized dining journey with our executive chef.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2077&q=80',
    },
    {
      id: 3,
      title: 'Seasonal Tasting Menu',
      description: 'Experience our limited-time menu featuring the freshest seasonal ingredients from local farms.',
      image: 'https://images.unsplash.com/photo-1583608564476-c6c97c2ddfac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  useEffect(() => {
    // Auto-advance slideshow
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);
    
    return () => clearInterval(slideInterval);
  }, [offers.length]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background with shimmering effect */}
      <div 
        className="absolute inset-0 bg-savoria-black"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }}
      />
      
      {/* Shimmering overlay */}
      <div className="absolute inset-0 bg-gold/5 animate-gold-shimmer"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Trending Offers</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Limited-time experiences designed to delight your senses and create unforgettable memories.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className={`relative overflow-hidden rounded-lg ${
                currentSlide === index ? 'block' : 'hidden'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 0.95
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.h3 
                  className="font-playfair text-3xl text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {offer.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-200 font-cormorant text-xl max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {offer.description}
                </motion.p>
                
                <motion.button 
                  className="mt-6 w-fit px-6 py-2 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
          
          {/* Slide indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? 'bg-gold w-6' : 'bg-white/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LatestMemoriesSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1539622106114-e0df812097e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1691881235811-568677709895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ];

  useEffect(() => {
    // Auto-advance background slideshow
    const bgInterval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(bgInterval);
  }, [backgroundImages.length]);

  const memories = [
    {
      id: 1,
      title: 'Anniversary Celebration',
      description: 'A beautiful evening of romance and exquisite dining',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 2,
      title: 'Corporate Gathering',
      description: 'Elegant space for important business discussions',
      image: 'https://images.unsplash.com/photo-1539622106114-e0df812097e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: 3,
      title: 'Cultural Night',
      description: 'Celebrating diversity through food and performances',
      image: 'https://images.unsplash.com/photo-1691881235811-568677709895?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
    },
    {
      id: 4,
      title: 'Wine Tasting Event',
      description: 'Exploring premium vintages from around the world',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];

  return (
    <section className="py-20 bg-savoria-dark relative overflow-hidden">
      {/* Background slideshow */}
      {backgroundImages.map((image, index) => (
        <div 
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            backgroundIndex === index ? 'opacity-15' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) blur(3px)',
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Latest Memories</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Beautiful moments shared in our space, creating lasting impressions and stories.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-savoria-muted">
              <TabsTrigger value="all" className="text-white data-[state=active]:text-gold">All</TabsTrigger>
              <TabsTrigger value="events" className="text-white data-[state=active]:text-gold">Events</TabsTrigger>
              <TabsTrigger value="dining" className="text-white data-[state=active]:text-gold">Dining</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.slice(0, 2).map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="dining">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {memories.slice(2, 4).map((memory, index) => (
                <motion.div
                  key={memory.id}
                  className="gallery-image group rounded-md overflow-hidden h-64 relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={memory.image} 
                    alt={memory.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-6 z-10">
                    <h3 className="font-playfair text-xl text-white">{memory.title}</h3>
                    <p className="text-gray-300 text-sm">{memory.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <Link 
            to="/gallery" 
            className="inline-block px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
          >
            View All Memories
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-savoria-black">
      <Navbar />
      <HeroSection />
      <PopularDishesSection />
      <CuisineShowcase />
      <SpecialServicesSection />
      <TrendingOffersSection />
      <LatestMemoriesSection />
      <GalleryPreview />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
