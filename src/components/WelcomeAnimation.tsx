
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeAnimationProps {
  visible: boolean;
  onComplete: () => void;
}

const WelcomeAnimation = ({ visible, onComplete }: WelcomeAnimationProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-40 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-black/85"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center relative z-10 px-4"
          >
            <div className="mb-4 inline-block">
              <span className="bg-black/40 backdrop-blur-sm px-6 py-2 rounded-md shadow-lg">
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="inline-block"
                >
                  <span className="font-cormorant text-white text-2xl italic tracking-wide">welcome to</span>
                </motion.span>
              </span>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 text-white drop-shadow-lg"
            >
              <span className="gold-gradient-text">SAVORIA</span> Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-cormorant text-xl text-gray-200 mb-6 max-w-2xl mx-auto"
            >
              Where culinary artistry meets exceptional hospitality
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
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
