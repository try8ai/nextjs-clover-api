import { CartIcon } from "@/components/CartIcon";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../lib/clover-api";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

        <CartIcon />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
