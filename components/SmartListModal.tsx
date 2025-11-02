import React, { useState, useCallback } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { findProductsInCatalog } from '../lib/gemini';
import { PRODUCTS } from '../constants'; // The full product list

interface SmartListModalProps {
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SmartListModal: React.FC<SmartListModalProps> = ({ onClose }) => {
  const { addItem, cartItems } = useCart();
  const [listText, setListText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  const handleFindItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMatchedProducts([]);
    
    try {
      const matchedIds = await findProductsInCatalog(listText, PRODUCTS);
      if (matchedIds.length === 0) {
        setError("Não encontramos produtos correspondentes. Tente descrever os itens de outra forma.");
      } else {
        const foundProducts = PRODUCTS.filter(p => matchedIds.includes(p.id));
        setMatchedProducts(foundProducts);
      }
    } catch (e) {
      console.error(e);
      setError('Ocorreu um erro ao buscar os produtos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }, [listText]);

  const addAllToCart = () => {
    matchedProducts.forEach(product => {
      const isInCart = cartItems.some(item => item.id === product.id);
      if (!isInCart) {
        addItem(product);
      }
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="smart-list-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 p-6 relative transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Fechar"
        >
          <CloseIcon />
        </button>

        <h2 id="smart-list-title" className="text-2xl font-bold text-gray-900 mb-2">Lista de Compras Inteligente</h2>
        <p className="text-gray-600 mb-4">Digite ou cole sua lista de compras e nós encontraremos os produtos para você.</p>
        
        {matchedProducts.length === 0 && !isLoading && (
          <>
            <textarea
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              placeholder="Ex: 1kg de tomate, pão francês e um café bom"
              value={listText}
              onChange={(e) => setListText(e.target.value)}
            />
            <button
              onClick={handleFindItems}
              disabled={isLoading || !listText.trim()}
              className="w-full mt-4 bg-amber-500 text-slate-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Encontrar Itens
            </button>
          </>
        )}

        {isLoading && (
          <div className="text-center py-10">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-700 font-semibold">Buscando produtos...</p>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="text-center py-6">
            <p className="text-red-600">{error}</p>
            <button onClick={() => { setError(null); setMatchedProducts([]); }} className="mt-4 text-sm font-semibold text-amber-600">
              Tentar Novamente
            </button>
          </div>
        )}
        
        {matchedProducts.length > 0 && !isLoading && (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
             <h3 className="text-lg font-bold text-gray-800">Encontramos estes itens:</h3>
            {matchedProducts.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <p className="font-semibold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                </div>
                <button 
                  onClick={() => addItem(product)}
                  className="px-4 py-2 bg-green-100 text-green-800 text-sm font-semibold rounded-lg hover:bg-green-200 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            ))}
            <div className="pt-4 border-t">
              <button
                onClick={addAllToCart}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Adicionar todos os {matchedProducts.length} itens ao carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartListModal;