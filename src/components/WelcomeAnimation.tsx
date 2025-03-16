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
          className="fixed inset-0 bg-savoria-black flex items-center justify-center z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Reduced duration from 0.6 to 0.3
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-2 text-white gold-gradient-text`}
            >
              Indulge In The <span className="gold-gradient-text">SAVORIA</span> Experience
            </h1>
            <p className="font-cormorant text-xl text-gray-300">
              Where culinary artistry meets exceptional hospitality
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeAnimation;
