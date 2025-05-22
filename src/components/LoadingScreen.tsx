
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);
  
  useEffect(() => {
    // Simulate loading progress - faster loading
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + Math.random() * 15; // Faster progress
        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 120); // Reduced from 150ms to 120ms
    
    // Complete loading after animation - reduced time
    const timer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setShowSpinner(false);
      
      // Small delay after reaching 100%
      setTimeout(onLoadingComplete, 300); // Reduced from 400ms to 300ms
    }, 1000); // Reduced from 1200ms to 1000ms
    
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
      {/* Culinary artistic background */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)'
        }}
      />
      
      {/* Luxury pattern overlay */}
      <div 
        className="absolute inset-0 bg-black/90" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative w-full max-w-xs mb-12 z-10">
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
        <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-gold/80 via-gold to-gold/80"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Loading percentage */}
        <div className="mt-3 flex justify-between text-xs text-gray-400">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-cormorant italic"
          >
            Crafting your culinary journey...
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gold"
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
