
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 10, 100));
      } else {
        onLoadingComplete();
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);
  
  return (
    <motion.div 
      className="fixed inset-0 bg-savoria-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        if (progress === 100) {
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
        }
      }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-playfair font-bold mb-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        <span className="bg-gold-gradient bg-clip-text text-transparent animate-gold-shimmer">
          SAVORIA
        </span>
      </motion.h1>
      
      <div className="w-64 sm:w-80">
        <Progress value={progress} className="h-1 bg-savoria-dark">
          <div className="h-full bg-gold animate-pulse rounded-full" />
        </Progress>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
