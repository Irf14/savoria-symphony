
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, Loader2, MessageSquare, Calendar, Home, PhoneCall, Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

// Restaurant data to provide context to the AI
const RESTAURANT_INFO = {
  name: "SAVORIA Symphony",
  description: "An exclusive fine dining restaurant offering five distinct cuisines: Thai, Chinese, Indian, Bengali, and Continental.",
  address: "123 Gourmet Avenue, Culinary District, Foodie City 12345",
  phone: "+1 (555) 123-4567",
  email: "contact@savoria.com",
  openingHours: "Monday to Sunday: 11 AM - 11 PM",
  reservationHours: "9 AM - 9 PM",
  cuisines: [
    { name: "Thai", description: "Authentic Thai cuisine with aromatic herbs and spices" },
    { name: "Chinese", description: "Traditional Chinese dishes with perfect harmony of flavors" },
    { name: "Indian", description: "Rich and flavorful Indian cuisine with diverse regional specialties" },
    { name: "Bengali", description: "Subtle and artistic Bengali cuisine featuring seafood and regional delicacies" },
    { name: "Continental", description: "Sophisticated European flavors from across the continent" }
  ],
  venues: [
    { name: "Ambrosia Hall", capacity: 150, description: "Our grand dining hall for large gatherings, conferences, and celebrations" },
    { name: "Symphony Room", capacity: 30, description: "An intimate private dining room for smaller gatherings" },
    { name: "Savoria Hall", capacity: 50, description: "A versatile space for medium-sized events and business meetings" },
    { name: "Culinary Garden", capacity: 80, description: "Beautiful outdoor dining space (weather permitting)" }
  ],
  specialOffers: [
    { name: "Weekend Special", description: "Four-course menu for two with complimentary wine pairing (Friday-Saturday)" },
    { name: "Chef's Table Experience", description: "Exclusive dining with personalized service from our executive chef" },
    { name: "Seasonal Tasting Menu", description: "Limited-time menu featuring the freshest seasonal ingredients" }
  ],
  popularDishes: [
    { name: "Butter Chicken", cuisine: "Indian", price: "$26" },
    { name: "Pad Thai", cuisine: "Thai", price: "$22" },
    { name: "Peking Duck", cuisine: "Chinese", price: "$38" },
    { name: "Beef Wellington", cuisine: "Continental", price: "$42" },
    { name: "Ilish Bhapa", cuisine: "Bengali", price: "$32" }
  ]
};

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

