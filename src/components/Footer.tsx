
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">Chen Rui</h3>
            <p className="text-gray-400 mb-6">
              Premium art markers designed for professionals and enthusiasts alike. Unleash your creativity with vibrant colors and precision tips.
            </p>
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
              <span className="text-gray-400">support@chenru.ca</span>
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
            <button 
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setIsTermsOpen(true)}
              className="hover:text-gray-300 transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Dialog */}
      <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Privacy Policy</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-500">Effective Date: April 2025</p>
            <p>At Chen Rui, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit or make a purchase from our website.</p>
            
            <h3 className="font-bold mt-6">1. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personal data: Name, email address, shipping address, payment information</li>
              <li>Device data: IP address, browser type, and time zone</li>
              <li>Order information: Items purchased, order total, and payment method</li>
            </ul>
            
            <h3 className="font-bold mt-6">2. How We Use Your Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>To fulfill your orders</li>
              <li>To communicate with you about your order</li>
              <li>To screen for potential fraud or risk</li>
              <li>To improve our store and services</li>
            </ul>
            
            <h3 className="font-bold mt-6">3. Sharing Your Information</h3>
            <p>We do not sell or rent your personal information. We only share your data with:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shopify (our eCommerce platform)</li>
              <li>Payment processors (e.g., PayPal, Stripe)</li>
              <li>Shipping carriers</li>
            </ul>
            
            <h3 className="font-bold mt-6">4. Your Rights</h3>
            <p>If you are located in the EU, you have the right to access, correct, or delete your personal data. Please contact us at support@chenru.ca for any requests.</p>
            
            <h3 className="font-bold mt-6">5. Data Retention</h3>
            <p>We retain your information for our records unless and until you ask us to delete it.</p>
            
            <h3 className="font-bold mt-6">6. Changes to This Policy</h3>
            <p>We may update this policy from time to time to reflect operational, legal, or regulatory reasons.</p>
            
            <p className="mt-6">For questions, contact us at support@chenru.ca.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Dialog */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Terms of Service</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p>Welcome to Chen Rui. By accessing our website and purchasing from us, you agree to be bound by the following terms and conditions:</p>
            
            <h3 className="font-bold mt-6">1. General Conditions</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You must be at least the age of majority in your jurisdiction.</li>
              <li>We reserve the right to refuse service to anyone for any reason.</li>
            </ul>
            
            <h3 className="font-bold mt-6">2. Product Information</h3>
            <p>We strive to display accurate product images and descriptions. However, we do not guarantee that all information is always error-free.</p>
            
            <h3 className="font-bold mt-6">3. Pricing & Payments</h3>
            <p>Prices are subject to change without notice. Payment must be received before order processing. We accept major credit cards and other payment methods available at checkout.</p>
            
            <h3 className="font-bold mt-6">4. Shipping & Delivery</h3>
            <p>Shipping times are estimates and may vary. We are not responsible for delays caused by carriers or customs.</p>
            
            <h3 className="font-bold mt-6">5. Returns & Refunds</h3>
            <p>Please refer to our Returns Policy for eligibility and instructions. We reserve the right to deny returns that do not meet our guidelines.</p>
            
            <h3 className="font-bold mt-6">6. Limitation of Liability</h3>
            <p>We are not liable for any damages arising from the use of our site or products, including but not limited to loss of profits or data.</p>
            
            <h3 className="font-bold mt-6">7. Governing Law</h3>
            <p>These terms shall be governed by the laws of your jurisdiction.</p>
            
            <p className="mt-6">If you have questions, please contact us at support@chenru.ca.</p>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
