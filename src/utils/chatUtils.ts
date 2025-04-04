
import { Message } from '@/types/chat';

// Enhanced restaurant data to provide detailed context to the AI
export const RESTAURANT_INFO = {
  name: "SAVORIA Symphony",
  description: "An exclusive fine dining restaurant offering five distinct cuisines: Thai, Chinese, Indian, Bengali, and Continental.",
  address: "123 Gourmet Avenue, Culinary District, Foodie City 12345",
  phone: "+1 (555) 123-4567",
  email: "contact@savoria.com",
  openingHours: "Monday to Sunday: 11 AM - 11 PM",
  reservationHours: "9 AM - 9 PM",
  cuisines: [
    { name: "Thai", description: "Authentic Thai cuisine with aromatic herbs and spices", 
      specialties: ["Pad Thai", "Tom Yum Soup", "Green Curry", "Mango Sticky Rice"] },
    { name: "Chinese", description: "Traditional Chinese dishes with perfect harmony of flavors",
      specialties: ["Peking Duck", "Kung Pao Chicken", "Dim Sum", "Mapo Tofu"] },
    { name: "Indian", description: "Rich and flavorful Indian cuisine with diverse regional specialties",
      specialties: ["Butter Chicken", "Biryani", "Paneer Tikka", "Rogan Josh"] },
    { name: "Bengali", description: "Subtle and artistic Bengali cuisine featuring seafood and regional delicacies",
      specialties: ["Ilish Bhapa", "Kosha Mangsho", "Chingri Malaikari", "Mishti Doi"] },
    { name: "Continental", description: "Sophisticated European flavors from across the continent",
      specialties: ["Beef Wellington", "Coq au Vin", "Risotto ai Funghi", "Crème Brûlée"] }
  ],
  venues: [
    { name: "Ambrosia Hall", capacity: 150, description: "Our grand dining hall for large gatherings, conferences, and celebrations" },
    { name: "Symphony Room", capacity: 30, description: "An intimate private dining room for smaller gatherings" },
    { name: "Savoria Hall", capacity: 50, description: "A versatile space for medium-sized events and business meetings" },
    { name: "Culinary Garden", capacity: 80, description: "Beautiful outdoor dining space (weather permitting)" }
  ],
  specialOffers: [
    { name: "Weekend Special", description: "Four-course menu for two with complimentary wine pairing (Friday-Saturday)", price: "$120" },
    { name: "Chef's Table Experience", description: "Exclusive dining with personalized service from our executive chef", price: "$200 per person" },
    { name: "Seasonal Tasting Menu", description: "Limited-time menu featuring the freshest seasonal ingredients", price: "$95 per person" },
    { name: "Business Lunch", description: "Three-course express lunch with coffee (Mon-Fri, 12-3pm)", price: "$45" }
  ],
  popularDishes: [
    { name: "Butter Chicken", cuisine: "Indian", price: "$26", description: "Tender chicken in a rich tomato, butter, and cream sauce" },
    { name: "Pad Thai", cuisine: "Thai", price: "$22", description: "Stir-fried rice noodles with eggs, tofu, bean sprouts, and crushed peanuts" },
    { name: "Peking Duck", cuisine: "Chinese", price: "$38", description: "Roasted duck known for its thin, crispy skin, served with pancakes" },
    { name: "Beef Wellington", cuisine: "Continental", price: "$42", description: "Tenderloin wrapped in puff pastry with mushroom duxelles" },
    { name: "Ilish Bhapa", cuisine: "Bengali", price: "$32", description: "Hilsa fish steamed with mustard paste in banana leaf" }
  ],
  chefRecommendations: [
    { name: "Chef's Signature Lamb Shank", price: "$38", description: "Slow-cooked for 8 hours with Mediterranean herbs" },
    { name: "Truffle Risotto", price: "$34", description: "Arborio rice with wild mushrooms and fresh black truffle" }
  ],
  drinks: {
    wines: ["Château Margaux 2015", "Dom Pérignon 2008", "Opus One 2018"],
    cocktails: ["Golden Symphony", "Savoria Sunset", "Thai Basil Smash"],
    nonAlcoholic: ["Fresh Fruit Mocktails", "Premium Tea Selection", "Artisanal Coffee"]
  },
  reservationInfo: {
    minimumNotice: "2 hours in advance",
    largeGroups: "For groups of 8+, please call directly",
    specialRequests: "We accommodate dietary restrictions with 24-hour notice"
  },
  staff: {
    executiveChef: "Chef Alessandro Romano",
    manager: "Sarah Thompson",
    sommelier: "Jean-Pierre Dubois"
  },
  websitePages: {
    home: "Overview of our restaurant with featured dishes and ambiance images",
    menu: "Five separate cuisine menus with pricing and descriptions",
    gallery: "Photos of our interior, dishes, and events",
    reservation: "Online reservation system with date/time selection",
    contact: "Contact details, hours, location map, and inquiry form", 
    specialServices: "Information on private dining, events, and catering services"
  }
};

