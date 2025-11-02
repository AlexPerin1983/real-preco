import React, { useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface CategoryViewProps {
  categoryName: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({ categoryName }) => {
  const { products, subcategories, groupedBySubcategory } = useMemo(() => {
    const products = PRODUCTS.filter(p => p.category === categoryName);
    const subcategories = [...new Set(products.map(p => p.subcategory).filter(Boolean))] as string[];
    
    const groupedBySubcategory = products.reduce((acc, product) => {
      const sub = product.subcategory || 'Outros';
      if (!acc[sub]) {
        acc[sub] = [];
      }
      acc[sub].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

    return { products, subcategories, groupedBySubcategory };
  }, [categoryName]);

  const handleSubcategorySelect = (subcategoryId: string) => {
    const element = document.getElementById(`subcategory-${subcategoryId}`);
    if (element) {
        const headerOffset = 130; // height of sticky header + subcategory nav
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };


  if (products.length === 0) {
    return <div className="text-center py-12">Nenhum produto encontrado nesta categoria.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{categoryName}</h1>
      
      <nav className="sticky top-[75px] bg-gray-50/95 backdrop-blur-sm z-10 py-2 -mx-2 px-2">
         <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {subcategories.map(sub => (
              <button 
                key={sub}
                onClick={() => handleSubcategorySelect(sub)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-amber-100 hover:border-amber-300 transition-colors duration-200 flex-shrink-0"
              >
                {sub}
              </button>
            ))}
        </div>
      </nav>

      <div className="space-y-10">
        {subcategories.map(sub => (
          <section key={sub} id={`subcategory-${sub}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{sub}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {groupedBySubcategory[sub].map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CategoryView;