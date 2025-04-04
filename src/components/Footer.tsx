
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Chen Rui</h3>
            <p className="text-gray-400 mb-6">
              Premium art markers designed for professionals and enthusiasts alike. Unleash your creativity with vibrant colors and precision tips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-marker-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-marker-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-marker-green transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-marker-green transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">48 Colors Set</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">60 Colors Set</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">80 Colors Set</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">120 Colors Set</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="flex items-center mb-4">
              <Mail size={20} className="text-marker-green mr-3 flex-shrink-0" />
              <span className="text-gray-400">support@chenrui.com</span>
            </div>
            <h4 className="font-bold mb-4 mt-6">Refund Policy</h4>
            <div className="text-gray-400 text-sm">
              <p className="mb-2">We want you to be fully satisfied with your purchase. If you're not happy with your order, you may request a refund within 14 days of delivery.</p>
              <p className="mb-2">To be eligible for a refund:</p>
              <ul className="list-disc pl-5 mb-2 space-y-1">
                <li>The item must be unused and in its original packaging.</li>
                <li>You must contact us first to initiate the return.</li>
              </ul>
              <p>Please note: Return shipping costs are the responsibility of the customer. Once we receive the returned item and confirm its condition, we will issue a full refund to your original payment method.</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Chen Rui Art Supplies. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
