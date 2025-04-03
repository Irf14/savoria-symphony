
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  options?: Array<{
    text: string;
    action: () => void;
  }>;
};

// Venues information with more details for better recommendations
const venues = [
  { 
    name: 'Ambrosia', 
    capacity: '80-100 persons',
    description: 'Our grand hall perfect for large gatherings and corporate events',
    idealFor: ['large parties', 'corporate events', 'weddings', 'conferences'],
    path: '/special-services#ambrosia'
  },
  {
    name: 'Euphoria',
    capacity: '35-50 persons',
    description: 'An elegant space for medium-sized celebrations',
    idealFor: ['medium gatherings', 'birthday parties', 'family reunions'],
    path: '/special-services#euphoria'
  },
  {
    name: 'Majestic',
    capacity: '18-20 persons',
    description: 'Our priority room for intimate gatherings',
    idealFor: ['small meetings', 'intimate dinners', 'private celebrations'],
    path: '/special-services#majestic'
  }
];

// Cuisines information with expanded details
const cuisines = [
  { 
    name: 'Thai', 
    path: '/menu/thai',
    specialties: ['Pad Thai', 'Tom Yum Soup', 'Green Curry'],
    keywords: ['spicy', 'aromatic', 'fresh', 'herbs', 'thai', 'exotic']
  },
  { 
    name: 'Chinese', 
    path: '/menu/chinese',
    specialties: ['Peking Duck', 'Dim Sum', 'Kung Pao Chicken'],
    keywords: ['umami', 'stir-fry', 'dim sum', 'chinese', 'asian', 'traditional']
  },
  { 
    name: 'Indian', 
    path: '/menu/indian',
    specialties: ['Butter Chicken', 'Biryani', 'Tandoori'],
    keywords: ['curry', 'spicy', 'rich', 'indian', 'exotic', 'tandoori']
  },
  { 
    name: 'Bengali', 
    path: '/menu/bengali',
    specialties: ['Fish Curry', 'Mishti Doi', 'Shorshe Ilish'],
    keywords: ['fish', 'mustard', 'sweet', 'bengali', 'traditional']
  },
  { 
    name: 'Continental', 
    path: '/menu/continental',
    specialties: ['Beef Wellington', 'Coq au Vin', 'Ratatouille'],
    keywords: ['elegant', 'refined', 'european', 'continental', 'sophisticated']
  }
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    }, 600);
  };
  
  // Improved natural language processing function
  const processNaturalLanguage = (text: string) => {
    text = text.toLowerCase();
    
    // Venue size recognition with improved patterns
    const largeGroupPatterns = [/(\b100\b|\b8[0-9]\b|\b9[0-9]\b|\blarge\b|\bbig\b|\bwedding\b|\bconference\b)/];
    const mediumGroupPatterns = [/(\b[3-5][0-9]\b|\bmedium\b|\bbirthday\b|\bfamily reunion\b)/];
    const smallGroupPatterns = [/(\b1[0-9]\b|\b20\b|\bsmall\b|\bintimate\b|\bprivate\b)/];
    
    // Check for venue size mentions
    if (largeGroupPatterns.some(pattern => pattern.test(text))) {
      return {
        intent: 'venue',
        size: 'large',
        venueRecommendation: venues[0] // Ambrosia for large groups
      };
    } else if (mediumGroupPatterns.some(pattern => pattern.test(text))) {
      return {
        intent: 'venue',
        size: 'medium',
        venueRecommendation: venues[1] // Euphoria for medium groups
      };
    } else if (smallGroupPatterns.some(pattern => pattern.test(text))) {
      return {
        intent: 'venue',
        size: 'small',
        venueRecommendation: venues[2] // Majestic for small groups
      };
    }
    
    // Cuisine preference detection
    for (const cuisine of cuisines) {
      if (text.includes(cuisine.name.toLowerCase()) || 
          cuisine.keywords.some(keyword => text.includes(keyword))) {
        return {
          intent: 'cuisine',
          cuisine: cuisine
        };
      }
    }
    
    // General intent detection
    if (text.includes('menu') || text.includes('cuisine') || text.includes('food') || 
        text.includes('dish') || text.includes('eat') || text.includes('taste')) {
      return { intent: 'cuisine' };
    } else if (text.includes('venue') || text.includes('hall') || text.includes('space') || 
               text.includes('people') || text.includes('persons') || text.includes('capacity') ||
               text.includes('event') || text.includes('party') || text.includes('host')) {
      return { intent: 'venue' };
    } else if (text.includes('booking') || text.includes('reservation') || text.includes('table') ||
               text.includes('reserve')) {
      return { intent: 'reservation' };
    } else if (text.includes('contact') || text.includes('phone') || text.includes('email') || 
               text.includes('call') || text.includes('message') || text.includes('reach')) {
      return { intent: 'contact' };
    } else if (text.includes('vibe') || text.includes('atmosphere') || text.includes('experience') || 
               text.includes('feel') || text.includes('ambience') || text.includes('look')) {
      return { intent: 'ambience' };
    }
    
    // No clear intent detected
    return { intent: 'unknown' };
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
    
    // Process user input with improved NLP
    const nlpResult = processNaturalLanguage(input);
    console.log("NLP Result:", nlpResult);
    
    setTimeout(() => {
      if (nlpResult.intent === 'cuisine') {
        if (nlpResult.cuisine) {
          // Direct cuisine recommendation
          handleSpecificCuisineRecommendation(nlpResult.cuisine);
        } else {
          // General cuisine navigation
          handleCuisineNavigation();
        }
      } else if (nlpResult.intent === 'venue') {
        if (nlpResult.size) {
          // Direct venue recommendation based on detected size
          handleDirectVenueRecommendation(nlpResult.size, nlpResult.venueRecommendation);
        } else {
          // General venue questions
          handleVenueQuestions();
        }
      } else if (nlpResult.intent === 'reservation') {
        handleReservation();
      } else if (nlpResult.intent === 'contact') {
        handleContactInfo();
      } else if (nlpResult.intent === 'ambience') {
        handleAmbience();
      } else {
        // Default response for other queries with more helpful guidance
        const assistantMessage: Message = {
          id: messages.length + 2,
          sender: 'assistant',
          text: "I'm here to help with your dining and event needs. Can you tell me more about what you're looking for? I can assist with our cuisines, venue options, making reservations, or providing contact information.",
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
    }, 800);
  };
  
  // Direct venue recommendation for when size is clearly mentioned
  const handleDirectVenueRecommendation = (size: string, venueRecommendation: any) => {
    const venue = venueRecommendation;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'assistant',
      text: `For a group of your size, I recommend our ${venue.name} venue. ${venue.description} with a capacity of ${venue.capacity}. It's perfect for ${venue.idealFor.join(', ')}.`,
      options: [
        {
          text: `View ${venue.name} details`,
          action: () => {
            setTimeout(() => {
              navigate(venue.path);
              toast({
                title: "Venue Selected",
                description: `You're viewing our ${venue.name} venue information`,
              });
              setIsOpen(false);
            }, 500);
          }
        },
        {
          text: 'Make a reservation now',
          action: () => {
            setTimeout(() => {
              navigate('/reservation');
              toast({
                title: "Reservation Page",
                description: "You can now make your reservation",
              });
              setIsOpen(false);
            }, 500);
          }
        },
        {
          text: 'View all venue options',
          action: () => {
            setTimeout(() => {
              navigate('/special-services');
              toast({
                title: "Special Venues",
                description: "Explore all our special venue options",
              });
              setIsOpen(false);
            }, 500);
          }
        }
      ]
    }]);
  };
  
  // Direct cuisine recommendation
  const handleSpecificCuisineRecommendation = (cuisine: any) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: 'assistant',
      text: `Our ${cuisine.name} cuisine offers exquisite flavors and specialties including ${cuisine.specialties.join(', ')}. Would you like to explore our ${cuisine.name} menu?`,
      options: [
        {
          text: `View ${cuisine.name} menu`,
          action: () => {
            setTimeout(() => {
              navigate(cuisine.path);
              toast({
                title: `${cuisine.name} Menu`,
                description: `Exploring our ${cuisine.name} culinary selection`,
              });
              setIsOpen(false);
            }, 500);
          }
        },
        {
          text: 'Explore all cuisines',
          action: () => handleCuisineNavigation()
        },
        {
          text: 'Make a reservation',
          action: () => {
            setTimeout(() => {
              navigate('/reservation');
              setIsOpen(false);
            }, 500);
          }
        }
      ]
    }]);
  };
  
  // Handle cuisine navigation
  const handleCuisineNavigation = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'We offer five exquisite cuisines at SAVORIA. Each cuisine has its unique specialties. Which would you like to explore?',
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
              text: `Great choice! Our ${cuisine.name} menu features ${cuisine.specialties.join(', ')} and other specialties. I'll take you there now.`,
            }]);
            
            setTimeout(() => {
              navigate(cuisine.path);
              toast({
                title: `${cuisine.name} Menu`,
                description: `Exploring our ${cuisine.name} culinary selection`,
              });
              setIsOpen(false);
            }, 800);
          }, 500);
        }
      }))
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  // Handle venue questions with improved recommendations
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
                toast({
                  title: "Special Venues",
                  description: "Explore all our special venue options",
                });
                setIsOpen(false);
              }, 800);
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
        text: `For a group of that size, I recommend our ${venue.name} venue. ${venue.description} with a capacity of ${venue.capacity}. It's perfect for ${venue.idealFor.join(', ')}.`,
        options: [
          {
            text: `View ${venue.name}`,
            action: () => {
              setTimeout(() => {
                navigate(venue.path);
                toast({
                  title: "Venue Selected",
                  description: `You're viewing our ${venue.name} venue information`,
                });
                setIsOpen(false);
              }, 500);
            }
          },
          {
            text: 'Make a reservation',
            action: () => {
              setTimeout(() => {
                navigate('/reservation');
                toast({
                  title: "Reservation Page",
                  description: "You can now make your reservation",
                });
                setIsOpen(false);
              }, 500);
            }
          },
          {
            text: 'View all venues',
            action: () => {
              setTimeout(() => {
                navigate('/special-services');
                toast({
                  title: "Special Venues",
                  description: "Explore all our special venue options",
                });
                setIsOpen(false);
              }, 500);
            }
          }
        ]
      }]);
    }, 800);
  };
  
  // Handle reservation with more options
  const handleReservation = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'I can help you with reservations. What type of reservation are you interested in?',
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
                text: `I'll take you to our reservation page to book a table. You can select your preferred date, time, and number of guests there.`,
              }]);
              
              setTimeout(() => {
                navigate('/reservation');
                toast({
                  title: "Reservation Page",
                  description: "You can now make your dining reservation",
                });
                setIsOpen(false);
              }, 800);
            }, 500);
          }
        },
        {
          text: 'Venue booking',
          action: () => handleVenueQuestions()
        },
        {
          text: 'Special event',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I want to book for a special event'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `For special events, we recommend contacting our events team directly. They can customize every aspect of your experience.`,
                options: [
                  {
                    text: 'Contact events team',
                    action: () => {
                      setTimeout(() => {
                        navigate('/contact');
                        toast({
                          title: "Contact Page",
                          description: "Reach out to our events team for your special occasion",
                        });
                        setIsOpen(false);
                      }, 500);
                    }
                  },
                  {
                    text: 'View venue options first',
                    action: () => handleVenueQuestions()
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
  
  // Handle contact information
  const handleContactInfo = () => {
    const assistantMessage: Message = {
      id: messages.length + 2,
      sender: 'assistant',
      text: 'Our team is ready to assist you! How would you like to connect with us?',
      options: [
        {
          text: 'View contact details',
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
                text: `I'll take you to our contact page where you'll find all our contact information, location details, and a contact form.`,
              }]);
              
              setTimeout(() => {
                navigate('/contact');
                toast({
                  title: "Contact Page",
                  description: "Find all our contact information here",
                });
                setIsOpen(false);
              }, 800);
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
                text: `For special requests or inquiries, you can reach our manager at (555) 123-4567 or manager@savoria.com. They'll be happy to assist with any concerns or special arrangements.`,
                options: [
                  {
                    text: 'View all contact options',
                    action: () => {
                      setTimeout(() => {
                        navigate('/contact');
                        toast({
                          title: "Contact Page",
                          description: "Find all our contact information here",
                        });
                        setIsOpen(false);
                      }, 500);
                    }
                  },
                  {
                    text: 'Make a reservation',
                    action: () => {
                      setTimeout(() => {
                        navigate('/reservation');
                        setIsOpen(false);
                      }, 500);
                    }
                  }
                ]
              }]);
            }, 500);
          }
        },
        {
          text: 'Events team',
          action: () => {
            setMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'user',
              text: 'I need to speak with the events team'
            }]);
            
            setTimeout(() => {
              setMessages(prev => [...prev, {
                id: prev.length + 1,
                sender: 'assistant',
                text: `Our events team can be reached at events@savoria.com or (555) 987-6543. They specialize in planning and executing flawless special occasions at our venues.`,
                options: [
                  {
                    text: 'View venues',
                    action: () => {
                      setTimeout(() => {
                        navigate('/special-services');
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
      text: 'SAVORIA offers an elegant and luxurious dining atmosphere with thoughtful lighting, sophisticated decor, and immersive cultural touches for each cuisine. Would you like to see our ambience and gallery?',
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
                text: `I'll take you to our gallery to explore the SAVORIA experience through beautiful images that showcase our venues, cuisine, and ambience.`,
              }]);
              
              setTimeout(() => {
                navigate('/gallery');
                toast({
                  title: "Gallery",
                  description: "Explore the visual beauty of SAVORIA",
                });
                setIsOpen(false);
              }, 800);
            }, 500);
          }
        },
        {
          text: 'Experience SAVORIA',
          action: () => {
            navigate('/#ambient');
            toast({
              title: "Ambience Section",
              description: "Discover the unique atmosphere of SAVORIA",
            });
            setIsOpen(false);
          }
        },
        {
          text: 'Make a reservation',
          action: () => {
            setTimeout(() => {
              navigate('/reservation');
              toast({
                title: "Reservation",
                description: "Experience SAVORIA in person",
              });
              setIsOpen(false);
            }, 500);
          }
        }
      ]
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  };
  
  return (
    <>
      {/* Chat button with subtle pulse animation */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black/70 backdrop-blur-lg rounded-full shadow-lg hover:bg-black/80 transition-all duration-300 border border-gold/20 gold-pulse"
        aria-label="Chat with our assistant"
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
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-black/80 backdrop-blur-lg rounded-lg shadow-xl border border-gold/30 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex justify-between items-center">
              <h3 className="text-xl font-playfair text-gold">How can I help?</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Messages */}
            <div className="p-4 h-[400px] overflow-y-auto space-y-4 scrollbar-gold">
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
                      ? 'bg-gold/30 text-white'
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
                          className="py-1 px-3 bg-gold/20 hover:bg-gold/40 rounded text-sm text-gold transition-colors flex items-center gap-1"
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
                  <div className="w-2 h-2 bg-gold/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gold/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gold/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
                  className="p-2 bg-gold/30 hover:bg-gold/40 rounded-lg transition-colors"
                  disabled={!input.trim()}
                  aria-label="Send message"
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
