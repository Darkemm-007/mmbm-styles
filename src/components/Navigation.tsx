import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo.png";

interface NavigationProps {
  cartCount?: number;
}

const Navigation = ({ cartCount = 0 }: NavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinkClass = (path: string) => 
    `text-sm font-medium transition-smooth hover:text-primary ${
      isActive(path) ? "text-primary" : "text-muted-foreground"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="MMBM Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col items-start">
              <h1 className="text-xl font-bold tracking-tight text-primary">MMBM STYLE</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">COME LET'S STYLE YOU UP</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/catalog" className={navLinkClass("/catalog")}>
              Shop
            </Link>
            <Link to="/contact" className={navLinkClass("/contact")}>
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <a href="tel:0509613436" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth">
              <Phone className="h-4 w-4" />
              <span>0509613436</span>
            </a>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around pb-4 border-t pt-2">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/catalog" className={navLinkClass("/catalog")}>
            Shop
          </Link>
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
