import { CartItem } from "../types";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      {items.map((item) => (
        <div key={item.product.id} className="flex justify-between mb-2">
          <span>
            {item.product.name} x {item.quantity}
          </span>
          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="text-xl font-bold mt-4 border-t pt-2">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}
