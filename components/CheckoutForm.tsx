import { FormEvent } from "react";

interface CheckoutFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
  error: string | null;
}

export default function CheckoutForm({
  onSubmit,
  isLoading,
  error,
}: CheckoutFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="firstName" className="block mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="city" className="block mb-2">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="state" className="block mb-2">
          State
        </label>
        <input
          type="text"
          id="state"
          name="state"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="zip" className="block mb-2">
          ZIP Code
        </label>
        <input
          type="text"
          id="zip"
          name="zip"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="country" className="block mb-2">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
      >
        {isLoading ? "Processing..." : "Make Payment"}
      </button>
    </form>
  );
}
