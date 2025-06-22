
import React from 'react';
import { Category } from '../types';

interface CategoryShowcaseProps {
  categories: Category[];
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return null;
  }

  const handleExploreCategory = (categoryName: string) => {
    alert(`Exploring category: ${categoryName}... (Feature not fully implemented)`);
  };

  return (
    <section id="categories" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-brand-text text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <img src={category.imageUrl} alt={category.name} className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">{category.name}</h3>
                <p className="text-sm text-gray-200 mb-4 hidden sm:block">{category.description}</p>
                <button
                  onClick={() => handleExploreCategory(category.name)}
                  className="mt-2 inline-block bg-brand-primary text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
