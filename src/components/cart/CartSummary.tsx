
import { Button } from '@/components/ui/button';
import { Product } from '@/components/ProductCard';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CartSummaryProps {
  cartItems: Product[];
  onCheckout: () => void;
  onClearCart: () => void;
  isCheckingOut: boolean;
}

const CartSummary = ({ cartItems, onCheckout, onClearCart, isCheckingOut }: CartSummaryProps) => {
  const { currency, convertPrice } = useCurrency();
  
  const subtotal = cartItems.reduce((sum, item) => sum + convertPrice(item.price) * (item.quantity || 1), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
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
        onClick={onCheckout}
        disabled={isCheckingOut}
      >
        {isCheckingOut ? 'Redirecting...' : 'Checkout'}
      </Button>
      
      <Button 
        variant="ghost" 
        className="w-full mt-2 text-gray-500" 
        onClick={onClearCart}
        disabled={isCheckingOut}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartSummary;
