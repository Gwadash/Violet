export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface FilterState {
  category: string[];
  minPrice: number;
  maxPrice: number;
  sort: 'newest' | 'price-asc' | 'price-desc';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}