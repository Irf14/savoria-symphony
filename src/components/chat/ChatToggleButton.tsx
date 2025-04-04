
import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button with a shorter delay and ensure it's always shown
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Reduced from 1500ms to 1000ms
    
    return () => clearTimeout(timer);
  }, []);

  // Use visibility instead of conditional rendering to prevent DOM removal
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-50 bg-gold hover:bg-gold/90 text-black p-4 rounded-full shadow-lg transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black ${
        isVisible 
          ? 'opacity-100 translate-y-0 animate-pulse' 
          : 'opacity-0 translate-y-10'
      }`}
      aria-label="Open chat assistant"
    >
      <MessageSquare size={28} />
    </button>
  );
};

export default ChatToggleButton;
