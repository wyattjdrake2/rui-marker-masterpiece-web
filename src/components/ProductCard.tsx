import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Check, Plus, Minus, Award } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: number;
  variantId?: string;
  quantity?: number;
  bestValue?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  isInCart: boolean;
}

const ProductCard = ({ product, onAddToCart, isInCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { currency, convertPrice } = useCurrency();

  const handleAddToCart = () => {
    onAddToCart({...product, quantity}, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 99) {
      setQuantity(value);
    } else if (e.target.value === '') {
      setQuantity(1);
    }
  };

  const displayPrice = convertPrice(product.price);

  return (
    <div 
      className="product-card h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-contain p-4"
        />
        <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-4 bg-white/20 p-2 rounded-md">
            <Button 
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-black"
              onClick={decrementQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <Input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="h-8 w-16 text-center text-white bg-black/50 border-gray-600"
            />
            
            <Button 
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-white text-black"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className={`btn-animated ${isInCart ? 'bg-marker-black hover:bg-marker-black/90' : 'bg-marker-green hover:bg-marker-green/90'} text-white rounded-full`}
            disabled={isInCart}
          >
            {isInCart ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </>
            )}
          </Button>
        </div>
        
        <div className="absolute top-3 right-3 bg-marker-green text-white rounded-full w-16 h-16 flex items-center justify-center text-sm font-bold">
          <div className="text-center">
            <div>{product.colors}</div>
            <div className="text-xs">Colors</div>
          </div>
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-semibold">
            Almost Sold Out!
          </Badge>
        </div>
        
        {product.bestValue && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-amber-500 text-white px-3 py-1 flex items-center gap-1">
              <Award className="h-3 w-3" /> BEST VALUE
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            {currency === 'CAD' ? 'CAD' : 'USD'} ${displayPrice.toFixed(2)}
          </span>
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={decrementQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? 'Added' : 'Add'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
