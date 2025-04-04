
export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export type ActionType = 'viewMenu' | 'makeReservation' | 'viewGallery' | 'contact' | 'viewVenues';

export interface ActionButton {
  type: ActionType;
  label: string;
  parameter?: string;
}

// Add CuisineMenu type import to fix error
export type { CuisineMenu } from '@/types/menu';
