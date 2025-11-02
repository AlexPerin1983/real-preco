import React from 'react';

interface ConfirmationViewProps {
  onNewOrder: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ onNewOrder }) => {
  return (
    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
       <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-6">
        <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Obrigado pela sua compra!</h2>
      <p className="text-gray-700 text-lg mb-4">Seu pagamento via PIX foi confirmado.</p>
      <p className="text-gray-500 mb-8">Seu pedido já está sendo preparado e será entregue em breve.</p>
      <button
        onClick={onNewOrder}
        className="bg-amber-500 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-amber-400 transition-all duration-200 shadow-md transform hover:scale-105"
      >
        Fazer Novo Pedido
      </button>
    </div>
  );
};

export default ConfirmationView;