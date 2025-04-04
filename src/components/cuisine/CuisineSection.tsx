
import React from 'react';
import { SectionTitle } from '@/components/ui/section-title';

interface CuisineSectionProps {
  children: React.ReactNode;
}

const CuisineSection: React.FC<CuisineSectionProps> = ({ children }) => {
  return (
    <section className="relative py-16 bg-savoria-dark">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" 
           style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80)' }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle 
          title="Explore Our Cuisines" 
          subtitle="Five Distinct Culinary Journeys"
          description="Each cuisine is crafted by specialized chefs using authentic techniques and the finest ingredients, offering you a world of flavors under one roof."
        />
        
        <div className="mt-12">
          {children}
        </div>
      </div>
    </section>
  );
};

export default CuisineSection;