export async function processWithAI(userMessage: string, messageHistory: Message[]): Promise<string> {
  try {
    // Format the conversation history for the AI with enhanced context
    const context = `
You are the AI assistant for ${RESTAURANT_INFO.name} restaurant. 
Here's important information about the restaurant:

BASIC INFORMATION:
- Description: ${RESTAURANT_INFO.description}
- Address: ${RESTAURANT_INFO.address}
- Contact: ${RESTAURANT_INFO.phone}, ${RESTAURANT_INFO.email}
- Hours: ${RESTAURANT_INFO.openingHours}
- Reservation Hours: ${RESTAURANT_INFO.reservationHours}

MENU & CUISINES:
${RESTAURANT_INFO.cuisines.map(c => `- ${c.name}: ${c.description}
  * Specialties: ${c.specialties.join(', ')}`).join('\n')}

VENUES FOR EVENTS:
${RESTAURANT_INFO.venues.map(v => `- ${v.name}: Capacity ${v.capacity}, ${v.description}`).join('\n')}

SPECIAL OFFERS:
${RESTAURANT_INFO.specialOffers.map(o => `- ${o.name} (${o.price}): ${o.description}`).join('\n')}

POPULAR DISHES:
${RESTAURANT_INFO.popularDishes.map(d => `- ${d.name} (${d.cuisine}, ${d.price}): ${d.description}`).join('\n')}

CHEF RECOMMENDATIONS:
${RESTAURANT_INFO.chefRecommendations.map(r => `- ${r.name} (${r.price}): ${r.description}`).join('\n')}

DRINKS:
- Wines: ${RESTAURANT_INFO.drinks.wines.join(', ')}
- Cocktails: ${RESTAURANT_INFO.drinks.cocktails.join(', ')}
- Non-Alcoholic: ${RESTAURANT_INFO.drinks.nonAlcoholic.join(', ')}

RESERVATION INFORMATION:
- Minimum notice: ${RESTAURANT_INFO.reservationInfo.minimumNotice}
- Large groups: ${RESTAURANT_INFO.reservationInfo.largeGroups}
- Special requests: ${RESTAURANT_INFO.reservationInfo.specialRequests}

KEY STAFF:
- Executive Chef: ${RESTAURANT_INFO.staff.executiveChef}
- Manager: ${RESTAURANT_INFO.staff.manager}
- Sommelier: ${RESTAURANT_INFO.staff.sommelier}

WEBSITE PAGES:
${Object.entries(RESTAURANT_INFO.websitePages).map(([key, value]) => `- ${key}: ${value}`).join('\n')}

You should always be helpful, polite, and professional. For reservations, you should collect: date, time, number of guests, and customer contact information. For menu inquiries, you can recommend dishes based on cuisine preferences.

Keep responses concise but informative. If you need to help with specific tasks like making a reservation, viewing the menu, or contacting the restaurant, mention that you can help navigate to the appropriate section of the website.
`;

    // Convert conversation history
    const conversationHistory = messageHistory.slice(-6).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Enhanced pattern matching to simulate more intelligent AI responses
    let response = "";
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('reserve')) {
      if (lowerMessage.includes('today') || lowerMessage.includes('tonight')) {
        response = "I'd be happy to help you make a reservation for today. Our availability is limited for same-day bookings, so let me check what times we have open. Could you please tell me how many people will be in your party and your preferred dining time?";
      } else if (lowerMessage.includes('private') || lowerMessage.includes('event') || lowerMessage.includes('party')) {
        response = `For private events, we have several beautiful venues available: Ambrosia Hall (capacity: 150), Symphony Room (capacity: 30), and Savoria Hall (capacity: 50). For outdoor events, our Culinary Garden can host up to 80 guests, weather permitting. Would you like to inquire about availability for a specific date? I can help you navigate to our special services page for more details.`;
      } else {
        response = "I'd be happy to help you make a reservation. Could you please provide your preferred date, time, and the number of guests? Also, do you have any special requests or dietary restrictions we should be aware of? Once you share these details, I can check availability and help you complete your reservation.";
      }
    } 
    else if (lowerMessage.includes('menu') || lowerMessage.includes('food') || lowerMessage.includes('dish')) {
      if (lowerMessage.includes('thai')) {
        response = "Our Thai menu features favorites like Pad Thai ($22), Tom Yum Soup ($16), Green Curry ($24), and Mango Sticky Rice ($12) for dessert. Our chef recommends the Green Curry with prawns, featuring authentic Thai herbs and spices imported weekly. Would you like me to help you navigate to our Thai menu section?";
      } else if (lowerMessage.includes('indian')) {
        response = "Our Indian menu includes delicious dishes like Butter Chicken ($26), Lamb Biryani ($28), Paneer Tikka ($20), and Rogan Josh ($30). All our Indian dishes are prepared with house-ground spice blends and can be adjusted to your preferred spice level. Would you like to explore our complete Indian menu?";
      } else if (lowerMessage.includes('chinese')) {
        response = "Our Chinese menu features dishes like Peking Duck ($38), Kung Pao Chicken ($24), Dim Sum platters ($22), and Mapo Tofu ($18). Our chef uses traditional techniques and the finest ingredients, including imported specialty items from China. Would you like to navigate to our Chinese menu section?";
      } else if (lowerMessage.includes('bengali')) {
        response = "Our Bengali menu includes specialties like Ilish Bhapa ($32), Kosha Mangsho ($28), Chingri Malaikari ($30), and Mishti Doi ($10). These authentic dishes highlight the subtle flavors and artistic preparations of traditional Bengali cuisine. I can show you our full Bengali menu if you'd like.";
      } else if (lowerMessage.includes('continental')) {
        response = "Our Continental menu features European classics like Beef Wellington ($42), Coq au Vin ($36), Risotto ai Funghi ($30), and Crème Brûlée ($14) for dessert. Our executive chef, Alessandro Romano, brings authentic European techniques and modern presentations to each dish. Would you like to see our complete Continental offerings?";
      } else if (lowerMessage.includes('recommend') || lowerMessage.includes('best') || lowerMessage.includes('popular')) {
        response = `Our most popular dishes include Butter Chicken from our Indian menu ($26), Pad Thai from our Thai menu ($22), and Beef Wellington from our Continental menu ($42). For special experiences, I recommend our Chef's Table Experience ($200 per person), where Chef Alessandro prepares a custom multi-course menu tableside. Would you like to see more recommendations for a specific cuisine?`;
      } else {
        response = "We offer five distinct cuisines: Thai, Chinese, Indian, Bengali, and Continental. Each cuisine has its own dedicated chef specializing in authentic preparations. Would you like me to tell you about a specific cuisine's offerings, or would you prefer to see our chef's recommendations across all cuisines?";
      }
    }
    else if (lowerMessage.includes('hour') || lowerMessage.includes('open') || lowerMessage.includes('time')) {
      response = `${RESTAURANT_INFO.name} is open ${RESTAURANT_INFO.openingHours}. Our reservation desk is available from ${RESTAURANT_INFO.reservationHours}. For large groups of 8 or more, we recommend making reservations at least 48 hours in advance. Would you like me to help you check availability for a specific date and time?`;
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
      response = `You can reach us at ${RESTAURANT_INFO.phone} or via email at ${RESTAURANT_INFO.email}. For urgent matters, please call us directly. Our manager, Sarah Thompson, is available during business hours to address any special requirements. Would you like me to help you navigate to our contact page for more information?`;
    }
    else if (lowerMessage.includes('address') || lowerMessage.includes('location') || lowerMessage.includes('where')) {
      response = `We're located at ${RESTAURANT_INFO.address}. We're conveniently situated in the heart of the Culinary District, with valet parking available. Public transportation options include the Metro Line 5 (Culinary District Station) just a 5-minute walk away. Would you like directions from your location or help with transportation options?`;
    }
    else if (lowerMessage.includes('venue') || lowerMessage.includes('event') || lowerMessage.includes('party') || lowerMessage.includes('space')) {
      response = `We have several special venues available for private events: ${RESTAURANT_INFO.venues.map(v => `${v.name} (capacity: ${v.capacity})`).join(', ')}. Our Ambrosia Hall is perfect for weddings and large celebrations, while the Symphony Room offers an intimate setting for business dinners. All venues can be customized with special decor and menu options. Would you like more information about planning an event with us?`;
    }
    else if (lowerMessage.includes('special') || lowerMessage.includes('offer') || lowerMessage.includes('deal')) {
      response = `We currently have several special offers: ${RESTAURANT_INFO.specialOffers.map(o => `${o.name} (${o.price}): ${o.description}`).join(', ')}. Our Weekend Special is particularly popular for couples celebrating special occasions. For business clients, we offer the Business Lunch on weekdays. Would you like details about any of these offers?`;
    }
    else if (lowerMessage.includes('chef')) {
      response = `Our executive chef is ${RESTAURANT_INFO.staff.executiveChef}, who brings over 20 years of international culinary experience to SAVORIA Symphony. He personally oversees all five cuisine sections and creates our seasonal tasting menus. His signature dish is the slow-cooked lamb shank ($38). Would you like to know more about our culinary team or perhaps book the Chef's Table Experience?`;
    }
    else if (lowerMessage.includes('drink') || lowerMessage.includes('wine') || lowerMessage.includes('cocktail')) {
      response = `Our beverage program features an extensive wine list including premium selections like ${RESTAURANT_INFO.drinks.wines.join(', ')}. Our signature cocktails include ${RESTAURANT_INFO.drinks.cocktails.join(', ')}, each crafted with house-made ingredients. For non-alcoholic options, we offer ${RESTAURANT_INFO.drinks.nonAlcoholic.join(', ')}. Our sommelier, ${RESTAURANT_INFO.staff.sommelier}, can provide perfect pairing suggestions for your meal.`;
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = `Hello! Welcome to ${RESTAURANT_INFO.name}. I'm your virtual assistant and can help with reservations, menu information, special venues, or any questions about our restaurant. We offer five distinct cuisines - Thai, Chinese, Indian, Bengali, and Continental - each prepared by specialized chefs. How may I assist you today?`;
    }
    else if (lowerMessage.includes('thank')) {
      response = "You're welcome! It's my pleasure to assist you. Is there anything else I can help you with regarding our menu, reservations, or special events? We look forward to welcoming you to SAVORIA Symphony soon.";
    }
    else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      response = `Thank you for chatting with me! We hope to welcome you to ${RESTAURANT_INFO.name} soon for an unforgettable dining experience. Have a wonderful day!`;
    }
    else {
      response = `Welcome to ${RESTAURANT_INFO.name}! I can help you explore our five distinct cuisines (Thai, Chinese, Indian, Bengali, and Continental), make reservations, learn about our special offers, or plan private events in our exclusive venues. Each cuisine at SAVORIA Symphony is prepared by a dedicated chef using authentic techniques and the finest ingredients. How can I enhance your dining experience today?`;
    }
    
    return response;
  } catch (error) {
    console.error("AI processing error:", error);
    return "I'm sorry, I'm having trouble processing your request at the moment. Please try again or contact the restaurant directly at " + RESTAURANT_INFO.phone;
  }
}
