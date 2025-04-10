
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Cuisine } from '@/types/menu';

interface CuisineNavTabsProps {
  cuisines: Cuisine[];
  activeCuisine: Cuisine;
  isTransitioning: boolean;
  onCuisineChange: (cuisine: Cuisine) => void;
}

const CuisineNavTabs = ({ cuisines, activeCuisine, isTransitioning, onCuisineChange }: CuisineNavTabsProps) => {
  const navigate = useNavigate();

  const handleTabClick = (cuisine: Cuisine) => {
    if (isTransitioning || cuisine.id === activeCuisine.id) return;
    
    navigate(`/menu/${cuisine.id}`);
    onCuisineChange(cuisine);
  };

  return (
    <div className="overflow-x-auto scrollbar-none">
      <div className="flex space-x-1 min-w-max">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            className={cn(
              'px-3 py-2 rounded-md text-sm relative whitespace-nowrap transition-all duration-300',
              cuisine.id === activeCuisine.id
                ? 'text-gold font-medium'
                : 'text-white/70 hover:text-white'
            )}
            disabled={isTransitioning}
            onClick={() => handleTabClick(cuisine)}
          >
            {cuisine.name}
            {cuisine.id === activeCuisine.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                layoutId="cuisine-indicator"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CuisineNavTabs;