async function processWithAI(userMessage: string, messageHistory: Message[]): Promise<string> {
  try {
    // Format the conversation history for the AI
    const context = `
You are the AI assistant for ${RESTAURANT_INFO.name} restaurant. 
Here's important information about the restaurant:
- Description: ${RESTAURANT_INFO.description}
- Address: ${RESTAURANT_INFO.address}
- Contact: ${RESTAURANT_INFO.phone}, ${RESTAURANT_INFO.email}
- Hours: ${RESTAURANT_INFO.openingHours}
- Reservation Hours: ${RESTAURANT_INFO.reservationHours}
- Cuisines: ${RESTAURANT_INFO.cuisines.map(c => `${c.name} (${c.description})`).join(', ')}
- Special Venues: ${RESTAURANT_INFO.venues.map(v => `${v.name} (capacity: ${v.capacity}, ${v.description})`).join(', ')}
- Special Offers: ${RESTAURANT_INFO.specialOffers.map(o => `${o.name}: ${o.description}`).join(', ')}
- Popular Dishes: ${RESTAURANT_INFO.popularDishes.map(d => `${d.name} (${d.cuisine}, ${d.price})`).join(', ')}

You should always be helpful, polite, and professional. For reservations, you should collect: date, time, number of guests, and customer contact information. For menu inquiries, you can recommend dishes based on cuisine preferences.

Keep responses concise but informative. If you need to help with specific tasks like making a reservation, viewing the menu, or contacting the restaurant, mention that you can help navigate to the appropriate section of the website.
`;

    // Convert conversation history
    const conversationHistory = messageHistory.slice(-6).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Use the OpenAI-compatible interface for flexibility
    // In a real application, this would call an actual OpenAI endpoint
    // For this demo, we'll simulate an AI response based on pattern matching
    // In production, this would be replaced with a real API call
    
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic pattern matching to simulate AI responses
    let response = "";
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
      response = "I'd be happy to help you make a reservation. Could you please provide your preferred date, time, and the number of guests? Once you share these details, I can guide you through completing your reservation.";
    } 
    else if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dish')) {
      if (lowerMessage.includes('thai')) {
        response = "Our Thai menu features favorites like Pad Thai, Tom Yum Soup, and Green Curry. Would you like me to help you navigate to our Thai menu section?";
      } else if (lowerMessage.includes('indian')) {
        response = "Our Indian menu includes delicious dishes like Butter Chicken, Lamb Biryani, and Paneer Tikka. Would you like me to show you our complete Indian menu?";
      } else if (lowerMessage.includes('chinese')) {
        response = "Our Chinese menu features dishes like Peking Duck, Kung Pao Chicken, and Dim Sum platters. Would you like to explore our Chinese menu section?";
      } else if (lowerMessage.includes('bengali')) {
        response = "Our Bengali menu includes specialties like Ilish Bhapa, Kosha Mangsho, and Chingri Malaikari. I can show you our full Bengali menu if you'd like.";
      } else if (lowerMessage.includes('continental')) {
        response = "Our Continental menu features European classics like Beef Wellington, Coq au Vin, and Risotto ai Funghi. Would you like to see our complete Continental offerings?";
      } else {
        response = "We offer five distinct cuisines: Thai, Chinese, Indian, Bengali, and Continental. Which cuisine would you like to explore, or would you prefer to see our most popular dishes across all cuisines?";
      }
    }
    else if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
      response = `${RESTAURANT_INFO.name} is open ${RESTAURANT_INFO.openingHours}. Our reservation desk is available from ${RESTAURANT_INFO.reservationHours}. Is there a specific day you're planning to visit?`;
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      response = `You can reach us at ${RESTAURANT_INFO.phone} or via email at ${RESTAURANT_INFO.email}. Would you like me to help you navigate to our contact page for more information?`;
    }
    else if (lowerMessage.includes('address') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      response = `We're located at ${RESTAURANT_INFO.address}. Would you like directions or help with transportation options?`;
    }
    else if (lowerMessage.includes('venue') || lowerMessage.includes('event') || lowerMessage.includes('party') || lowerMessage.includes('space')) {
      response = `We have several special venues available: ${RESTAURANT_INFO.venues.map(v => `${v.name} (capacity: ${v.capacity})`).join(', ')}. For larger events, our Ambrosia Hall can accommodate up to 150 guests. Would you like more information about any of these venues?`;
    }
    else if (lowerMessage.includes('special') || lowerMessage.includes('offer') || lowerMessage.includes('deal')) {
      response = `We currently have several special offers: ${RESTAURANT_INFO.specialOffers.map(o => o.name).join(', ')}. Our Weekend Special is particularly popular, offering a four-course menu for two with complimentary wine pairing. Would you like details about any of these offers?`;
    }
    else if (lowerMessage.includes('recommend') || lowerMessage.includes('suggestion') || lowerMessage.includes('popular')) {
      response = `Some of our most popular dishes include ${RESTAURANT_INFO.popularDishes.map(d => `${d.name} (${d.cuisine})`).join(', ')}. Our chef particularly recommends the Butter Chicken from our Indian menu and the Beef Wellington from our Continental offerings. Would you like recommendations for a specific cuisine?`;
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `Hello! Welcome to ${RESTAURANT_INFO.name}. I'm your virtual assistant and can help with reservations, menu information, special venues, or any questions about our restaurant. How may I assist you today?`;
    }
    else if (lowerMessage.includes('thank')) {
      response = "You're welcome! Is there anything else I can help you with regarding our restaurant, menu, or reservations?";
    }
    else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      response = `Thank you for chatting with me! We hope to welcome you to ${RESTAURANT_INFO.name} soon. Have a wonderful day!`;
    }
    else {
      response = `Welcome to ${RESTAURANT_INFO.name}! I can help you with reservations, menu information, special venue bookings, or answer questions about our restaurant. What would you like to know about our five cuisines (Thai, Chinese, Indian, Bengali, and Continental) or our dining experience?`;
    }
    
    return response;
  } catch (error) {
    console.error("AI processing error:", error);
    return "I'm sorry, I'm having trouble processing your request at the moment. Please try again or contact the restaurant directly at " + RESTAURANT_INFO.phone;
  }
}

// Define action types for better organization
type ActionType = 'viewMenu' | 'makeReservation' | 'viewGallery' | 'contact' | 'viewVenues';

interface ActionButton {
  type: ActionType;
  label: string;
  parameter?: string;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello! I'm Savoria's virtual assistant. How can I help you today? You can ask about our menu, make a reservation, or inquire about our special venues.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<ActionButton[]>([
    { type: 'viewMenu', label: 'View Menu' },
    { type: 'makeReservation', label: 'Make Reservation' }
  ]);
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

