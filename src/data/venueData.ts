
export interface Venue {
  id: string;
  name: string;
  capacity: number;
  shortDescription: string;
  description: string;
  imageSrc: string;
  features: string[];
}

export const venues: Venue[] = [
  {
    id: "ambrosia",
    name: "Ambrosia Hall",
    capacity: 150,
    shortDescription: "Our grand dining hall for large celebrations",
    description: "Our grand dining hall for large gatherings, conferences, and celebrations with exquisite decor and state-of-the-art facilities.",
    imageSrc: "/venues/ambrosia.jpg",
    features: [
      "Capacity for up to 150 guests",
      "Full-scale catering",
      "Advanced AV equipment",
      "Private entrance",
      "Customizable layout"
    ]
  },
  {
    id: "symphony",
    name: "Symphony Room",
    capacity: 30,
    shortDescription: "An intimate private dining room",
    description: "An intimate private dining room for smaller gatherings featuring elegant ambiance and personalized service.",
    imageSrc: "/venues/symphony.jpg",
    features: [
      "Capacity for up to 30 guests",
      "Custom menu options",
      "Private waitstaff",
      "Ambient mood lighting",
      "Wine pairing service"
    ]
  },
  {
    id: "savoria",
    name: "Savoria Hall",
    capacity: 50,
    shortDescription: "A versatile space for medium-sized events",
    description: "A versatile space for medium-sized events and business meetings with flexible seating arrangements.",
    imageSrc: "/venues/savoria.jpg",
    features: [
      "Capacity for up to 50 guests",
      "Business presentation facilities",
      "Private bar option",
      "Customizable décor",
      "Free WiFi and tech support"
    ]
  },
  {
    id: "culinary",
    name: "Culinary Garden",
    capacity: 80,
    shortDescription: "Beautiful outdoor dining space",
    description: "Beautiful outdoor dining space (weather permitting) surrounded by lush greenery and ambient lighting.",
    imageSrc: "/venues/garden.jpg",
    features: [
      "Capacity for up to 80 guests",
      "Al fresco dining",
      "Garden party setup",
      "Weather contingency plans",
      "Natural lighting for photography"
    ]
  },
  {
    id: "euphoria",
    name: "Euphoria Lounge",
    capacity: 40,
    shortDescription: "Modern cocktail and tasting experience",
    description: "Modern cocktail lounge with premium spirits and tasting menus, perfect for social gatherings and networking events.",
    imageSrc: "/venues/euphoria.jpg",
    features: [
      "Capacity for up to 40 guests",
      "Craft cocktail service",
      "Small plate offerings",
      "Mixology demonstrations",
      "Ambient music system"
    ]
  }
];
