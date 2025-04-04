
import React from 'react';
import { Bot, X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose }) => {
  return (
    <div className="p-3 bg-gradient-to-r from-black to-zinc-900 border-b border-gold/20 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="bg-gold rounded-full p-1.5">
          <Bot size={18} className="text-black" />
        </div>
        <h3 className="font-playfair text-lg text-white">Savoria Assistant</h3>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white transition-colors"
        aria-label="Close chat"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default ChatHeader;
