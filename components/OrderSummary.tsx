import { OrderSummaryProps } from "@/types";
import { FC } from "react";

const OrderSummary: FC<OrderSummaryProps> = ({ order }) => {
  // Group items by name and count occurrences
  const groupedItems = order.lineItems.elements.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      {Object.entries(groupedItems).map(([name, count]) => {
        const item = order.lineItems.elements.find((i) => i.name === name);
        if (!item) return null;

        return (
          <div key={name} className="flex justify-between mb-2">
            <span>
              {name} {count > 1 ? ` x ${count}` : " x 1"}
            </span>
            <span>${(item.price / 100).toFixed(2)}</span>
          </div>
        );
      })}
      <div className="text-xl font-bold mt-4 border-t pt-2">
        Total: ${(order.total / 100).toFixed(2)}
      </div>
    </div>
  );
};

export default OrderSummary;
