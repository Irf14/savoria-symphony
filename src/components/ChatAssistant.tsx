
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  options?: Array<{
    text: string;
    action: () => void;
  }>;
};

// Venues information
const venues = [
  { 
    name: 'Ambrosia', 
    capacity: '80-100 persons',
    description: 'Our grand hall perfect for large gatherings and corporate events',
    path: '/special-services#ambrosia'
  },
  {
    name: 'Euphoria',
    capacity: '35-50 persons',
    description: 'An elegant space for medium-sized celebrations',
    path: '/special-services#euphoria'
  },
  {
    name: 'Majestic',
    capacity: '18-20 persons',
    description: 'Our priority room for intimate gatherings',
    path: '/special-services#majestic'
  }
];

// Cuisines information
const cuisines = [
  { name: 'Thai', path: '/menu/thai' },
  { name: 'Chinese', path: '/menu/chinese' },
  { name: 'Indian', path: '/menu/indian' },
  { name: 'Bengali', path: '/menu/bengali' },
  { name: 'Continental', path: '/menu/continental' }
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  // Auto-scroll to the bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Reset chat when closed
  useEffect(() => {
    if (!isOpen) {
      // Wait for close animation to finish
      const timer = setTimeout(() => {
        setMessages([]);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isOpen && messages.length === 0) {
      // Send greeting when opened
      sendGreeting();
    }
  }, [isOpen]);
  
  const sendGreeting = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          sender: 'assistant',
          text: 'Welcome to SAVORIA! I\'m your personal concierge. How may I assist you today?',
          options: [
            {
              text: 'Explore cuisines',
              action: () => handleCuisineNavigation()
            },
            {
              text: 'Special venues',
              action: () => handleVenueQuestions()
            },
            {
              text: 'Make a reservation',
              action: () => navigate('/reservation')
            },
            {
              text: 'Contact information',
              action: () => navigate('/contact')
            }
          ]
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleUserInput = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Process user input
    const userText = input.toLowerCase();
    setTimeout(() => {
      if (userText.includes('menu') || userText.includes('cuisine') || userText.includes('food') || userText.includes('dish')) {
        handleCuisineNavigation();
      } else if (userText.includes('venue') || userText.includes('hall') || userText.includes('space') || 
                 userText.includes('people') || userText.includes('persons') || userText.includes('capacity')) {
        handleVenueQuestions();
      } else if (userText.includes('booking') || userText.includes('reservation') || userText.includes('table')) {
        handleReservation();
      } else if (userText.includes('contact') || userText.includes('phone') || userText.includes('email') || 
                 userText.includes('call') || userText.includes('message')) {
        handleContactInfo();
      } else if (userText.includes('vibe') || userText.includes('atmosphere') || userText.includes('experience') || 
                 userText.includes('feel') || userText.includes('ambience')) {
        handleAmbience();
      } else {
        // Default response for other queries
        const assistantMessage: Message = {
          id: messages.length + 2,
          sender: 'assistant',
          text: 'I can help you with exploring our cuisines, venues, making reservations, or getting contact information. What would you like to know?',
          options: [
            {
              text: 'Explore cuisines',
              action: () => handleCuisineNavigation()
            },
            {
              text: 'Special venues',
              action: () => handleVenueQuestions()
            },
            {
              text: 'Make a reservation',
              action: () => navigate('/reservation')
            },
            {
              text: 'Contact information',
              action: () => navigate('/contact')
            }
          ]
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
      setIsTyping(false);
    }, 1500);
  };
  
  // Handle cuisine navigation
  const handleCuisineNavigation = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'We offer five exquisite cuisines at SAVORIA. Which would you like to explore?',
      options: cuisines.map(cuisine => ({
        text: cuisine.name,
        action: () => {
          setMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'user',
            text: `I'd like to see the ${cuisine.name} menu`
          }]);
          
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'assistant',
              text: `Great choice! I'll take you to our ${cuisine.name} menu.`,
            }]);
            
            setTimeout(() => {
              navigate(cuisine.path);
              setIsOpen(false);
            }, 1000);
          }, 500);
        }
      }))
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  // Handle venue questions
  const handleVenueQuestions = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'We have three magnificent venues for special occasions. How many guests are you expecting?',
      options: [
        {
          text: 'Large group (80-100)',
          action: () => handleVenueRecommendation('large')
        },
        {
          text: 'Medium group (35-50)',
          action: () => handleVenueRecommendation('medium')
        },
        {
          text: 'Small group (11-20)',
          action: () => handleVenueRecommendation('small')
        },
        {
          text: 'View all venues',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I want to see all venues'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `I'll take you to our special venues page where you can explore all options.`,
              }]);
              
              setTimeout(() => {
                navigate('/special-services');
                setIsOpen(false);
              }, 1000);
            }, 500);
          }
        }
      ]
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  // Handle venue recommendation based on group size
  const handleVenueRecommendation = (size: 'large' | 'medium' | 'small') => {
    let venue;
    let userText;
    
    if (size === 'large') {
      venue = venues[0]; // Ambrosia
      userText = "I need space for 80-100 people";
    } else if (size === 'medium') {
      venue = venues[1]; // Euphoria
      userText = "I need space for 35-50 people";
    } else {
      venue = venues[2]; // Majestic
      userText = "I need space for 11-20 people";
    }
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'user',
      text: userText
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'assistant',
        text: `For a group of that size, I recommend our ${venue.name} venue. ${venue.description} with a capacity of ${venue.capacity}.`,
        options: [
          {
            text: `View ${venue.name}`,
            action: () => {
              setTimeout(() => {
                navigate(venue.path);
                setIsOpen(false);
              }, 500);
            }
          },
          {
            text: 'View all venues',
            action: () => {
              setTimeout(() => {
                navigate('/special-services');
                setIsOpen(false);
              }, 500);
            }
          },
          {
            text: 'Contact for booking',
            action: () => {
              setTimeout(() => {
                navigate('/contact');
                setIsOpen(false);
              }, 500);
            }
          }
        ]
      }]);
    }, 1000);
  };
  
  // Handle reservation
  const handleReservation = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'Would you like to make a dining reservation or book a venue for a special occasion?',
      options: [
        {
          text: 'Dining reservation',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I want to make a dining reservation'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `I'll take you to our reservation page to book a table.`,
              }]);
              
              setTimeout(() => {
                navigate('/reservation');
                setIsOpen(false);
              }, 1000);
            }, 500);
          }
        },
        {
          text: 'Venue booking',
          action: () => handleVenueQuestions()
        }
      ]
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  // Handle contact information
  const handleContactInfo = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'Our team is ready to assist you! Would you like to view our contact details or have any specific questions?',
      options: [
        {
          text: 'View contact page',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I want to see the contact details'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `I'll take you to our contact page.`,
              }]);
              
              setTimeout(() => {
                navigate('/contact');
                setIsOpen(false);
              }, 1000);
            }, 500);
          }
        },
        {
          text: 'Manager contact',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I need the manager\'s contact'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `For special requests or inquiries, you can reach our manager at (555) 123-4567 or manager@savoria.com.`,
                options: [
                  {
                    text: 'View contact page',
                    action: () => {
                      setTimeout(() => {
                        navigate('/contact');
                        setIsOpen(false);
                      }, 500);
                    }
                  }
                ]
              }]);
            }, 500);
          }
        }
      ]
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  // Handle ambience questions
  const handleAmbience = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'SAVORIA offers an elegant and luxurious dining atmosphere. Would you like to see our ambience and gallery?',
      options: [
        {
          text: 'View gallery',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I want to see the gallery'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `I'll take you to our gallery to explore the SAVORIA experience.`,
              }]);
              
              setTimeout(() => {
                navigate('/gallery');
                setIsOpen(false);
              }, 1000);
            }, 500);
          }
        },
        {
          text: 'Experience SAVORIA',
          action: () => {
            navigate('/#ambient');
            setIsOpen(false);
          }
        }
      ]
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black/70 backdrop-blur-lg rounded-full shadow-lg hover:bg-black/80 transition-all duration-300 border border-gold/20"
      >
        <MessageCircle className="w-6 h-6 text-gold" />
      </button>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-black/70 backdrop-blur-lg rounded-lg shadow-xl border border-gold/20 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex justify-between items-center">
              <h3 className="text-xl font-playfair text-gold">How can I help?</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="p-4 h-[400px] overflow-y-auto space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex flex-col",
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  )}
                >
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    message.sender === 'user' 
                      ? 'bg-gold/20 text-white'
                      : 'bg-white/10 text-white'
                  )}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  
                  {message.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={option.action}
                          className="py-1 px-3 bg-gold/20 hover:bg-gold/30 rounded text-sm text-gold transition-colors flex items-center gap-1"
                        >
                          {option.text}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-white/50"
                >
                  <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gold/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            {/* Input */}
            <div className="p-4 border-t border-gold/20">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUserInput();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
                />
                <button 
                  type="submit"
                  className="p-2 bg-gold/20 hover:bg-gold/30 rounded-lg transition-colors"
                  disabled={!input.trim()}
                >
                  <Send className="w-5 h-5 text-gold" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
