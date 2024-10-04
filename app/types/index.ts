export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Order {
  id: string;
  total: number;
  items: {
    item: { id: string; name: string };
    quantity: number;
    price: number;
  }[];
  customer: {
    email: string;
  };
  shippingAddress: {
    address1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}
