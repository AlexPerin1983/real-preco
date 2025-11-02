import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const PlusIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const ProductPlaceholderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 4 8-4" />
    </svg>
);


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="relative p-4 bg-gray-50 flex-shrink-0 h-32 flex items-center justify-center">
        {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                OFERTA
            </div>
        )}
        {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
        ) : (
            <div className="w-20 h-20">
                <ProductPlaceholderIcon />
            </div>
        )}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-2 right-2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <PlusIcon />
        </button>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        {product.originalPrice ? (
            <div>
                <span className="text-sm text-gray-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-base font-bold text-red-600 block">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
            </div>
        ) : (
            <span className="text-base font-bold text-gray-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
        )}
        <h3 className="text-sm text-gray-800 mt-1 flex-grow leading-tight">{product.name}</h3>
        {product.warning && (
           <p className="text-xs text-gray-500 mt-2">{product.warning}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;