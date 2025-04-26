
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CuisineMenu } from '@/types/menu';

interface CuisineNavTabsProps {
  cuisines: CuisineMenu[];
  activeCuisine: CuisineMenu;
  isTransitioning: boolean;
  onCuisineChange: (cuisineId: string) => void;
}

const CuisineNavTabs = ({ cuisines, activeCuisine, isTransitioning, onCuisineChange }: CuisineNavTabsProps) => {
  const navigate = useNavigate();

  const handleTabClick = (cuisine: CuisineMenu) => {
    if (isTransitioning || cuisine.id === activeCuisine.id) return;
    
    // Update the URL and trigger cuisine change
    navigate(`/menu/${cuisine.id}`);
    onCuisineChange(cuisine.id);
  };

  return (
    <div className="overflow-x-auto scrollbar-none py-2">
      <div className="flex space-x-3 min-w-max">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine.id}
            className={cn(
              'px-4 py-2 rounded-md text-sm relative whitespace-nowrap transition-all duration-300 font-medium',
              cuisine.id === activeCuisine.id
                ? 'text-gold font-bold'
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
