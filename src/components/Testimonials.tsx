
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah J.",
    role: "Professional Illustrator",
    content: "Chen Rui markers have become an essential part of my creative toolkit. The color vibrancy and blending capabilities are simply unmatched at this price point.",
    stars: 5
  },
  {
    name: "Michael T.",
    role: "Art Teacher",
    content: "I recommend Chen Rui markers to all my students. The dual tips make them perfect for learning different techniques, and the color consistency is exceptional.",
    stars: 5
  },
  {
    name: "Priya K.",
    role: "Manga Artist",
    content: "After trying many marker brands, I've settled on Chen Rui for all my work. The brush tip precision and color range allow me to create exactly what I envision.",
    stars: 4
  },
  {
    name: "David L.",
    role: "Graphic Designer",
    content: "The portability of the carrying case combined with the professional quality makes these markers perfect for my on-the-go lifestyle. Worth every penny.",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="marker-line">Artist Testimonials</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from the creative professionals who rely on Chen Rui markers for their artistic endeavors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex space-x-1 mb-3">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-marker-yellow text-marker-yellow" />
                ))}
                {[...Array(5 - testimonial.stars)].map((_, i) => (
                  <Star key={i} size={16} className="text-gray-300" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">{testimonial.content}</p>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
