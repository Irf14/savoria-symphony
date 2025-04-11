
import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  // Show button faster and ensure it's always displayed
  useEffect(() => {
    // First make sure it exists in the DOM as soon as possible
    setIsVisible(true);
    
    // Show welcome toast after a short delay
    const welcomeTimer = setTimeout(() => {
      toast({
        title: "Need assistance?",
        description: "Click the chat button anytime for instant help!",
        duration: 5000,
      });
    }, 10000); // Show after 10 seconds
    
    // Enhanced visibility check
    const visibilityCheck = setInterval(() => {
      const chatButton = document.getElementById('chat-toggle-button');
      if (chatButton) {
        chatButton.style.opacity = "1";
        chatButton.style.visibility = "visible";
        chatButton.style.transform = "translateY(0)";
        chatButton.style.display = "flex";
        chatButton.style.pointerEvents = "auto";
        chatButton.style.zIndex = "9999";
      }
    }, 1000); // Check every second
    
    // Log to console for debugging
    console.log("ChatToggleButton mounted, isVisible:", isVisible);
    
    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(visibilityCheck);
    };
  }, [toast]);

  return (
    <motion.button
      id="chat-toggle-button"
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-[9999] bg-gradient-to-br from-gold to-gold/80 hover:from-gold/80 hover:to-gold text-black p-4 rounded-full shadow-xl transition-all ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      aria-label="Open chat assistant"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -10, 0],
      }}
      transition={{ 
        duration: 0.3,
        y: {
          repeat: 2,
          repeatType: "reverse",
          duration: 1,
          delay: 2
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare size={28} />
      <motion.span 
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [1, 0.8, 1]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2
        }}
      />
      <span className="sr-only">How can I help?</span>
    </motion.button>
  );
};

export default ChatToggleButton;
