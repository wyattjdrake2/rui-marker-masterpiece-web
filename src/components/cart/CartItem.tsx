
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Product } from '@/components/ProductCard';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CartItemProps {
  item: Product;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  isCheckingOut: boolean;
}

const CartItem = ({ item, onRemove, onUpdateQuantity, isCheckingOut }: CartItemProps) => {
  const { currency, convertPrice } = useCurrency();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="flex gap-4 pb-4 border-b animate-slide-in-right">
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
            onClick={() => onRemove(item.id)}
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
  );
};

export default CartItem;
