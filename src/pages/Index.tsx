
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Products from '@/components/Products';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { Truck } from 'lucide-react';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import CurrencySelector from '@/components/CurrencySelector';

const Index = () => {
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
        domain: 'xhff96-za.myshopify.com',
        storefrontAccessToken: '125f370af7dcf0b5362dad09fbf29769',
      });

      ShopifyBuy.UI.onReady(window.shopifyClient).then(function (ui) {
        ui.createComponent('product', {
          id: '7940489183266',
          node: document.getElementById('product-component-1745293009639'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product": {
              "layout": "horizontal",
              "text": { "button": "Add to cart" },
              "contents": { "img": false, "imgWithCarousel": true, "description": true },
              "styles": {
                "product": { "@media (min-width: 601px)": { "max-width": "100%" }, "text-align": "left" },
                "title": { "font-size": "26px" },
                "price": { "font-size": "18px" }
              }
            },
            "modalProduct": {
              "contents": { "img": false, "imgWithCarousel": true, "button": false, "buttonWithQuantity": true },
              "styles": {
                "title": { "font-size": "26px", "font-weight": "bold" },
                "price": { "font-size": "18px" }
              }
            },
            "cart": {
              "text": {
                "total": "Subtotal",
                "button": "Checkout"
              }
            }
          }
        });
      });
      
      console.log('Shopify client initialized');
    }
  };

  return (
    <CurrencyProvider>
      <div className="min-h-screen">
        <Toaster position="bottom-right" richColors />
        
        {/* Free Delivery Banner with Currency Selector */}
        <div className="bg-marker-green text-white py-2 px-4 text-center font-medium flex items-center justify-between">
          <div className="flex items-center justify-center gap-2">
            <Truck className="h-4 w-4" />
            <span>LIMITED TIME: Free Express Delivery on All Orders! Ships within 24 hours</span>
          </div>
          <CurrencySelector />
        </div>
        
        <Navbar />
        <Hero />
        <Features />
        <Products />
        <Gallery />
        <Testimonials />
        <Footer />
      </div>
    </CurrencyProvider>
  );
};

export default Index;
