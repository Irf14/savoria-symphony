
import { ActionButton } from '@/types/chat';

// Extract actions from message
export const getActionsFromMessage = (text: string): ActionButton[] => {
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
