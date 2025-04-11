
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      id="chat-toggle-button"
      onClick={onClick}
      className="fixed z-[9999] bg-gold hover:bg-gold/90 text-black p-4 rounded-full shadow-xl"
      style={{
        position: 'fixed',
        top: '200px', // Position it at a fixed height from the top, before popular dishes section
        right: '2rem',
        zIndex: 9999, 
        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
      }}
      aria-label="Open chat assistant"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare size={24} />
      <motion.span 
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.button>
  );
};

export default ChatToggleButton;
