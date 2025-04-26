
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface WelcomeAnimationProps {
  visible: boolean;
  onComplete: () => void;
}

const WelcomeAnimation = ({ visible, onComplete }: WelcomeAnimationProps) => {
  const isMobile = useIsMobile();
  
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-40 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Parallax background layers */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5 }}
          />
          
          {/* Dark overlay with subtle pattern */}
          <div className="absolute inset-0 bg-black/90">
            <div className="w-full h-full opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>
          
          <motion.div
            className="relative z-10 px-4 max-w-4xl text-center"
          >
            {/* Animated golden lines */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0">
                <motion.path
                  d="M0,0 L100,0 L100,100 L0,100 Z"
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                  strokeDasharray="0.5, 8"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 2.5, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            
            {/* "welcome to" text with animated reveal */}
            <div className="overflow-hidden mb-4">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              >
                <span className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-md shadow-lg">
                  <span className="font-cormorant text-white text-xl md:text-2xl italic tracking-wide inline-block">
                    welcome to
                  </span>
                </span>
              </motion.div>
            </div>
            
            {/* SAVORIA main logo with enhanced animation */}
            <motion.div 
              className="overflow-hidden mb-4 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1.2 }}
            >
              <motion.img
                src="/lovable-uploads/c66deafa-ac0d-468b-ae58-5882755f77e8.png"
                alt="SAVORIA"
                className="h-16 md:h-24 object-contain"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  delay: 1.2, 
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
              />
            </motion.div>
            
            {/* Animated tagline */}
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="font-cormorant text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
              >
                Where culinary artistry meets exceptional hospitality
              </motion.p>
            </motion.div>
            
            {/* Animated gold separator line */}
            <motion.div
              className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: isMobile ? "6rem" : "8rem", opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
            />
            
            {/* Established date */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="inline-block"
            >
              <span className="bg-gold/20 backdrop-blur-sm px-4 py-1 rounded-sm text-gold font-cormorant italic text-lg">
                Est. 2023
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
