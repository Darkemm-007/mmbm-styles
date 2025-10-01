import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

const Accessories = () => {
  const { addToCart } = useCart();
  const accessoriesProducts = products.filter((p) => p.category === "Accessories");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Accessories Collection
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Complete your look with our elegant accessories
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {accessoriesProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onReserve={addToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accessories;
