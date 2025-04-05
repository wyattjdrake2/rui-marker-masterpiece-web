import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: number;
  variantId?: string; // Add variantId for Shopify integration
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

const ProductCard = ({ product, onAddToCart, isInCart }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shopifyReady, setShopifyReady] = useState(false);

  // Initialize Shopify functionality
  useEffect(() => {
    if (window.ShopifyBuy) {
      initShopify();
      setShopifyReady(true);
    } else {
      // The script is already loaded in index.html, but we'll check if it's ready
      const checkInterval = setInterval(() => {
        if (window.ShopifyBuy) {
          clearInterval(checkInterval);
          initShopify();
          setShopifyReady(true);
        }
      }, 100);

      // Clear interval after 10 seconds if still not loaded to avoid memory leaks
      setTimeout(() => clearInterval(checkInterval), 10000);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  const initShopify = () => {
    if (!window.shopifyClient) {
      window.shopifyClient = window.ShopifyBuy.buildClient({
        domain: 'xhff96-za.myshopify.com',
        storefrontAccessToken: '125f370af7dcf0b5362dad09fbf29769',
      });

      // Create checkout
      window.shopifyClient.checkout.create().then((checkout: any) => {
        window.shopifyCheckout = checkout;
        console.log('Shopify checkout created:', checkout.id);
      }).catch((error: any) => {
        console.error('Error creating Shopify checkout:', error);
      });
    }
  };

  // Map product colors to Shopify variant IDs
  const getVariantId = (colors: number) => {
    switch (colors) {
      case 48:
        return 'gid://shopify/ProductVariant/43717016387618';
      case 60:
        return 'gid://shopify/ProductVariant/43717016420386';
      case 80:
        return 'gid://shopify/ProductVariant/43717016453154';
      case 120:
        return 'gid://shopify/ProductVariant/43717016485922';
      default:
        return '';
    }
  };

  const addToShopifyCart = () => {
    console.log('Adding to Shopify cart...');
    
    if (!window.shopifyClient) {
      console.error('Shopify client not initialized');
      initShopify(); // Try to initialize if not ready yet
      return;
    }
    
    if (!window.shopifyCheckout || !window.shopifyCheckout.id) {
      console.error('Shopify checkout not created yet');
      
      // Create a new checkout and then add items
      window.shopifyClient.checkout.create().then((checkout: any) => {
        window.shopifyCheckout = checkout;
        console.log('New checkout created:', checkout.id);
        addItemAndRedirect();
      }).catch((error: any) => {
        console.error('Error creating new checkout:', error);
      });
    } else {
      addItemAndRedirect();
    }
  };

  const addItemAndRedirect = () => {
    const variantId = getVariantId(product.colors);
    
    if (!variantId) {
      console.error('No variant ID found for this product');
      return;
    }

    console.log('Adding item with variantId:', variantId);

    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: 1,
      },
    ];

    window.shopifyClient.checkout.addLineItems(window.shopifyCheckout.id, lineItemsToAdd)
      .then((checkout: any) => {
        console.log('Item added to cart, redirecting to:', checkout.webUrl);
        window.location.href = checkout.webUrl;
      })
      .catch((error: any) => {
        console.error('Error adding item to Shopify cart:', error);
      });
  };

  const handleAddToCart = () => {
    // First add to our internal cart
    onAddToCart(product);
    
    console.log('Add to cart clicked for product:', product.name);
    
    // Then add to Shopify cart
    addToShopifyCart();
  };

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
            onClick={handleAddToCart}
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
