
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  cartItemCount: number;
  openCart: () => void;
  currencySwitcher?: React.ReactNode;
}

const Navbar = ({ cartItemCount, openCart, currencySwitcher }: NavbarProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`w-full py-4 px-6 md:px-12 z-50 transition-all duration-300 ${isSticky ? 'sticky-nav' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-2xl font-bold font-playfair text-marker-black">
            Chen Rui<span className="text-marker-green">.</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="font-medium hover:text-marker-green transition-colors">Features</a>
          <a href="#products" className="font-medium hover:text-marker-green transition-colors">Products</a>
          <a href="#gallery" className="font-medium hover:text-marker-green transition-colors">Gallery</a>
          <a href="#testimonials" className="font-medium hover:text-marker-green transition-colors">Testimonials</a>
          
          {currencySwitcher}
          
          <Button 
            onClick={openCart}
            variant="outline" 
            className="flex items-center gap-2 bg-white/80 hover:bg-white border border-gray-200"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 bg-marker-green text-white text-xs rounded-full">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {currencySwitcher}
          
          <Button 
            onClick={openCart}
            variant="outline" 
            size="icon"
            className="relative bg-white/80 hover:bg-white border border-gray-200"
          >
            <ShoppingCart size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 bg-marker-green text-white text-xs rounded-full">
                {cartItemCount}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg p-5 z-50 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="font-medium hover:text-marker-green transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#products" 
                className="font-medium hover:text-marker-green transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </a>
              <a 
                href="#gallery" 
                className="font-medium hover:text-marker-green transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="#testimonials" 
                className="font-medium hover:text-marker-green transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
