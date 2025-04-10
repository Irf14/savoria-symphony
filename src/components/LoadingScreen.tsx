
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 15;
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 200);
    
    // Complete loading after animation
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setShowSpinner(false);
      
      // Small delay after reaching 100%
      setTimeout(onLoadingComplete, 500);
    }, 1500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="relative w-full max-w-xs mb-12">
        {/* SAVORIA Logo */}
        <motion.h1
          className="text-center text-4xl font-playfair font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="gold-gradient-text">SAVORIA</span>
        </motion.h1>

        {/* Progress bar container */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-gold/80 via-gold to-gold/80"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Loading percentage */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Preparing experience...
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
      
      {/* Animated loading spinner */}
      {showSpinner && (
        <div className="relative">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 1, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
            className="w-12 h-12"
          >
            <div className="w-12 h-12 rounded-full border-2 border-gray-800 border-t-gold border-r-gold" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0"
            animate={{ 
              rotate: -360
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "linear" 
            }}
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold" />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default LoadingScreen;
