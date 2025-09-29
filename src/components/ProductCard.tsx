import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ProductCardProps {
  product: Product;
  onReserve: (product: Product) => void;
}

const ProductCard = ({ product, onReserve }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-lg">
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-smooth group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              New
            </Badge>
          )}
          {product.isBestseller && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Bestseller
            </Badge>
          )}
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-xl font-bold text-primary">GH₵ {product.price.toFixed(2)}</p>
        
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-2 flex gap-1 flex-wrap">
            {product.sizes.slice(0, 4).map((size) => (
              <span key={size} className="text-xs px-2 py-1 bg-secondary rounded">
                {size}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          variant="hero"
          onClick={() => onReserve(product)}
        >
          Reserve Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
