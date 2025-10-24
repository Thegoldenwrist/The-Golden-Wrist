
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  searchTerm: string;
}

export const ProductList: React.FC<ProductListProps> = ({ searchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    let products = PRODUCTS;

    // Filter by category
    if (activeCategory !== 'All') {
      products = products.filter(p => p.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(products);
  }, [activeCategory, searchTerm]);
  
  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const categories = ['All', 'Unisex', 'Women', 'Men'];

  return (
    <div id="our-collection" className="bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-serif text-stone-900">Our Collection</h2>
            <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">Discover our curated selection of handcrafted bracelets, designed to bring elegance and style to every wrist.</p>
        </div>
        
        <div className="flex justify-center items-center mb-8 gap-2 sm:gap-4">
            {categories.map(category => (
                <button 
                    key={category}
                    onClick={() => handleFilterChange(category)}
                    className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
                        activeCategory === category 
                        ? 'bg-amber-500 text-white shadow-md' 
                        : 'bg-white text-stone-700 hover:bg-stone-200'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-stone-700">No Products Found</h3>
            <p className="mt-2 text-stone-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
