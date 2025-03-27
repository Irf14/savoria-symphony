
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { useChat } from './ChatContext';
import { motion } from 'framer-motion';

const ChatButton: React.FC = () => {
  const { isOpen, setIsOpen } = useChat();

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gold hover:bg-gold/90 text-black rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all"
        aria-label="Chat with assistant"
      >
        <MessageSquareText size={24} />
      </button>
    </motion.div>
  );
};

export default ChatButton;
