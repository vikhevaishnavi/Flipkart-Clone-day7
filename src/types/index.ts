export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  brand: string;
  minRating: number;
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'rating';
}