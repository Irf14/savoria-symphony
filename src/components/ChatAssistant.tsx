
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { ChatProvider, useChatContext } from '@/context/ChatContext';
import { processWithAI } from '@/utils/chatUtils';
import { ActionButton, ActionType, Message } from '@/types/chat';
import ChatHeader from '@/components/chat/ChatHeader';
import MessagesList from '@/components/chat/MessagesList';
import ChatInput from '@/components/chat/ChatInput';
import SuggestedActions from '@/components/chat/SuggestedActions';
import ChatToggleButton from '@/components/chat/ChatToggleButton';

const ChatAssistantInner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { 
    messages, 
    isProcessing, 
    suggestedActions, 
    sendMessage, 
    handleActionClick 
  } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
        if (inputRef.current && isMountedRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, [isOpen]);

  // Show the chat button when the component mounts
  useEffect(() => {
    console.log("ChatAssistant mounted, setting up visibility timeout");
    // Show a welcome toast sooner to make users aware of the assistant
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        toast({
          title: "Chat Assistant Available",
          description: "Ask about our menu, make reservations, or get information about special offers.",
          duration: 5000,
        });
        
        console.log("Displayed chat assistant toast notification");
      }
    }, 2000); // Reduced from 3000ms to 2000ms
    
    return () => clearTimeout(timer);
  }, []);

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleToggleChat = () => {
    setIsOpen(true);
    console.log("Chat toggled, isOpen set to:", true);
  };

  return (
    <>
      {/* Chat toggle button - Always rendered with fixed position and high z-index */}
      <ChatToggleButton onClick={handleToggleChat} />

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

const ChatAssistant = () => {
  // Add console log to verify the component is rendering
  console.log('Rendering ChatAssistant component');
  
  // Force the chat button to be visible regardless of CSS
  useEffect(() => {
    // Short delay to ensure DOM is ready
    setTimeout(() => {
      const chatButton = document.getElementById('chat-toggle-button');
      if (chatButton) {
        console.log("Found chat button by ID, ensuring visibility");
        chatButton.style.opacity = "1";
        chatButton.style.transform = "translateY(0)";
        chatButton.classList.add("opacity-100");
        chatButton.classList.remove("opacity-0", "translate-y-10");
      } else {
        console.warn("Chat button not found in DOM");
      }
    }, 1500);
  }, []);
  
  return (
    <ChatProvider>
      <ChatAssistantInner />
    </ChatProvider>
  );
};

export default ChatAssistant;
