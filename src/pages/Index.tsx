
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Product } from '@/components/ProductCard';
import { toast } from 'sonner';

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const products: Product[] = [
    {
      id: "1",
      name: "Chen Rui 48 Colors Set",
      description: "Perfect starter set with a broad range of essential colors. Ideal for beginners and hobbyists.",
      price: 34.99,
      image: "/lovable-uploads/52f8aea2-090f-43ab-a928-945cb9e31062.png",
      colors: 48
    },
    {
      id: "2",
      name: "Chen Rui 60 Colors Set",
      description: "Extended color palette with additional hues for more versatile artwork and creative projects.",
      price: 43.99,
      image: "/lovable-uploads/e4fb0ade-f9a4-4ac7-90f2-59bc913c7249.png",
      colors: 60
    },
    {
      id: "3",
      name: "Chen Rui 80 Colors Set",
      description: "Comprehensive set for professionals with a wide spectrum of colors for advanced techniques.",
      price: 59.99,
      image: "/lovable-uploads/9c19dd5e-e031-47b6-98f2-674eed9661bc.png",
      colors: 80
    },
    {
      id: "4",
      name: "Chen Rui 120 Colors Set",
      description: "Ultimate collection with the complete color range. Studio-grade quality for serious artists.",
      price: 79.99,
      image: "/lovable-uploads/42b91411-ce6d-4aa1-9385-99563bb9e62e.png",
      colors: 120
    }
  ];

  const addToCart = (product: Product) => {
    if (!cartItems.some(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
      toast.success(`${product.name} added to cart`);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  // Add smooth scroll behavior
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" richColors />
      <Navbar cartItemCount={cartItems.length} openCart={() => setIsCartOpen(true)} />
      <Hero />
      <Features />
      <Products products={products} cartItems={cartItems} addToCart={addToCart} />
      <Gallery />
      <Testimonials />
      <Footer />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
    </div>
  );
};

export default Index;
