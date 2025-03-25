
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 5, 100)); // Slower progress for better visibility
      } else {
        // Wait a moment at 100% before completing
        setTimeout(() => onLoadingComplete(), 500);
      }
    }, 120); // Faster increments but smaller steps
    
    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-savoria-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(4px)'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-6xl md:text-8xl font-playfair font-bold">
            <span className="gold-gradient-text">SAVORIA</span>
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="font-cormorant text-lg text-white/80 italic">
            Culinary excellence awaits
          </span>
        </motion.div>
        
        <div className="w-64 sm:w-96 relative">
          <Progress value={progress} className="h-1 bg-savoria-dark">
            <motion.div 
              className="h-full bg-gold rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />
          </Progress>
          
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gold/70 font-cormorant">PREPARING</span>
            <span className="text-xs text-gold/70 font-cormorant">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
