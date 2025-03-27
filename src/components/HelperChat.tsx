
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, CornerDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  options?: {
    text: string;
    path?: string;
    action?: () => void;
  }[];
}

const HelperChat = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Initial greeting message
  useEffect(() => {
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: 'Welcome to Savoria! How can I help you today? I can assist with menu recommendations, reservations, special venues, or answer any questions about our services.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Explore Menu', path: '/menu' },
          { text: 'Make a Reservation', path: '/reservation' },
          { text: 'Special Venues', path: '/special-services' },
          { text: 'Contact Us', path: '/contact' }
        ]
      };
      setMessages([welcomeMessage]);
    }, 500);
    
    // Focus input after a moment
    setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Process the user input
    setTimeout(() => {
      processUserInput(input);
      setIsTyping(false);
    }, 1000);
  };

  const processUserInput = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response: Message;
    
    // Check for keywords and provide appropriate responses
    if (lowerInput.includes('menu') || lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('cuisine')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'Our menu features a variety of cuisines including Italian, French, Chinese, Japanese, Indian, and Mediterranean. Which would you like to explore?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Italian Cuisine', path: '/menu/italian' },
          { text: 'French Cuisine', path: '/menu/french' },
          { text: 'Chinese Cuisine', path: '/menu/chinese' },
          { text: 'Japanese Cuisine', path: '/menu/japanese' },
          { text: 'Indian Cuisine', path: '/menu/indian' },
          { text: 'Mediterranean Cuisine', path: '/menu/mediterranean' },
          { text: 'View All Menu', path: '/menu' }
        ]
      };
    } else if (lowerInput.includes('reservation') || lowerInput.includes('book') || lowerInput.includes('table')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'I can help you with reservations. How many people will be dining?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: '1-2 People', action: () => handleReservationSize('1-2') },
          { text: '3-6 People', action: () => handleReservationSize('3-6') },
          { text: '7-10 People', action: () => handleReservationSize('7-10') },
          { text: '11-35 People', action: () => handleReservationSize('11-35') },
          { text: '36-80 People', action: () => handleReservationSize('36-80') },
          { text: '80+ People', action: () => handleReservationSize('80+') }
        ]
      };
    } else if (lowerInput.includes('event') || lowerInput.includes('wedding') || lowerInput.includes('birthday') || lowerInput.includes('conference') || lowerInput.includes('party')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'We have special venues perfect for events. How many guests are you expecting?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Small (Up to 35)', action: () => handleEventSize('small') },
          { text: 'Medium (35-80)', action: () => handleEventSize('medium') },
          { text: 'Large (80+)', action: () => handleEventSize('large') },
          { text: 'View All Venues', path: '/special-services' }
        ]
      };
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email') || lowerInput.includes('call')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'You can contact our team through our contact page, or I can provide you with direct contact options.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Go to Contact Page', path: '/contact' }
        ]
      };
    } else if (lowerInput.includes('gallery') || lowerInput.includes('photo') || lowerInput.includes('image') || lowerInput.includes('picture')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'Would you like to explore our gallery to see our restaurant ambiance and dishes?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'View Gallery', path: '/gallery' }
        ]
      };
    } else if (lowerInput.includes('experience') || lowerInput.includes('vibe') || lowerInput.includes('ambient')) {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'Would you like to experience the ambient atmosphere of Savoria?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Experience Savoria', path: '/' },
          { text: 'View Gallery', path: '/gallery' }
        ]
      };
    } else {
      // Generic response for other queries
      response = {
        id: `assistant-${Date.now()}`,
        text: 'I can help you with menu exploration, reservations, or information about our special venues. What would you like to know?',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Explore Menu', path: '/menu' },
          { text: 'Make a Reservation', path: '/reservation' },
          { text: 'Special Venues', path: '/special-services' },
          { text: 'Contact Us', path: '/contact' }
        ]
      };
    }
    
    setMessages(prev => [...prev, response]);
  };
  
  const handleReservationSize = (size: string) => {
    let response: Message;
    
    if (size === '80+') {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a group of 80+ people, our Ambrosia Hall would be perfect. It offers elegance and space for large gatherings.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Ambrosia', path: '/special-services#ambrosia' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    } else if (size === '36-80') {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a group of 36-80 people, our Ambrosia Hall would be suitable. It provides a luxurious setting for medium to large gatherings.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Ambrosia', path: '/special-services#ambrosia' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    } else if (size === '11-35') {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a group of 11-35 people, our Euphoria Lounge would be ideal. It offers an intimate yet spacious setting.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Euphoria', path: '/special-services#euphoria' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    } else {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a group of this size, you can make a reservation through our reservation page.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Make Reservation', path: '/reservation' }
        ]
      };
    }
    
    setMessages(prev => [...prev, response]);
  };
  
  const handleEventSize = (size: string) => {
    let response: Message;
    
    if (size === 'large') {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a large event with 80+ guests, our Ambrosia Hall is the perfect choice. It provides an elegant and spacious environment for memorable celebrations.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Ambrosia', path: '/special-services#ambrosia' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    } else if (size === 'medium') {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a medium-sized event with 35-80 guests, our Ambrosia Hall would be suitable, offering elegance and enough space for your gathering.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Ambrosia', path: '/special-services#ambrosia' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    } else {
      response = {
        id: `assistant-${Date.now()}`,
        text: 'For a small event with up to 35 guests, our Euphoria Lounge provides an intimate and refined atmosphere.',
        sender: 'assistant',
        timestamp: new Date(),
        options: [
          { text: 'Learn about Euphoria', path: '/special-services#euphoria' },
          { text: 'Contact for Booking', path: '/contact' }
        ]
      };
    }
    
    setMessages(prev => [...prev, response]);
  };

  const handleOptionClick = (option: { text: string; path?: string; action?: () => void }) => {
    if (option.action) {
      option.action();
    } else if (option.path) {
      navigate(option.path);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-b border-[#D4AF37]/30 p-4 flex justify-between items-center">
        <h3 className="text-xl font-playfair text-[#D4AF37]">Savoria Assistant</h3>
        <button onClick={onClose} className="text-white hover:text-[#D4AF37] transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn(
              "flex flex-col",
              message.sender === 'user' ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "max-w-[80%] rounded-lg px-4 py-2",
                message.sender === 'user' 
                  ? "bg-[#996515] text-white" 
                  : "bg-[#1a1a1a] border border-[#D4AF37]/20 text-white"
              )}>
                <p>{message.text}</p>
              </div>
              
              {/* Options */}
              {message.options && message.options.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(option)}
                      className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full 
                              bg-[#1a1a1a] border border-[#D4AF37]/30 text-[#D4AF37]
                              hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      <CornerDownRight size={14} /> {option.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 text-white max-w-[80%] rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#D4AF37]/30 bg-[#1a1a1a]">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            className="flex-1 bg-[#2a2a2a] border border-[#D4AF37]/20 text-white rounded-l-lg py-2 px-4 outline-none focus:border-[#D4AF37]/50"
          />
          <button 
            onClick={handleSend}
            className="bg-gradient-to-r from-[#D4AF37] to-[#996515] text-black rounded-r-lg py-2 px-4 hover:from-[#996515] hover:to-[#D4AF37] transition-all"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default HelperChat;
