
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  rating?: number;
  chefsChoice?: boolean;
};

export type MenuSection = {
  name: string;
  items: MenuItem[];
  backgroundImage: string;
};

export type CuisineMenu = {
  id: string;
  name: string;
  description: string;
  sections: MenuSection[];
  backgroundImage: string;
};
