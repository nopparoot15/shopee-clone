export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  rating: number;
  sold: number;
  shopName: string;
  location: string;
  category: string;
  stock: number;
  description: string;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}
