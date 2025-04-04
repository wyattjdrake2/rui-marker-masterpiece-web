
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden pt-16 pb-20">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-marker-green/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-marker-yellow/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="lg:order-1 order-2 animate-fade-in">
          <div className="relative w-full">
            <img 
              src="/lovable-uploads/52f8aea2-090f-43ab-a928-945cb9e31062.png" 
              alt="Chen Rui Art Markers in 48 Colors" 
              className="w-full h-auto object-contain rounded-lg shadow-xl image-reveal"
            />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-marker-lightgreen rounded-full flex items-center justify-center text-white font-bold text-xl transform rotate-12 shadow-lg border-4 border-white animate-float">
              <div className="text-center">
                <div className="text-3xl">48+</div>
                <div className="text-sm">Colors</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:order-2 order-1 animate-fade-in-slow">
          <div className="space-y-6">
            <div className="inline-block bg-marker-green/10 text-marker-green rounded-full px-4 py-1 text-sm font-medium">
              Premium Art Supplies
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unleash Your Creativity with <span className="marker-line">Chen Rui</span> Art Markers
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Dual-tip professional markers with vibrant colors for artists, designers, and creators. Experience unparalleled precision and color brilliance.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="color-badge green"></div>
              <div className="color-badge blue"></div>
              <div className="color-badge purple"></div>
              <div className="color-badge pink"></div>
              <div className="color-badge yellow"></div>
              <div className="color-badge orange"></div>
              <span className="text-gray-500 italic">...and many more colors</span>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                className="bg-marker-green hover:bg-marker-green/90 text-white rounded-full px-8 py-6 btn-animated"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 border-gray-300"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#features" className="block">
          <ArrowDown className="text-marker-green" />
        </a>
      </div>
      
      {/* Color Strip */}
      <div className="color-strip absolute bottom-0 left-0 right-0">
        <div className="bg-marker-green"></div>
        <div className="bg-marker-blue"></div>
        <div className="bg-marker-purple"></div>
        <div className="bg-marker-pink"></div>
        <div className="bg-marker-yellow"></div>
        <div className="bg-marker-orange"></div>
      </div>
    </section>
  );
};

export default Hero;
