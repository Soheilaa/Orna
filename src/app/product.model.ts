export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isFavorite?: boolean;
  description?: string;
  image: string; 
  alt?: string;
  metal?:string;
  size?: string[]; 
  sold?: number;
  dateAdded?: string;
  shippingInfo?: string;
}

