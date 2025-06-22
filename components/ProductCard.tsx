
import React, { useContext } from 'react';
import { Product } from '../types';
import Button from './ui/Button';
import { CartContext } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cart = useContext(CartContext);

  if (!cart) {
    return <div className="p-4">Error loading cart functionality.</div>;
  }
  const { addToCart } = cart;

  const handleAddToCart = () => {
    addToCart(product);
    alert(`"${product.name}" added to your cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="relative h-64 sm:h-72 md:h-80 w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-playfair font-semibold text-brand-text mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-brand-text-light text-sm mb-3 flex-grow line-clamp-2" title={product.description}>{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="text-2xl font-playfair font-bold text-brand-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button size="sm" variant="secondary" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
