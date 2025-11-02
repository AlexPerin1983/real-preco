import React, { useState, useMemo } from 'react';
import { PRODUCTS, MOST_PURCHASED_PRODUCTS, DAILY_DEALS } from '../constants';
import ProductCard from './ProductCard';
import CategoryNav from './CategoryNav';
import { Product } from '../types';
import SmartListModal from './SmartListModal';

interface ProductListProps {
  onSelectCategory: (categoryName: string) => void;
}

const ListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
       <path d="M9 6l11 0"></path>
       <path d="M9 12l11 0"></path>
       <path d="M9 18l11 0"></path>
       <path d="M5 6l0 .01"></path>
       <path d="M5 12l0 .01"></path>
       <path d="M5 18l0 .01"></path>
    </svg>
);

const ProductList: React.FC<ProductListProps> = ({ onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSmartListModalOpen, setIsSmartListModalOpen] = useState(false);

  const filteredAndGroupedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.reduce((acc, product) => {
      const category = product.category || 'Outros';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, Product[]>);

  }, [searchTerm]);

  const orderedCategories = Object.keys(filteredAndGroupedProducts);

  const mostPurchasedSection = (
    <section key="most-purchased">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Mais Comprados</h2>
      <div 
        className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar"
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {MOST_PURCHASED_PRODUCTS.map(product => (
          <div key={product.id} className="w-40 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
  
  const renderCategorySection = (category: string) => (
    <section key={category} id={`category-${category}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
        <button onClick={() => onSelectCategory(category)} className="text-sm font-semibold text-amber-600 hover:text-amber-500">Ver mais</button>
      </div>
      <div 
        className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar"
      >
        <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        {filteredAndGroupedProducts[category].slice(0, 5).map(product => ( // Show a preview
          <div key={product.id} className="w-40 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );

  // Assemble the final list of components to render in an interspersed feed
  const componentsToRender = [];
  if (orderedCategories.length > 0) {
    componentsToRender.push(...orderedCategories.slice(0, 2).map(renderCategorySection));
    
    if (MOST_PURCHASED_PRODUCTS.length > 0) {
      componentsToRender.push(mostPurchasedSection);
    }
    
    componentsToRender.push(...orderedCategories.slice(2).map(renderCategorySection));
  }

  return (
    <>
      <div className="space-y-8">
        <div className="relative">
            <input
            type="text"
            placeholder="Buscar em todo o mercado..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white text-gray-800 rounded-lg py-3 pl-10 pr-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <CategoryNav onCategorySelect={onSelectCategory} />

        {DAILY_DEALS.length > 0 && (
          <section key="daily-deals">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔥 Ofertas do Dia</h2>
            <div 
              className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar"
            >
              <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              {DAILY_DEALS.map(product => (
                <div key={product.id} className="w-40 flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}
        
        {orderedCategories.length > 0 ? (
          <div className="space-y-10">
              {componentsToRender}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Nenhum produto encontrado</h3>
              <p className="text-gray-500 mt-2">Tente ajustar sua busca.</p>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsSmartListModalOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-amber-400 w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-200 z-40"
        aria-label="Abrir lista de compras inteligente"
      >
        <ListIcon />
      </button>

      {isSmartListModalOpen && <SmartListModal onClose={() => setIsSmartListModalOpen(false)} />}
    </>
  );
};

export default ProductList;