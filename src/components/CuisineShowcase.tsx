
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CuisineCardProps {
  cuisine: {
    name: string;
    description: string;
    image: string;
    color: string;
    gradient: string;
    path: string;
  };
}

const CuisineCard = ({ cuisine }: CuisineCardProps) => {
  return (
    <Link 
      to={cuisine.path}
      className="cuisine-card group h-80 block"
    >
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${cuisine.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10",
        cuisine.gradient
      )} style={{ opacity: 0.7 }} />
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <h3 className="font-playfair text-2xl font-bold text-white mb-2">{cuisine.name}</h3>
        <p className="font-cormorant text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {cuisine.description}
        </p>
        <div className="w-12 h-1 bg-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:w-20" />
      </div>
    </Link>
  );
};

const CuisineShowcase = () => {
  const cuisines = [
    {
      name: 'Thai Cuisine',
      description: 'Experience the aromatic herbs and spices of Thailand in every bite.',
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      color: 'bg-savoria-thai',
      gradient: 'bg-thai-gradient',
      path: '/menu/thai',
    },
    {
      name: 'Chinese Cuisine',
      description: 'Savor the perfect harmony of flavors in our authentic Chinese dishes.',
      image: 'https://images.unsplash.com/photo-1583032037190-36e0d0994482?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80',
      color: 'bg-savoria-chinese',
      gradient: 'bg-chinese-gradient',
      path: '/menu/chinese',
    },
    {
      name: 'Indian Cuisine',
      description: 'Discover the rich tapestry of spices that define Indian culinary tradition.',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2676&q=80',
      color: 'bg-savoria-indian',
      gradient: 'bg-indian-gradient',
      path: '/menu/indian',
    },
    {
      name: 'Bengali Cuisine',
      description: 'Enjoy the subtle flavors and artistic preparations of traditional Bengali food.',
      image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      color: 'bg-savoria-bengali',
      gradient: 'bg-bengali-gradient',
      path: '/menu/bengali',
    },
    {
      name: 'Continental Cuisine',
      description: 'Experience the sophisticated flavors of European culinary excellence.',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: 'bg-savoria-continental',
      gradient: 'bg-continental-gradient',
      path: '/menu/continental',
    },
  ];

  return (
    <section id="about" className="py-24 bg-savoria-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">Our Culinary Journey</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Embark on a world tour of flavors, where each cuisine tells a story of culture, tradition, and passion.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CuisineCard cuisine={cuisine} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuisineShowcase;
