export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: 'Unisex' | 'Women' | 'Men';
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface WishlistItem {
  id: number;
}
