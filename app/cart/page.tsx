"use client";

import React, { useState } from "react";
import { useCartStore } from "../../lib/store";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";
import { createOrder } from "@/lib/clover-api";
import { createOrderCartLineItems } from "@/lib/utils";
import { useOrderStore } from "@/lib/order-store";

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const { setOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleCheckout = async () => {
    setIsLoading(true);
    const orderItem = {
      orderCart: {
        lineItems: createOrderCartLineItems(items),
      },
    };
    try {
      const newOrder = await createOrder(orderItem);
      setOrder(newOrder);

      router.push(`/checkout`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <MoveLeft className="h-5 w-5 mr-2" />
        Back
      </button>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b py-4"
            >
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: $
                  {((item.product.price / 100) * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">
              Total: ${(total / 100).toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              {isLoading ? "Loading..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
