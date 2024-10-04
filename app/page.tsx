// import { getProducts } from "./lib/clover-api";
import CartPage from "./cart/page";
import { ProductCard } from "./components/ProductCard";

export default async function Home() {
  // const products = await getProducts();

  const products = [
    {
      id: "1",
      name: "Product 1",
      description: "This is the first product",
      price: 100,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Product 2",
      description: "This is the second product",
      price: 200,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Product 3",
      description: "This is the third product",
      price: 300,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>
        <CartPage />
      </div>
    </div>
  );
}
