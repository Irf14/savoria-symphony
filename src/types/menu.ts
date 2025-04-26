
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

// Add missing ActionButton and ActionType types
export type ActionType = 'viewMenu' | 'makeReservation' | 'contact' | 'viewGallery' | 'viewVenues';

export interface ActionButton {
  type: ActionType;
  label: string;
  parameter?: string;
}

export type CuisineMenu = {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  backgroundImage: string;
  sections: MenuSection[];
}

export interface Cuisine {
  id: string;
  name: string;
  description: string;
  image: string;
  background: string;
  backgroundImage?: string;
  logoIcon?: string;
  sections: MenuSection[];
}

export type MenuSection = {
  id: string;
  name: string;
  description: string;
  backgroundImage: string;
  items: MenuItem[];
};

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number | string;
  image?: string;
  isSignature?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isRecommended?: boolean;
  ingredients?: string[];
  allergens?: string[];
  rating?: number;
  chefsChoice?: boolean;
};

export type Variants = {
  [key: string]: {
    [key: string]: any;
  }
};

export type Variant = {
  [key: string]: any;
};
