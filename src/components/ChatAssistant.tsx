
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, Loader2, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

// Menu data for recommendations
const venueOptions = [
  { name: "Savoria Hall", capacity: 50, description: "Intimate dining hall for small to medium gatherings" },
  { name: "Ambrosia Hall", capacity: 150, description: "Grand dining hall for large events and celebrations" },
  { name: "Symphony Room", capacity: 30, description: "Private dining room for intimate gatherings" },
  { name: "Culinary Garden", capacity: 80, description: "Beautiful outdoor dining space (weather permitting)" }
];

// Simple NLP matching rules for basic intent recognition
const intentRules = [
  { keywords: ['reserve', 'book', 'reservation'], intent: 'reservation' },
  { keywords: ['menu', 'food', 'dish', 'cuisine'], intent: 'menu' },
  { keywords: ['contact', 'call', 'email', 'phone'], intent: 'contact' },
  { keywords: ['hall', 'venue', 'event', 'space', 'room', 'ambrosia', 'savoria', 'symphony', 'garden'], intent: 'venue' },
  { keywords: ['people', 'guests', 'persons', 'capacity'], intent: 'capacity' },
  { keywords: ['gallery', 'photos', 'images', 'pictures'], intent: 'gallery' },
  { keywords: ['time', 'open', 'closed', 'when', 'hour'], intent: 'hours' }
];

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastUserIntent, setLastUserIntent] = useState('');
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
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Helper to handle menu navigation
  const navigateToMenu = (cuisine?: string) => {
    setIsOpen(false);
    if (cuisine) {
      navigate(`/menu/${cuisine.toLowerCase()}`);
    } else {
      navigate('/menu');
    }
  };

  // Helper to handle reservation
  const navigateToReservation = () => {
    setIsOpen(false);
    navigate('/reservation');
    toast({
      title: "Redirecting to Reservations",
      description: "You're being taken to our reservation page.",
      duration: 3000
    });
  };

  // Extract intent from user message using simple NLP rules
  const extractIntent = (message: string): { intent: string; confidence: number; entities: Record<string, any> } => {
    const lowercaseMsg = message.toLowerCase();
    const entities: Record<string, any> = {};
    
    // Extract capacity numbers
    const capacityMatch = lowercaseMsg.match(/(\d+)\s*(people|person|guests|capacity)/i);
    if (capacityMatch) {
      entities.capacity = parseInt(capacityMatch[1], 10);
    }
    
    // Extract cuisine types
    const cuisineTypes = ['thai', 'chinese', 'indian', 'bengali', 'continental'];
    for (const cuisine of cuisineTypes) {
      if (lowercaseMsg.includes(cuisine)) {
        entities.cuisine = cuisine;
        break;
      }
    }
    
    // Check for venue mentions
    const venueNames = ['ambrosia', 'savoria hall', 'symphony', 'garden'];
    for (const venue of venueNames) {
      if (lowercaseMsg.includes(venue)) {
        entities.venue = venue;
        break;
      }
    }
    
    // Match against our intent rules
    let highestScore = 0;
    let matchedIntent = 'unknown';
    
    for (const rule of intentRules) {
      const matchedKeywords = rule.keywords.filter(keyword => lowercaseMsg.includes(keyword));
      const score = matchedKeywords.length / rule.keywords.length;
      
      if (score > highestScore) {
        highestScore = score;
        matchedIntent = rule.intent;
      }
    }
    
    // If we have capacity entities but no clear intent, likely venue-related
    if (entities.capacity && matchedIntent === 'unknown') {
      matchedIntent = 'venue';
    }
    
    // Transform short questions into intents
    if (lowercaseMsg.startsWith('how') && lowercaseMsg.includes('reserve')) matchedIntent = 'reservation';
    if (lowercaseMsg.startsWith('where') && lowercaseMsg.includes('find')) matchedIntent = 'navigation';
    if (lowercaseMsg.startsWith('what') && (lowercaseMsg.includes('menu') || lowercaseMsg.includes('food'))) matchedIntent = 'menu';
    
    return { 
      intent: matchedIntent, 
      confidence: highestScore,
      entities 
    };
  };

  // Generate an AI response based on intent and entities
  const generateResponse = async (userMessage: string, intent: string, entities: Record<string, any>): Promise<string> => {
    // For demo, we're simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store the user's intent for context in conversation
    setLastUserIntent(intent);
    
    // Handle based on intent
    switch (intent) {
      case 'reservation':
        if (entities.capacity) {
          const people = entities.capacity;
          
          if (people > 100) {
            return `For a party of ${people} people, I recommend our Ambrosia Hall which can accommodate up to 150 guests. Would you like to make a reservation? Click here to proceed to our reservation page.`;
          } else if (people > 50) {
            return `For a party of ${people} people, I recommend our Culinary Garden (weather permitting) which can accommodate up to 80 guests, or Ambrosia Hall for indoor events. Would you like to make a reservation?`;
          } else {
            return `For a party of ${people} people, both our Savoria Hall (50 guests) and Symphony Room (30 guests) would be suitable. Would you like to proceed with a reservation?`;
          }
        }
        return "I'd be happy to help you make a reservation. How many people will be dining with us, and what date and time are you considering?";
        
      case 'menu':
        if (entities.cuisine) {
          return `Our ${entities.cuisine.charAt(0).toUpperCase() + entities.cuisine.slice(1)} menu features delicious authentic dishes. Would you like to view the ${entities.cuisine} menu?`;
        }
        return "We offer various cuisines including Thai, Chinese, Indian, Bengali and Continental. Which cuisine would you like to explore?";
        
      case 'venue':
        if (entities.capacity) {
          const people = entities.capacity;
          let recommendedVenues = venueOptions.filter(v => v.capacity >= people);
          
          if (recommendedVenues.length === 0) {
            if (people > 150) {
              return "For groups larger than 150 people, we recommend our Ambrosia Hall which can accommodate up to 150 guests. For larger events, please contact us directly to discuss custom arrangements.";
            }
            recommendedVenues = venueOptions;
          }
          
          const venueList = recommendedVenues.map(v => `${v.name} (up to ${v.capacity} guests)`).join(', ');
          return `For a party of ${people} people, we recommend: ${venueList}. Would you like more information or to book a venue?`;
        }
        
        if (entities.venue) {
          const venue = venueOptions.find(v => v.name.toLowerCase().includes(entities.venue));
          if (venue) {
            return `${venue.name} can accommodate up to ${venue.capacity} guests. ${venue.description}. Would you like to make a reservation?`;
          }
        }
        
        return "We have several venues: Savoria Hall (50 guests), Ambrosia Hall (150 guests), Symphony Room (30 guests), and Culinary Garden (80 guests, outdoor). Which one interests you?";
        
      case 'contact':
        return "You can reach us at contact@savoria.com or call us at (555) 123-4567. Our operating hours are 11 AM to 11 PM every day. How else can I assist you?";
        
      case 'gallery':
        return "Would you like to view our gallery showcasing our cuisine, venues, and past events? I can take you to our gallery page.";
        
      case 'hours':
        return "Savoria is open daily from 11 AM to 11 PM. Last orders are taken at 10:30 PM. Our reservation desk is available from 9 AM to 9 PM daily.";
        
      default:
        // Try to make sense of common questions
        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
          return "Hello! Welcome to Savoria. How can I assist you today?";
        }
        
        if (userMessage.toLowerCase().includes('thank')) {
          return "You're welcome! Is there anything else I can help you with?";
        }
        
        if (userMessage.toLowerCase().includes('bye') || userMessage.toLowerCase().includes('goodbye')) {
          return "Thank you for chatting with me! Have a wonderful day, and we hope to see you at Savoria soon.";
        }
        
        return "I'm not sure I understand. Would you like to know about our menu, make a reservation, or learn about our special venues?";
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Process the message to determine intent
    const { intent, confidence, entities } = extractIntent(inputValue);
    console.log('Detected intent:', intent, 'with confidence:', confidence, 'entities:', entities);
    
    // If we have low confidence but specific entities, we can still help
    let finalIntent = intent;
    if (confidence < 0.3 && Object.keys(entities).length > 0) {
      if (entities.cuisine) finalIntent = 'menu';
      if (entities.capacity) finalIntent = 'venue';
      if (entities.venue) finalIntent = 'venue';
    }
    
    try {
      // Get AI response
      const responseText = await generateResponse(inputValue, finalIntent, entities);
      
      // Add response with a slight delay to seem more natural
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: responseText,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsProcessing(false);
        
        // Handle automatic actions based on conversation flow
        if (finalIntent === 'menu' && responseText.includes('Would you like to view the')) {
          const actionButton = document.createElement('button');
          actionButton.textContent = 'View Menu';
          actionButton.onclick = () => navigateToMenu(entities.cuisine);
          // In a real implementation, we'd render this button in the UI
        }
        
        if (responseText.includes('proceed with a reservation') || 
            responseText.includes('make a reservation')) {
          const actionButton = document.createElement('button');
          actionButton.textContent = 'Make Reservation';
          actionButton.onclick = () => navigateToReservation();
          // In a real implementation, we'd render this button in the UI
        }
      }, 800);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        timestamp: new Date()
      }]);
      setIsProcessing(false);
    }
  };

  // Handle action buttons in responses
  const handleActionClick = (action: string, param?: string) => {
    switch (action) {
      case 'viewMenu':
        navigateToMenu(param);
        break;
      case 'makeReservation':
        navigateToReservation();
        break;
      case 'viewGallery':
        setIsOpen(false);
        navigate('/gallery');
        break;
      case 'contact':
        setIsOpen(false);
        navigate('/contact');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gold hover:bg-gold/90 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-black border border-gold/20 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat header */}
            <div className="p-3 bg-gradient-to-r from-black to-zinc-900 border-b border-gold/20 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-gold rounded-full p-1.5">
                  <Bot size={18} className="text-black" />
                </div>
                <h3 className="font-playfair text-lg text-white">Savoria Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-gold/80 to-gold/90 text-black'
                          : 'bg-zinc-900 border border-zinc-700 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      
                      {/* Action buttons for assistant responses */}
                      {message.sender === 'assistant' && (
                        <div className="mt-2 space-x-2">
                          {/* Reservation CTA */}
                          {message.text.includes('reservation') && message.text.toLowerCase().includes('would you like') && (
                            <button
                              onClick={() => handleActionClick('makeReservation')}
                              className="text-xs bg-gold/30 hover:bg-gold/50 text-white px-2 py-1 rounded transition-colors"
                            >
                              Make Reservation
                            </button>
                          )}
                          
                          {/* View menu CTA */}
                          {message.text.includes('view the') && message.text.includes('menu') && (
                            <button
                              onClick={() => {
                                const cuisineMatch = message.text.match(/view the (\w+) menu/i);
                                if (cuisineMatch && cuisineMatch[1]) {
                                  handleActionClick('viewMenu', cuisineMatch[1].toLowerCase());
                                } else {
                                  handleActionClick('viewMenu');
                                }
                              }}
                              className="text-xs bg-gold/30 hover:bg-gold/50 text-white px-2 py-1 rounded transition-colors"
                            >
                              View Menu
                            </button>
                          )}
                          
                          {/* Gallery CTA */}
                          {message.text.includes('gallery') && (
                            <button
                              onClick={() => handleActionClick('viewGallery')}
                              className="text-xs bg-gold/30 hover:bg-gold/50 text-white px-2 py-1 rounded transition-colors"
                            >
                              View Gallery
                            </button>
                          )}
                          
                          {/* Contact CTA */}
                          {message.text.includes('contact@savoria.com') && (
                            <button
                              onClick={() => handleActionClick('contact')}
                              className="text-xs bg-gold/30 hover:bg-gold/50 text-white px-2 py-1 rounded transition-colors"
                            >
                              Contact Us
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white">
                      <div className="flex items-center space-x-2">
                        <Loader2 size={16} className="animate-spin text-gold" />
                        <p className="text-sm text-gray-400">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input area */}
            <div className="p-3 border-t border-gold/20 bg-black">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold/50"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !inputValue.trim()}
                  className="bg-gold hover:bg-gold/90 text-black p-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                How can I help with your dining experience today?
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
