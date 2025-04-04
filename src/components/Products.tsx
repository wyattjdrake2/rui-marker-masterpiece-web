
import { Product } from './ProductCard';
import ProductCard from './ProductCard';

interface ProductsProps {
  products: Product[];
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

const Products = ({ products, cartItems, addToCart }: ProductsProps) => {
  const isInCart = (productId: string) => cartItems.some(item => item.id === productId);

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 inline-block relative">
            <span className="marker-line">Our Premium Collections</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect marker set for your artistic endeavors, from beginner collections to professional studio sets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard 
                product={product} 
                onAddToCart={addToCart} 
                isInCart={isInCart(product.id)} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
