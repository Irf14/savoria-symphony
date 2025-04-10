
import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button faster and ensure it's always displayed
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800); // Even shorter delay for faster appearance
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-[9999] bg-gold hover:bg-gold/90 text-black p-4 rounded-full shadow-lg transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black ${
        isVisible 
          ? 'opacity-100 translate-y-0 animate-pulse' 
          : 'opacity-0 translate-y-10'
      }`}
      aria-label="Open chat assistant"
      id="chat-toggle-button" // Add ID for easy debugging
    >
      <MessageSquare size={28} />
      <span className="sr-only">How can I help?</span>
    </button>
  );
};

export default ChatToggleButton;
