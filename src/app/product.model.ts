export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  image: string; 
  size?: string[]; 
  sold?: number;
  dateAdded?: string;
}

