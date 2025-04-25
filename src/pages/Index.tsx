
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
import { Truck } from 'lucide-react';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import CurrencySelector from '@/components/CurrencySelector';

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Initialize Shopify functionality
  useEffect(() => {
    if (window.ShopifyBuy) {
      initShopify();
    } else {
      // The script is already loaded in index.html, but we'll check if it's ready
      const checkInterval = setInterval(() => {
        if (window.ShopifyBuy) {
          clearInterval(checkInterval);
          initShopify();
        }
      }, 100);

      // Clear interval after 10 seconds if still not loaded to avoid memory leaks
      setTimeout(() => clearInterval(checkInterval), 10000);
    }
  }, []);

  const initShopify = () => {
    if (!window.shopifyClient) {
      window.shopifyClient = window.ShopifyBuy.buildClient({
        domain: 'checkout.chenrui.ca',
        storefrontAccessToken: '125f370af7dcf0b5362dad09fbf29769',
      });
      console.log('Shopify client initialized');
    }
  };
  
  const products: Product[] = [
    {
      id: "1",
      name: "Chen Rui 48 Colors Set",
      description: "Perfect starter set with a broad range of essential colors. Ideal for beginners and hobbyists.",
      price: 59.99,
      image: "/lovable-uploads/52f8aea2-090f-43ab-a928-945cb9e31062.png",
      colors: 48
    },
    {
      id: "2",
      name: "Chen Rui 60 Colors Set",
      description: "Extended color palette with additional hues for more versatile artwork and creative projects.",
      price: 79.99,
      image: "/lovable-uploads/e4fb0ade-f9a4-4ac7-90f2-59bc913c7249.png",
      colors: 60
    },
    {
      id: "3",
      name: "Chen Rui 80 Colors Set",
      description: "Comprehensive set for professionals with a wide spectrum of colors for advanced techniques.",
      price: 94.99,
      image: "/lovable-uploads/9c19dd5e-e031-47b6-98f2-674eed9661bc.png",
      colors: 80
    },
    {
      id: "4",
      name: "Chen Rui 120 Colors Set",
      description: "Ultimate collection with the complete color range. Studio-grade quality for serious artists.",
      price: 109.99,
      image: "/lovable-uploads/42b91411-ce6d-4aa1-9385-99563bb9e62e.png",
      colors: 120,
      bestValue: true
    }
  ];

  const addToCart = (product: Product, quantity: number) => {
    // If the product is already in the cart, show a message
    if (cartItems.some(item => item.id === product.id)) {
      toast.info(`${product.name} is already in your cart`);
      return;
    }
    
    // Add the product with quantity to cart
    const productWithQuantity = {
      ...product,
      quantity: quantity
    };
    
    setCartItems([...cartItems, productWithQuantity]);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const updateCartItemQuantity = (productId: string, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
    toast.info("Cart updated");
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
    <CurrencyProvider>
      <div className="min-h-screen">
        <Toaster position="bottom-right" richColors />
        
        {/* Free Delivery Banner with Currency Selector */}
        <div className="bg-marker-green text-white py-2 px-4 text-center font-medium flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Truck className="h-4 w-4" />
            <span>LIMITED TIME: Free Express Delivery on All Orders!</span>
          </div>
          <CurrencySelector />
        </div>
        
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
          updateQuantity={updateCartItemQuantity}
        />
      </div>
    </CurrencyProvider>
  );
};

export default Index;

