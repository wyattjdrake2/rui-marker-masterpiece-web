
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from './ProductCard';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, clearCart }: CartDrawerProps) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
      // Reset checkout state when cart is opened
      setIsCheckingOut(false);
    } else {
      setAnimateIn(false);
      // Also reset checkout state when cart is closed
      setTimeout(() => {
        if (!isOpen) setIsCheckingOut(false);
      }, 300); // Match the drawer animation duration
    }
  }, [isOpen]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!window.shopifyCheckout || cartItems.length === 0) {
      toast.error("Unable to proceed to checkout");
      return;
    }

    setIsCheckingOut(true);
    toast.info("Redirecting to checkout...");

    // Redirect to Shopify checkout
    try {
      window.location.href = window.shopifyCheckout.webUrl;
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
      setIsCheckingOut(false);
      toast.error("Failed to redirect to checkout");
    }
  };

  // Reset checkout state on component unmount
  useEffect(() => {
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
                <div key={item.id} className="flex gap-4 pb-4 border-b animate-slide-in-right">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">{item.colors} Colors</p>
                    <div className="mt-2 font-medium">${item.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="p-6 border-t">
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-marker-green hover:bg-marker-green/90 btn-animated" 
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Redirecting...' : 'Checkout'}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full mt-2 text-gray-500" 
              onClick={clearCart}
              disabled={isCheckingOut}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
