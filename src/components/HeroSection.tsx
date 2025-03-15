
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleScroll = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section relative flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-savoria-black z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="container mx-auto px-4 z-10 text-center py-32">
        <div className={cn(
          "transition-all duration-1000 transform",
          loaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
            Welcome to <span className="gold-text">SAVORIA</span>
          </h1>
          
          <p className="font-cormorant text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Embark on a culinary journey through authentic flavors from around the world
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a 
              href="/menu" 
              className="px-8 py-3 bg-gold text-savoria-black font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold-dark transition-colors"
            >
              Explore Menu
            </a>
            <a 
              href="/gallery" 
              className="px-8 py-3 bg-transparent border border-gold text-gold font-cormorant font-semibold text-lg tracking-wider rounded-sm hover:bg-gold/10 transition-colors"
            >
              View Gallery
            </a>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleScroll}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white hover:text-gold transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
