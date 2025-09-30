import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { CheckCircle } from "lucide-react";

const Checkout = () => {
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryMethod: "pickup",
    paymentMethod: "cash",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate order ID
    const newOrderId = `MMBM-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    
    // Format items for WhatsApp message
    const itemsList = cart.map((item) => {
      let itemText = `• ${item.name} (Qty: ${item.quantity})`;
      if (item.selectedSize || item.selectedColor) {
        itemText += ` - ${[item.selectedSize, item.selectedColor].filter(Boolean).join(', ')}`;
      }
      itemText += ` - GH₵ ${(item.price * item.quantity).toFixed(2)}`;
      return itemText;
    }).join('\n');
    
    // Create WhatsApp message
    const message = `*New Reservation - ${newOrderId}*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      (formData.email ? `Email: ${formData.email}\n` : '') +
      `\n*Order Details:*\n${itemsList}\n\n` +
      `*Total: GH₵ ${cartTotal.toFixed(2)}*\n\n` +
      `*Delivery:* ${formData.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'}\n` +
      (formData.address ? `Address: ${formData.address}\n` : '') +
      `*Payment:* ${formData.paymentMethod === 'cash' ? 'Cash' : 'Mobile Money'}\n` +
      (formData.notes ? `\nNotes: ${formData.notes}` : '');
    
    // Send to WhatsApp
    const whatsappUrl = `https://wa.me/233503561270?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show confirmation screen
    setOrderConfirmed(true);
    toast.success("Opening WhatsApp to confirm reservation!");
  };

  const handleNewOrder = () => {
    clearCart();
    navigate("/catalog");
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  // Order Confirmation Receipt
  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation cartCount={cartCount} />
        
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <Card className="border-2">
            <CardContent className="p-8">
              {/* Logo Header */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b">
                <img src={logo} alt="MMBM Logo" className="h-24 w-24 mb-4" />
                <h1 className="text-2xl font-bold text-primary">MMBM STYLE</h1>
                <p className="text-sm text-muted-foreground">COME LET'S STYLE YOU UP</p>
              </div>

              {/* Success Message */}
              <div className="flex flex-col items-center mb-6 pb-6 border-b">
                <CheckCircle className="h-16 w-16 text-green-600 mb-3" />
                <h2 className="text-2xl font-bold mb-2">Reservation Confirmed!</h2>
                <p className="text-center text-muted-foreground">
                  Thank you for your reservation. We'll contact you shortly to confirm.
                </p>
              </div>

              {/* Order Details */}
              <div className="mb-6 pb-6 border-b">
                <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="text-xl font-bold text-primary">{orderId}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-semibold">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-semibold">{formData.phone}</p>
                  </div>
                  {formData.email && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-semibold">{formData.email}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-muted-foreground">Delivery Method</p>
                    <p className="font-semibold capitalize">{formData.deliveryMethod}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-semibold">{formData.paymentMethod === "cash" ? "Cash" : "Mobile Money"}</p>
                  </div>
                  {formData.address && (
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Address</p>
                      <p className="font-semibold">{formData.address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-bold mb-4">Reserved Items</h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-xs text-muted-foreground">
                            {[item.selectedSize, item.selectedColor].filter(Boolean).join(' • ')}
                          </p>
                        )}
                      </div>
                      <p className="font-bold">GH₵ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">GH₵ {cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Payment due on {formData.deliveryMethod === "pickup" ? "pickup" : "delivery"}
                </p>
              </div>

              {/* Contact Info */}
              <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                <p className="font-semibold mb-2">Contact Us</p>
                <p className="text-sm">📞 0503561270</p>
                <p className="text-sm">📧 Clothingmmbm@gmail.com</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Reservation valid for 24-48 hours
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button onClick={() => window.print()} variant="outline" className="flex-1">
                  Print Receipt
                </Button>
                <Button onClick={handleNewOrder} variant="hero" className="flex-1">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation cartCount={cartCount} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Complete Your Reservation</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="0503561270"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => setFormData({ ...formData, deliveryMethod: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="cursor-pointer">
                        Pickup (Free)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="cursor-pointer">
                        Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {formData.deliveryMethod === "delivery" && (
                    <div className="mt-4">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        required
                        placeholder="Enter your delivery address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="cursor-pointer">
                        Cash (Pay on {formData.deliveryMethod === "pickup" ? "Pickup" : "Delivery"})
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="momo" id="momo" />
                      <Label htmlFor="momo" className="cursor-pointer">
                        Mobile Money (Pay on {formData.deliveryMethod === "pickup" ? "Pickup" : "Delivery"})
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special requests or information?"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </CardContent>
              </Card>
              
              <Button type="submit" size="lg" variant="hero" className="w-full">
                Confirm Reservation
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        {(item.selectedSize || item.selectedColor) && (
                          <p className="text-xs text-muted-foreground">
                            {[item.selectedSize, item.selectedColor].filter(Boolean).join(' • ')}
                          </p>
                        )}
                        <p className="text-sm font-bold text-primary">
                          GH₵ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold mb-4">
                    <span>Total</span>
                    <span className="text-primary">GH₵ {cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Reservation valid for 24-48 hours. We'll contact you to confirm.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
