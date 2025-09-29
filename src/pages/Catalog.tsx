import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard, { Product } from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Catalog = () => {
  const { addToCart, cartCount } = useCart();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");

  const categories = ["All", "Men", "Women", "Shoes", "Accessories"];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  const newProducts = products.filter((p) => p.isNew);
  const bestsellers = products.filter((p) => p.isBestseller);

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated selection of fashion items. Reserve now and pay when you collect or receive delivery.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* New Arrivals Section */}
        {selectedCategory === "All" && newProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onReserve={addToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* Bestsellers Section */}
        {selectedCategory === "All" && bestsellers.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Bestsellers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onReserve={addToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onReserve={addToCart}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Catalog;
