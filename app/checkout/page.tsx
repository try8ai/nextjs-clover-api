"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "../../lib/store";
import CheckoutForm from "../../components/CheckoutForm";
import OrderSummary from "../../components/OrderSummary";
import { createOrder } from "../../lib/clover-api";
import { MoveLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = items.reduce(
    (sum, item) => sum + (item.product.price / 100) * item.quantity,
    0
  );

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    const orderData = {
      total: total * 100, // Convert to cents for Clover API
      items: items.map((item) => ({
        item: { id: item.product.id, name: item.product.name },
        quantity: item.quantity,
        price: item.product.price, // Convert to cents
      })),
      customer: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
      },
      shippingAddress: {
        address1: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zip: formData.get("zip") as string,
        country: formData.get("country") as string,
      },
    };

    try {
      const order = await createOrder(orderData);
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      console.error("Checkout error:", err);
      setError("An error occurred during checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <CheckoutForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
        <div className="md:w-1/3">
          <OrderSummary items={items} total={total} />
        </div>
      </div>
    </div>
  );
}
