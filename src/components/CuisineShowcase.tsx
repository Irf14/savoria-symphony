
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CuisineCardProps {
  cuisine: {
    name: string;
    description: string;
    shortDescription: string;
    image: string;
    color: string;
    gradient: string;
    path: string;
  };
}

const CuisineCard = ({ cuisine }: CuisineCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={cuisine.path}
      className="cuisine-card group h-80 block rounded-lg relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6 }}
        style={{
          backgroundImage: `url(${cuisine.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className={cn(
        "absolute inset-0 opacity-70 transition-opacity duration-500 z-10",
        cuisine.gradient
      )} />
      
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <h3 className="font-playfair text-3xl font-bold text-white mb-2">{cuisine.name}</h3>
        
        <motion.div
          initial={{ height: "0px", opacity: 0 }}
          animate={{ 
            height: isHovered ? "auto" : "0px", 
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? "0.75rem" : "0"
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="font-cormorant text-lg text-white">
            {cuisine.description}
          </p>
        </motion.div>
        
        <motion.p 
          className="font-cormorant text-gray-200 mb-4"
          animate={{ opacity: isHovered ? 0 : 1 }}
        >
          {cuisine.shortDescription}
        </motion.p>
        
        <motion.div 
          className="w-12 h-0.5 bg-gold"
          animate={{ width: isHovered ? "5rem" : "3rem" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </Link>
  );
};

const CuisineShowcase = () => {
  const cuisines = [
    {
      name: 'Thai Cuisine',
      shortDescription: 'Aromatic herbs and spices',
      description: 'Experience the aromatic herbs and spices of Thailand in every bite, crafted with authentic techniques.',
      image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      color: 'bg-savoria-thai',
      gradient: 'bg-thai-gradient',
      path: '/menu/thai',
    },
    {
      name: 'Chinese Cuisine',
      shortDescription: 'Perfect harmony of flavors',
      description: 'Savor the perfect harmony of flavors in our authentic Chinese dishes, prepared with traditional methods.',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80',
      color: 'bg-savoria-chinese',
      gradient: 'bg-chinese-gradient',
      path: '/menu/chinese',
    },
    {
      name: 'Indian Cuisine',
      shortDescription: 'Rich tapestry of spices',
      description: 'Discover the rich tapestry of spices that define Indian culinary tradition, creating bold and memorable flavors.',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2676&q=80',
      color: 'bg-savoria-indian',
      gradient: 'bg-indian-gradient',
      path: '/menu/indian',
    },
    {
      name: 'Bengali Cuisine',
      shortDescription: 'Subtle flavors and artistry',
      description: 'Enjoy the subtle flavors and artistic preparations of traditional Bengali food, highlighting regional specialties.',
      image: 'https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80',
      color: 'bg-savoria-bengali',
      gradient: 'bg-bengali-gradient',
      path: '/menu/bengali',
    },
    {
      name: 'Continental Cuisine',
      shortDescription: 'Sophisticated European flavors',
      description: 'Experience the sophisticated flavors of European culinary excellence with our refined continental offerings.',
      image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      color: 'bg-savoria-continental',
      gradient: 'bg-continental-gradient',
      path: '/menu/continental',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background with subtle food pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.15) blur(3px)',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="section-heading">Our Culinary Journey</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl mt-4">
            Discover our diverse culinary heritage spanning five distinct cuisines, each prepared with passion and precision.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cuisines.map((cuisine, index) => (
            <motion.div
              key={cuisine.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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