  // Extract actions from message
  const getActionsFromMessage = (text: string): ActionButton[] => {
    const actions: ActionButton[] = [];
    
    if (text.toLowerCase().includes('menu')) {
      // Check if a specific cuisine is mentioned
      const cuisines = ['thai', 'chinese', 'indian', 'bengali', 'continental'];
      const mentionedCuisine = cuisines.find(cuisine => 
        text.toLowerCase().includes(cuisine)
      );
      
      actions.push({ 
        type: 'viewMenu', 
        label: mentionedCuisine 
          ? `View ${mentionedCuisine.charAt(0).toUpperCase() + mentionedCuisine.slice(1)} Menu` 
          : 'View Menu',
        parameter: mentionedCuisine
      });
    }
    
    if (text.toLowerCase().includes('reservation') || 
        text.toLowerCase().includes('book') || 
        text.toLowerCase().includes('reserve')) {
      actions.push({ type: 'makeReservation', label: 'Make Reservation' });
    }
    
    if (text.toLowerCase().includes('contact') || 
        text.toLowerCase().includes('call') || 
        text.toLowerCase().includes('email') ||
        text.toLowerCase().includes('phone')) {
      actions.push({ type: 'contact', label: 'Contact Us' });
    }
    
    if (text.toLowerCase().includes('gallery') || 
        text.toLowerCase().includes('photo') || 
        text.toLowerCase().includes('image') ||
        text.toLowerCase().includes('picture')) {
      actions.push({ type: 'viewGallery', label: 'View Gallery' });
    }
    
    if (text.toLowerCase().includes('venue') || 
        text.toLowerCase().includes('hall') || 
        text.toLowerCase().includes('event space') ||
        text.toLowerCase().includes('ambrosia') ||
        text.toLowerCase().includes('symphony')) {
      actions.push({ type: 'viewVenues', label: 'Explore Venues' });
    }
    
    return actions;
  };

  // Helper to handle menu navigation
  const navigateToMenu = (cuisine?: string) => {
    setIsOpen(false);
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
  };

  // Helper to handle reservation
  const navigateToReservation = () => {
    setIsOpen(false);
    navigate('/reservation');
    toast({
      title: "Make a Reservation",
      description: "You're being taken to our reservation page.",
      duration: 3000
    });
  };

  // Helper to handle venue navigation
  const navigateToVenues = () => {
    setIsOpen(false);
    navigate('/special-services');
    toast({
      title: "Explore Venues",
      description: "Discover our special venues for events and celebrations.",
      duration: 3000
    });
  };

  // Helper to handle contact
  const navigateToContact = () => {
    setIsOpen(false);
    navigate('/contact');
    toast({
      title: "Contact Information",
      description: "You can find all our contact details here.",
      duration: 3000
    });
  };

  // Helper to handle gallery
  const navigateToGallery = () => {
    setIsOpen(false);
    navigate('/gallery');
    toast({
      title: "Photo Gallery",
      description: "Explore images of our restaurant, food, and events.",
      duration: 3000
    });
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
    
    try {
      // Process with AI
      const aiResponse = await processWithAI(inputValue, messages);
      
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
        sender: 'assistant',
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again or contact the restaurant directly at " + RESTAURANT_INFO.phone,
        timestamp: new Date()
      }]);
      setIsProcessing(false);
    }
  };

  // Handle action buttons in responses
  const handleActionClick = (action: ActionType, param?: string) => {
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

            {/* Quick action buttons */}
            {!isProcessing && suggestedActions.length > 0 && (
              <div className="px-4 py-2 border-t border-zinc-800 flex gap-2 overflow-x-auto">
                {suggestedActions.map((action, index) => (
                  <button
                    key={`${action.type}-${index}`}
                    onClick={() => handleActionClick(action.type, action.parameter)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gold/20 hover:bg-gold/30 text-white text-sm rounded whitespace-nowrap transition-colors"
                  >
                    {action.type === 'viewMenu' && <Menu className="w-4 h-4 mr-1" />}
                    {action.type === 'makeReservation' && <Calendar className="w-4 h-4 mr-1" />}
                    {action.type === 'contact' && <PhoneCall className="w-4 h-4 mr-1" />}
                    {action.type === 'viewGallery' && <Calendar className="w-4 h-4 mr-1" />}
                    {action.type === 'viewVenues' && <Home className="w-4 h-4 mr-1" />}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}

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
