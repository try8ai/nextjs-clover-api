"use client";

import { useCartStore } from "../lib/store";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem } = useCartStore();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
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
                <p>Price: ${(item.product.price * item.quantity).toFixed(2)}</p>
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
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <Link
              href="/checkout"
              className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
