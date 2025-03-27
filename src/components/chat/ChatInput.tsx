
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useChat } from './ChatContext';

const ChatInput: React.FC = () => {
  const { addMessage, inputValue, setInputValue, isLoading, setIsLoading } = useChat();

  const getResponse = async (query: string) => {
    setIsLoading(true);
    
    // Simulate AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowercaseQuery = query.toLowerCase();
    
    let response = '';
    
    // Simple pattern matching for common restaurant questions
    if (lowercaseQuery.includes('menu') || lowercaseQuery.includes('food') || lowercaseQuery.includes('dish') || lowercaseQuery.includes('cuisine')) {
      response = "Our menu features a variety of exquisite cuisines including Mediterranean, Asian Fusion, Continental, and special seasonal dishes. Would you like to explore our signature dishes or any specific cuisine?";
    } 
    else if (lowercaseQuery.includes('reservation') || lowercaseQuery.includes('book') || lowercaseQuery.includes('table')) {
      response = "You can make a reservation through our website's reservation page. We recommend booking at least 2 days in advance for weekdays and 5 days for weekends. Would you like me to guide you to the reservation page?";
    } 
    else if (lowercaseQuery.includes('location') || lowercaseQuery.includes('address') || lowercaseQuery.includes('where')) {
      response = "Savoria is located at 123 Gourmet Avenue, Culinary District. We're open Monday to Sunday, 11:00 AM to 11:00 PM. Our location is easily accessible and has valet parking available.";
    } 
    else if (lowercaseQuery.includes('event') || lowercaseQuery.includes('party') || lowercaseQuery.includes('catering') || lowercaseQuery.includes('venue')) {
      response = "We offer special venue services for private events, celebrations, and corporate gatherings. Our dedicated event planning team can customize the experience to your preferences. Would you like more information about our venue services?";
    } 
    else if (lowercaseQuery.includes('hours') || lowercaseQuery.includes('open') || lowercaseQuery.includes('time')) {
      response = "Savoria is open daily from 11:00 AM to 11:00 PM. Our bar stays open until midnight on Fridays and Saturdays. The kitchen stops taking orders at 10:30 PM.";
    } 
    else if (lowercaseQuery.includes('hello') || lowercaseQuery.includes('hi') || lowercaseQuery.includes('hey')) {
      response = "Hello! Welcome to Savoria. How may I assist you today? I can help with menu information, reservations, special venues, or any other inquiries about our restaurant.";
    } 
    else {
      response = "Thank you for your question. At Savoria, we strive to provide an exceptional dining experience. Could you provide more details about what you're looking for, or would you like information about our menu, reservations, or special venue services?";
    }
    
    setIsLoading(false);
    addMessage(response, 'assistant');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      addMessage(inputValue, 'user');
      getResponse(inputValue);
      setInputValue('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gold/20 p-3 bg-black/50"
    >
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          placeholder="Type your question..."
          className="flex-1 bg-black/50 border border-gold/30 rounded-md p-2 text-white focus:outline-none focus:ring-1 focus:ring-gold placeholder:text-white/50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="bg-gold hover:bg-gold/90 disabled:bg-gold/50 disabled:cursor-not-allowed text-black rounded-md p-2 transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
