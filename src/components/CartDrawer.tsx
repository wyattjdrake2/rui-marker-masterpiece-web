
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from './ProductCard';
import { toast } from 'sonner';
import CartItem from './cart/CartItem';
import CartSummary from './cart/CartSummary';
import { createNewShopifyCheckout } from '@/utils/shopifyCheckout';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  removeFromCart, 
  clearCart, 
  updateQuantity 
}: CartDrawerProps) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      setIsCheckingOut(false);
    } else {
      setAnimateIn(false);
      setTimeout(() => {
        if (!isOpen) setIsCheckingOut(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsCheckingOut(false);
      }
    };

    const handlePageShow = () => {
      setIsCheckingOut(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    toast.info("Preparing checkout...");

    try {
      const newCheckout = await createNewShopifyCheckout(cartItems);
      
      if (!newCheckout) {
        setIsCheckingOut(false);
        return;
      }
      
      window.shopifyCheckout = newCheckout;
      sessionStorage.setItem('cart_checkout_pending', 'true');
      
      window.location.href = newCheckout.webUrl;
    } catch (error) {
      console.error("Error during checkout process:", error);
      setIsCheckingOut(false);
      sessionStorage.removeItem('cart_checkout_pending');
      toast.error("Failed to redirect to checkout");
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('cart_checkout_pending');
    return () => {
      setIsCheckingOut(false);
    };
  }, []);

  if (!isOpen && !animateIn) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${animateIn ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl transition-transform duration-300 transform ${animateIn ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Your Cart
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-gray-500 mt-2">Looks like you haven't added any items yet</p>
              <Button 
                className="mt-6 bg-marker-green hover:bg-marker-green/90"
                onClick={onClose}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                  isCheckingOut={isCheckingOut}
                />
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <CartSummary 
            cartItems={cartItems}
            onCheckout={handleCheckout}
            onClearCart={clearCart}
            isCheckingOut={isCheckingOut}
          />
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
