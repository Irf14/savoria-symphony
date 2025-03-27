
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from './ChatContext';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatDialog: React.FC = () => {
  const { isOpen, setIsOpen } = useChat();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center md:items-end md:justify-end md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="bg-black/90 backdrop-blur-md border border-gold/20 rounded-lg shadow-xl overflow-hidden w-full max-w-md h-[600px] md:h-[500px] flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gold/20 flex justify-between items-center bg-gold/10">
              <div>
                <h3 className="text-xl font-playfair text-gold">Savoria Assistant</h3>
                <p className="text-sm text-white/70">How can I help?</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white focus:outline-none"
                aria-label="Close chat"
              >
                <X size={24} />
              </button>
            </div>

            <ChatMessages />
            <ChatInput />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatDialog;
