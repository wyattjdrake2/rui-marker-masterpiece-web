
import { Product } from '@/components/ProductCard';
import { toast } from 'sonner';

export const getVariantId = (item: Product) => {
  if (item.variantId) {
    return `gid://shopify/ProductVariant/${item.variantId}`;
  }
  
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

export const createNewShopifyCheckout = async (cartItems: Product[]) => {
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
