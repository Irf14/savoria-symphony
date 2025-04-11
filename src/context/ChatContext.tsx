
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { processWithAI } from '@/utils/chatUtils';
import { Message, ActionButton, ActionType } from '@/types/chat';
import { getActionsFromMessage } from '@/utils/chatActionUtils';

interface ChatContextProps {
  messages: Message[];
  isProcessing: boolean;
  suggestedActions: ActionButton[];
  sendMessage: (text: string) => void;
  handleActionClick: (action: ActionType, param?: string) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.`,
      sender: 'assistant',
      text: `Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.`,
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<ActionButton[]>([
    { type: 'viewMenu', label: 'View Menu' },
    { type: 'makeReservation', label: 'Make Reservation' }
  ]);
  const navigate = useNavigate();

  // Helper to handle menu navigation
  const navigateToMenu = useCallback((cuisine?: string) => {
    if (cuisine) {
      navigate(`/menu/${cuisine.toLowerCase()}`);
      toast({
        title: `Viewing ${cuisine} Menu`,
        description: `You're now exploring our ${cuisine} cuisine options.`,
        duration: 3000
      });
    } else {
      navigate('/menu');
      toast({
        title: "Viewing Menu",
        description: "You're now browsing our complete menu offerings.",
        duration: 3000
      });
    }
  }, [navigate]);

  // Helper to handle reservation
  const navigateToReservation = useCallback(() => {
    navigate('/reservation');
    toast({
      title: "Make a Reservation",
      description: "You're being taken to our reservation page.",
      duration: 3000
    });
  }, [navigate]);

  // Helper to handle venue navigation
  const navigateToVenues = useCallback(() => {
    navigate('/special-services');
    toast({
      title: "Explore Venues",
      description: "Discover our special venues for events and celebrations.",
      duration: 3000
    });
  }, [navigate]);

  // Helper to handle contact
  const navigateToContact = useCallback(() => {
    navigate('/contact');
    toast({
      title: "Contact Information",
      description: "You can find all our contact details here.",
      duration: 3000
    });
  }, [navigate]);

  // Helper to handle gallery
  const navigateToGallery = useCallback(() => {
    navigate('/gallery');
    toast({
      title: "Photo Gallery",
      description: "Explore images of our restaurant, food, and events.",
      duration: 3000
    });
  }, [navigate]);

  // Handle action buttons in responses
  const handleActionClick = useCallback((action: ActionType, param?: string) => {
    switch (action) {
      case 'viewMenu':
        navigateToMenu(param);
        break;
      case 'makeReservation':
        navigateToReservation();
        break;
      case 'viewGallery':
        navigateToGallery();
        break;
      case 'contact':
        navigateToContact();
        break;
      case 'viewVenues':
        navigateToVenues();
        break;
      default:
        console.log('Unknown action:', action);
    }
  }, [navigateToMenu, navigateToReservation, navigateToGallery, navigateToContact, navigateToVenues]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return;
    
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: text,
      sender: 'user',
      text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    
    try {
      // Process with AI
      const aiResponse = await processWithAI(text, messages);
      
      // Extract potential actions
      const actions = getActionsFromMessage(aiResponse);
      setSuggestedActions(actions.length > 0 ? actions : [
        { type: 'viewMenu', label: 'View Menu' },
        { type: 'makeReservation', label: 'Make Reservation' }
      ]);
      
      // Add response with a slight delay to seem more natural
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          sender: 'assistant',
          text: aiResponse,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
      }, 800);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the restaurant directly.",
        sender: 'assistant',
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the restaurant directly.",
        timestamp: new Date()
      }]);
      setIsProcessing(false);
    }
  }, [isProcessing, messages]);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isProcessing, 
        suggestedActions, 
        sendMessage, 
        handleActionClick 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
