
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

const ProductCard = ({ product, onAddToCart, isInCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={() => onAddToCart(product)}
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
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          <Button
            variant="outline"
            size="sm"
            className="text-xs md:hidden"
            onClick={() => onAddToCart(product)}
            disabled={isInCart}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
