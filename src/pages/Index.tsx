
import { useEffect } from 'react';
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
  const popularDishes = [
    {
      id: 1,
      name: 'Butter Chicken',
      cuisine: 'Indian',
      description: 'Tender chicken in a rich tomato, butter, and cream sauce',
      price: 26,
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/indian'
    },
    {
      id: 2,
      name: 'Pad Thai',
      cuisine: 'Thai',
      description: 'Stir-fried rice noodles with eggs, tofu, bean sprouts, and crushed peanuts',
      price: 22,
      image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/thai'
    },
    {
      id: 3,
      name: 'Beef Wellington',
      cuisine: 'Continental',
      description: 'Tenderloin wrapped in puff pastry with mushroom duxelles and prosciutto',
      price: 42,
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      path: '/menu/continental'
    },
  ];

  return (
    <section className="py-20 bg-savoria-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Popular Dishes</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Discover our most beloved creations that have captivated the hearts and palates of our guests.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularDishes.map((dish, index) => (
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
                <p className="text-gray-300 mb-4 font-cormorant">{dish.description}</p>
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
        </div>
      </div>
    </section>
  );
};

const TrendingOffersSection = () => {
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
  ];

  return (
    <section className="py-20 bg-savoria-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Trending Offers</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Limited-time experiences designed to delight your senses and create unforgettable memories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              className="relative overflow-hidden rounded-md h-72"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <img 
                src={offer.image} 
                alt={offer.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-playfair text-2xl text-white mb-2">{offer.title}</h3>
                <p className="text-gray-300 font-cormorant">{offer.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LatestMemoriesSection = () => {
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
    <section className="py-20 bg-savoria-dark">
      <div className="container mx-auto px-4">
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
