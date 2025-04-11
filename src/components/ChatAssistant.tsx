
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { ActionType, Message } from '@/types/chat';
import { getActionsFromMessage } from '@/utils/chatActionUtils';
import { processWithAI } from '@/utils/chatUtils';
import ChatHeader from '@/components/chat/ChatHeader';
import MessagesList from '@/components/chat/MessagesList';
import ChatInput from '@/components/chat/ChatInput';
import SuggestedActions from '@/components/chat/SuggestedActions';
import ChatToggleButton from '@/components/chat/ChatToggleButton';

// Default welcome message
const welcomeMessage: Message = {
  id: '1',
  role: 'assistant',
  content: `Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.`,
  sender: 'assistant', // For backwards compatibility
  text: `Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.`, // For backwards compatibility
  timestamp: new Date()
};

// Default suggested actions
const defaultActions = [
  { type: 'viewMenu' as ActionType, label: 'View Menu' },
  { type: 'makeReservation' as ActionType, label: 'Make Reservation' }
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [suggestedActions, setSuggestedActions] = useState(defaultActions);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Auto-scroll to bottom when new messages come in
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, [isOpen]);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      sender: 'user', // For backwards compatibility
      text: inputValue, // For backwards compatibility
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    try {
      // Process with AI
      const aiResponse = await processWithAI(inputValue, messages);
      
      // Extract potential actions
      const actions = getActionsFromMessage(aiResponse);
      setSuggestedActions(actions.length > 0 ? actions : defaultActions);
      
      // Add response with a slight delay to seem more natural
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          sender: 'assistant', // For backwards compatibility
          text: aiResponse, // For backwards compatibility
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    } catch (error) {
      console.error('Error generating response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the restaurant directly.",
        sender: 'assistant', // For backwards compatibility
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the restaurant directly.", // For backwards compatibility
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  // Handle action clicks
  const handleActionClick = (action: ActionType, param?: string) => {
    switch (action) {
      case 'viewMenu':
        navigate(param ? `/menu/${param.toLowerCase()}` : '/menu');
        toast({
          title: param ? `Viewing ${param} Menu` : "Viewing Menu",
          description: param 
            ? `You're now exploring our ${param} cuisine options.`
            : "You're now browsing our complete menu offerings.",
          duration: 3000
        });
        break;
        
      case 'makeReservation':
        navigate('/reservation');
        toast({
          title: "Make a Reservation",
          description: "You're being taken to our reservation page.",
          duration: 3000
        });
        break;
        
      case 'viewGallery':
        navigate('/gallery');
        toast({
          title: "Photo Gallery",
          description: "Explore images of our restaurant, food, and events.",
          duration: 3000
        });
        break;
        
      case 'contact':
        navigate('/contact');
        toast({
          title: "Contact Information",
          description: "You can find all our contact details here.",
          duration: 3000
        });
        break;
        
      case 'viewVenues':
        navigate('/special-services');
        toast({
          title: "Explore Venues",
          description: "Discover our special venues for events and celebrations.",
          duration: 3000
        });
        break;
        
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <ChatToggleButton onClick={() => setIsOpen(true)} />

      {/* Chat dialog */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-black/95 border border-gold/30 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <ChatHeader onClose={() => setIsOpen(false)} />

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <MessagesList messages={messages} isProcessing={isProcessing} />
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Quick action buttons */}
            {!isProcessing && suggestedActions.length > 0 && (
              <SuggestedActions 
                suggestedActions={suggestedActions} 
                onActionClick={handleActionClick} 
              />
            )}

            {/* Input area */}
            <ChatInput
              ref={inputRef}
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSendMessage}
              isProcessing={isProcessing}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
