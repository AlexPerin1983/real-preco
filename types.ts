export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category?: string;
  subcategory?: string;
  warning?: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export enum View {
  Shop,
  Cart,
  Checkout,
  Confirmation,
}