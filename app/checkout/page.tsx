"use client";

import { useCartStore } from "../../lib/store";
import CheckoutForm from "../../components/CheckoutForm";
import { MoveLeft } from "lucide-react";
import { useOrderStore } from "@/lib/order-store";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const { order } = useOrderStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
        >
          <MoveLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <p>Your cart is empty. Please add some items before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <button
        onClick={() => router.back()}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <MoveLeft className="h-5 w-5 mr-2" />
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CheckoutForm />
        </div>
        <div className="md:w-1/3">
          {order ? (
            <OrderSummary order={order} />
          ) : (
            <p>Loading order summary...</p>
          )}
        </div>
      </div>
    </div>
  );
}
