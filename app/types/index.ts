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
}
