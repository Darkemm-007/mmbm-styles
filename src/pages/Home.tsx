import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt, ShoppingBag, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import heroImage from "@/assets/hero-fashion.jpg";

const Home = () => {
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen">
      <Navigation cartCount={cartCount} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient opacity-60" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Reserve Your Style,<br />Pay on Pickup
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Browse our exclusive collection, reserve what you love, and pay when you collect or receive delivery.
            </p>
            <Link to="/catalog">
              <Button size="lg" variant="hero" className="text-lg h-14 px-8">
                Let's Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Start Shopping Prompt */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Start Shopping</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Click below to explore our full collection of clothing available to purchase.
          </p>
          <Link to="/catalog">
            <Button size="lg" variant="hero" className="text-lg h-14 px-10">
              Let's Shop
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reserve & Pay Later</h3>
              <p className="text-muted-foreground">
                Hold your items and pay only when you're ready to collect
              </p>
            </div>
            
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">
                Carefully curated fashion pieces for every style
              </p>
            </div>
            
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Shirt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pickup or Delivery</h3>
              <p className="text-muted-foreground">
                Choose what works best for you - we deliver or you collect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Upgrade Your Style?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust MMBM STYLE for their fashion needs
          </p>
          <Link to="/catalog">
            <Button size="lg" variant="hero" className="text-lg h-14 px-8">
              Browse Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MMBM STYLE</h3>
              <p className="text-sm opacity-90">
                COME LET'S STYLE YOU UP
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link to="/catalog" className="hover:opacity-100 transition-opacity">Shop</Link></li>
                <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
                <li><Link to="/cart" className="hover:opacity-100 transition-opacity">Cart</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>📞 0503561270</li>
                <li>📧 Clothingmmbm@gmail.com</li>
              </ul>
              <p className="text-sm opacity-90">we deliver to👌🏽</p>
              <ul className="space-y-2 text-sm opacity-90">
                <li>📍Accra</li>
                <li>📍Kumasi</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-90">
            <p>&copy; 2025 MMBM STYLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
