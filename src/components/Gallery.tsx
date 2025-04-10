import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const Gallery = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="marker-line">See Them In Action</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how Chen Rui markers bring artistic visions to life with their stunning color quality and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* LEFT: Video + Color Chart */}
          <div className="flex flex-col gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-xl aspect-video">
              <img 
                src="/lovable-uploads/a3f645a6-e454-43b7-b74a-10efeed99903.png" 
                alt="Vibrant Art with Chen Rui Markers" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  className="w-16 h-16 rounded-full bg-black/60 hover:bg-black/80 text-white border-2 border-white/70 shadow-xl animate-pulse"
                  onClick={() => setVideoModalOpen(true)}
                >
                  <Play className="h-6 w-6 fill-white" />
                </Button>
              </div>
            </div>

            {/* Color Chart moved here inside left column */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-center">Complete Color Chart</h3>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Explore the full spectrum of 120 vibrant colors available in our largest set
              </p>
              <img 
                src="/lovable-uploads/06f344d3-78cd-460b-9972-5d08a88cf5cc.png" 
                alt="Chen Rui 120 Color Chart" 
                className="w-full h-auto rounded-lg shadow"
              />
            </div>
          </div>

          {/* RIGHT: Static Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/9c19dd5e-e031-47b6-98f2-674eed9661bc.png" 
                alt="Color Variety" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/42b91411-ce6d-4aa1-9385-99563bb9e62e.png" 
                alt="Marker Tip Detail" 
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg col-span-2">
              <img 
                src="/lovable-uploads/aa103952-f952-4839-9623-87ae240669fa.png" 
                alt="Dual Tips Features" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Premium Dual-Tip Technology</h3>
              <p className="text-gray-600 mb-6">
                Each Chen Rui marker features both a 3mm fine brush tip and a 7mm broad chisel tip, giving you maximum versatility in a single marker. Create detailed illustrations, calligraphy, coloring, manga, and more with professional precision.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-marker-green mr-2"></span>
                  <span>Brush Tip (3mm) for precision lines and details</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-marker-blue mr-2"></span>
                  <span>Broad Tip (7mm) for filling larger areas</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-marker-purple mr-2"></span>
                  <span>Alcohol-based ink for smooth blending</span>
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-marker-pink mr-2"></span>
                  <span>Quick-drying and odorless formula</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="/lovable-uploads/e4fb0ade-f9a4-4ac7-90f2-59bc913c7249.png" 
                alt="Marker Color Samples" 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-4 w-full max-w-3xl">
            <div className="aspect-video bg-black rounded overflow-hidden shadow-lg mb-4">
              <video controls autoPlay className="w-full h-full">
                <source src="/chenrui video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex justify-end">
              <Button 
                variant="outline"
                onClick={() => setVideoModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

