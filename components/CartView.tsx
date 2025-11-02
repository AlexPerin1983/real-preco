import React from 'react';
import { useCart } from '../context/CartContext';

interface CartViewProps {
  onConfirm: () => void;
}

const CartView: React.FC<CartViewProps> = ({ onConfirm }) => {
  const { cartItems, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6">Adicione produtos para continuar sua compra.</p>
        <a 
          href="#"
          onClick={(e) => { e.preventDefault(); window.location.reload(); }}
          className="bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-amber-400 transition-colors duration-200 shadow-sm"
        >
          Continuar Comprando
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Seu Carrinho</h2>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center p-1 flex-shrink-0 overflow-hidden">
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 4 8-4" />
                    </svg>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">R$ {item.price.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                className="w-16 text-center border rounded-md p-1 bg-gray-100 border-gray-300 text-gray-800"
                aria-label={`Quantidade de ${item.name}`}
              />
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-400"
                aria-label={`Remover ${item.name}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center text-xl font-bold">
          <span className="text-gray-600">Total:</span>
          <span className="text-amber-500">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
        <div className="mt-6 text-center">
            <button
              onClick={onConfirm}
              className="w-full max-w-sm bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-500 transition-colors duration-200 shadow-lg"
            >
              Finalizar Pedido
            </button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
