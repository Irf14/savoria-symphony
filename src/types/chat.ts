
export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  
  // Maintaining backwards compatibility with old code using sender/text
  sender?: 'user' | 'assistant';
  text?: string;
}

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface SuggestedAction {
  text: string;
  action: () => void;
}

export type ActionType = 'viewMenu' | 'makeReservation' | 'contact' | 'viewGallery' | 'viewVenues';

export interface ActionButton {
  type: ActionType;
  label: string;
  parameter?: string;
}
