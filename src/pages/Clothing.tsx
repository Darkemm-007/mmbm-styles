import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Clothing = () => {
  const { addToCart } = useCart();
  const [selectedGender, setSelectedGender] = useState<"Men" | "Women">("Men");

  const menProducts = products.filter((p) => p.category === "Men");
  const womenProducts = products.filter((p) => p.category === "Women");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Clothing Collection
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium clothing for men and women
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={selectedGender} onValueChange={(value) => setSelectedGender(value as "Men" | "Women")} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="Men">Men's Clothing</TabsTrigger>
              <TabsTrigger value="Women">Women's Clothing</TabsTrigger>
            </TabsList>

            <TabsContent value="Men">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onReserve={addToCart}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Women">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {womenProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onReserve={addToCart}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Clothing;
