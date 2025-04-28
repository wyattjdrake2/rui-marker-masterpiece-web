
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { Product } from './ProductCard';
import { toast } from 'sonner';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, clearCart, updateQuantity }: CartDrawerProps) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { currency, convertPrice } = useCurrency();

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

  const subtotal = cartItems.reduce((sum, item) => sum + convertPrice(item.price) * (item.quantity || 1), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const getVariantId = (item: Product) => {
    // First check if the product has a specific variantId defined
    if (item.variantId) {
      // If item has a variantId, use that directly
      return `gid://shopify/ProductVariant/${item.variantId}`;
    }
    
    // For products without specific variantId, use the fallback mapping
    switch (item.colors) {
      case 48:
        return 'gid://shopify/ProductVariant/43717016387618';
      case 60:
        return 'gid://shopify/ProductVariant/43717016420386';
      case 80:
        return 'gid://shopify/ProductVariant/43717016453154';
      case 120:
        return 'gid://shopify/ProductVariant/43717016485922';
      case 168:
        return 'gid://shopify/ProductVariant/43774039883810';
      default:
        return '';
    }
  };

  const createNewShopifyCheckout = async () => {
    if (!window.shopifyClient || cartItems.length === 0) {
      return null;
    }

    try {
      const checkout = await window.shopifyClient.checkout.create();
      console.log('Created new Shopify checkout:', checkout.id);
      
      const lineItems = cartItems.map(item => ({
        variantId: getVariantId(item),
        quantity: item.quantity || 1,
      })).filter(item => item.variantId);
      
      if (lineItems.length === 0) {
        toast.error("No valid items in cart");
        return null;
      }
      
      const updatedCheckout = await window.shopifyClient.checkout.addLineItems(
        checkout.id,
        lineItems
      );
      
      console.log('Added all items to new checkout');
      return updatedCheckout;
    } catch (error) {
      console.error("Error creating new checkout:", error);
      toast.error("Failed to prepare checkout");
      return null;
    }
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = useCallback(async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsCheckingOut(true);
    toast.info("Preparing checkout...");

    try {
      const newCheckout = await createNewShopifyCheckout();
      
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
  }, [cartItems]);

  useEffect(() => {
    return () => {
      setIsCheckingOut(false);
    };
  }, []);

  useEffect(() => {
    const pendingCheckout = sessionStorage.getItem('cart_checkout_pending');
    if (pendingCheckout === 'true') {
      sessionStorage.removeItem('cart_checkout_pending');
    }
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
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 p-0"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                          disabled={isCheckingOut || (item.quantity || 1) <= 1}
                        >
                          <Minus size={14} />
                        </Button>
                        
                        <Input
                          type="number"
                          min="1"
                          max="99"
                          value={item.quantity || 1}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) handleQuantityChange(item.id, val);
                          }}
                          className="h-7 w-12 text-center p-0"
                          disabled={isCheckingOut}
                        />
                        
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 p-0"
                          onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                          disabled={isCheckingOut || (item.quantity || 1) >= 99}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <div className="font-medium">
                        {currency === 'CAD' ? 'CAD' : 'USD'} ${(convertPrice(item.price) * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
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
                <span className="text-gray-600">Subtotal ({currency})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total ({currency})</span>
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
