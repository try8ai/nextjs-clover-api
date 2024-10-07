export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Order {
  id: string;
  currency: string;
  total: number;
  state: string;
  createdTime: number;
  lineItems: {
    elements: LineItem[];
  };
  // Add other relevant fields as needed
}

export interface LineItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderCart {
  lineItems: LineItem[];
}

export interface CreateOrderRequest {
  orderCart: OrderCart;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderSummaryProps {
  order: Order;
}
