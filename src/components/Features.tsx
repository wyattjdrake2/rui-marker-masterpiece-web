
import { Award, PaintBucket, Palette, Feather, ThumbsUp, Droplet } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <PaintBucket className="text-marker-green" size={28} />,
      title: "Vibrant Colors",
      description: "Rich, consistent pigments for striking artwork that pops off the page."
    },
    {
      icon: <Feather className="text-marker-blue" size={28} />,
      title: "Dual Tips",
      description: "Versatile brush (3mm) and chisel (7mm) tips for precise control and flexibility."
    },
    {
      icon: <Palette className="text-marker-purple" size={28} />,
      title: "Color Range",
      description: "Up to 120 unique colors, carefully organized for perfect blending."
    },
    {
      icon: <Droplet className="text-marker-pink" size={28} />,
      title: "Alcohol-Based",
      description: "Quick-drying, blendable ink with minimal bleeding for professional results."
    },
    {
      icon: <Award className="text-marker-yellow" size={28} />,
      title: "Premium Quality",
      description: "Durable construction and premium materials for markers that last."
    },
    {
      icon: <ThumbsUp className="text-marker-orange" size={28} />,
      title: "Carrying Case",
      description: "Elegant, durable storage case for organization and portability."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="marker-line">Why Choose Chen Rui</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our professional-grade art markers set the industry standard with exceptional quality and performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
