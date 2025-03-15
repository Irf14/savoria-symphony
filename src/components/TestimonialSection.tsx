
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Alexandra Thompson',
    role: 'Food Critic',
    quote: 'SAVORIA transcends ordinary dining, creating an experience that engages all the senses. Each dish tells a story of tradition, innovation, and passion.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'Culinary Enthusiast',
    quote: 'The authenticity of each cuisine at SAVORIA is remarkable. From the Thai spices to the subtle Bengali flavors, every dish is a masterpiece of its cultural heritage.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Gourmet Traveler',
    quote: 'What sets SAVORIA apart is their unwavering commitment to culinary excellence. The attention to detail in both flavor and presentation is unmatched in the city.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2061&q=80',
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-24 bg-savoria-muted overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-heading">What People Say</h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-cormorant text-xl">
            Hear from our patrons about their unforgettable experiences at SAVORIA.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 text-gold opacity-20 z-0">
            <Quote size={120} />
          </div>
          
          <div className="relative z-10">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100,
                  position: index === activeIndex ? 'relative' : 'absolute',
                }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "text-center p-6",
                  index !== activeIndex && "hidden"
                )}
              >
                <div className="mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-gold"
                  />
                </div>
                <blockquote className="text-gray-200 font-cormorant text-xl md:text-2xl italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-gold font-playfair text-lg">{testimonial.name}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4 mt-10">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-savoria-black transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-savoria-black transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
