
import React from 'react';
import CuisineSection from './cuisine/CuisineSection';
import CuisineCard from './cuisine/CuisineCard';

const cuisines = [
  {
    title: 'Thai',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80',
    description: 'Experience the vibrant flavors of Thailand with aromatic herbs and spices. Our Thai chefs create authentic dishes that balance sweet, spicy, sour, and salty elements in perfect harmony.'
  },
  {
    title: 'Chinese',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80',
    description: 'Discover the rich culinary traditions of China, from delicate dim sum to flavorful stir-fries. Each dish showcases the balance, harmony, and precision that defines Chinese cuisine.'
  },
  {
    title: 'Indian',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
    description: 'Indulge in the aromatic spices and diverse flavors of Indian cooking. Our menu features both beloved classics and regional specialties prepared with traditional techniques.'
  },
  {
    title: 'Bengali',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80',
    description: 'Explore the subtle, artistic cuisine of Bengal, known for its seafood delicacies, unique spice blends, and the perfect balance of flavors that tantalize the palate.'
  },
  {
    title: 'Continental',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80',
    description: 'Savor the sophisticated flavors of Continental Europe, featuring classic techniques and premium ingredients. Our Continental menu offers refined dishes from across the European culinary landscape.'
  },
];

const CuisineShowcase = () => {
  return (
    <CuisineSection>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cuisines.map((cuisine, index) => (
          <CuisineCard
            key={cuisine.title}
            title={cuisine.title}
            image={cuisine.image || ''}
            description={cuisine.description}
            index={index}
          />
        ))}
      </div>
    </CuisineSection>
  );
};

export default CuisineShowcase;
