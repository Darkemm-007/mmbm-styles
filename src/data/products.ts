import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  // Men's Clothing
  {
    id: "m1",
    name: "Classic Slim Fit Shirt",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    category: "Men",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Blue", "Black"],
    isNew: true,
  },
  {
    id: "m2",
    name: "Premium Denim Jeans",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    category: "Men",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    isBestseller: true,
  },
  {
    id: "m3",
    name: "Casual Polo Shirt",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Grey", "Burgundy"],
  },
  
  // Women's Tomboy Collection
  {
    id: "w1",
    name: "Oversized Graphic Tee",
    price: 95.00,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    category: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Grey"],
    isNew: true,
    isBestseller: true,
  },
  {
    id: "w2",
    name: "Utility Cargo Pants",
    price: 155.00,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    category: "Women",
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Khaki", "Black", "Olive"],
    isBestseller: true,
  },
  {
    id: "w3",
    name: "Boyfriend Denim Jacket",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    category: "Women",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Wash", "Dark Wash", "Black"],
    isNew: true,
  },
  
];
