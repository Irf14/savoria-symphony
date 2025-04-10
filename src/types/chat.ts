
export interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
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

export type CuisineMenu = {
  id: string;
  name: string;
  description: string;
  image: string;
  sections: MenuSection[];
};

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
  price: number;
  image?: string;
  isSignature?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isRecommended?: boolean;
  ingredients?: string[];
  allergens?: string[];
};

export type Variants = {
  [key: string]: {
    [key: string]: any;
  }
};

export type Variant = {
  [key: string]: any;
};
