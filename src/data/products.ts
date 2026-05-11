import { Product } from "@/components/ProductCard";
import classicTshirt from "@/assets/mmbm-classic-tshirt.jpeg";
import crazyCroppedTshirt from "@/assets/mmbm-crazy-cropped-tshirt.jpeg";

export const products: Product[] = [
  {
    id: "u1",
    name: "MMBM classic t-shirt",
    price: 200.00,
    image: classicTshirt,
    category: "Unisex",
    sizes: ["M", "L", "XL", "2XL", "3XL"],
    colors: ["White", "Brown", "Black"],
    isNew: true,
  },
  {
    id: "u2",
    name: "MMBM Crazy cropped t-shirt",
    price: 200.00,
    image: crazyCroppedTshirt,
    category: "Unisex",
    sizes: ["Free size"],
    colors: ["Black"],
    isNew: true,
  },
  {
    id: "u3",
    name: "MMBM Classic hoodie",
    price: 250.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    category: "Unisex",
    sizes: ["2XL", "3XL", "4XL"],
    colors: ["Pink", "Black"],
  },
  {
    id: "u4",
    name: "MMBM Stylish hoodie",
    price: 300.00,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    category: "Unisex",
    sizes: ["Free size"],
    colors: ["Red"],
  },
];
