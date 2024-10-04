import { getOrderById } from "@/app/lib/clover-api";
import { Order } from "@/app/types";

interface OrderConfirmationPageProps {
  params: { id: string };
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const orderId = params.id;
  let order: Order;

  try {
    order = await getOrderById(orderId);
  } catch (error) {
    console.error("Error fetching order:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
        <p className="text-red-500">
          Error: Unable to fetch order details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Thank you for your order!
        </h2>
        <p className="mb-4">Order ID: {order.id}</p>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Order Details:</h3>
          {order.items.map((item) => (
            <div key={item.item.id} className="flex justify-between mb-2">
              <span>
                {item.item.name} x {item.quantity}
              </span>
              <span>${(item.price / 100).toFixed(2)}</span>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Total: ${(order.total / 100).toFixed(2)}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Shipping Address:</h3>
          <p>{order.shippingAddress.address1}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </p>
          <p>{order.shippingAddress.country}</p>
        </div>
        <p className="text-gray-600">
          A confirmation email has been sent to {order.customer.email}.
          We&apos;ll notify you when your order has shipped.
        </p>
      </div>
    </div>
  );
}
