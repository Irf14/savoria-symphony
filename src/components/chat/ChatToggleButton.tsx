
import React, { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  onClick: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onClick }) => {
  // Add state to track if button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Show button with delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-gold hover:bg-gold/90 text-black p-4 rounded-full shadow-lg transition-transform duration-500 hover:scale-110 animate-pulse focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black"
      aria-label="Open chat assistant"
    >
      <MessageSquare size={28} />
    </button>
  );
};

export default ChatToggleButton;
