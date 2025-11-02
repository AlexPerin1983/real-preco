import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

// Icons
const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

interface CheckoutViewProps {
  onOrderConfirmed: () => void;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderConfirmed }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { totalPrice, clearCart } = useCart();

  const handleConfirm = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Por favor, preencha todos os campos de entrega.');
      return;
    }
    setError('');
    setIsConfirmed(true);
    window.scrollTo(0, 0);
  };

  const handleFinish = () => {
    clearCart();
    onOrderConfirmed();
  };
  
  const handleCopyPixKey = () => {
    const pixKey = '00.000.000/0001-00';
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pague com PIX para Finalizar</h2>
        <p className="text-gray-600 mb-6">Aponte a câmera do seu celular para o QR Code ou use a chave abaixo.</p>
        
        <img src="https://i.imgur.com/g8f6H82.png" alt="QR Code PIX" className="w-48 h-48 mx-auto my-4 border-4 border-gray-200 rounded-lg p-1" />
        
        <div className="bg-gray-100 rounded-lg p-4 my-6">
          <p className="text-sm text-gray-600">Chave PIX (CNPJ)</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-lg font-mono text-gray-800 tracking-wider">00.000.000/0001-00</p>
            <button onClick={handleCopyPixKey} className="p-2 text-gray-500 hover:text-amber-600 rounded-full hover:bg-gray-200 transition-colors">
              <CopyIcon />
            </button>
          </div>
          {copied && <p className="text-sm text-green-600 mt-2">Chave copiada!</p>}
        </div>

        <div className="text-xl font-bold mb-6">
          <span className="text-gray-600">Total a pagar: </span>
          <span className="text-green-600">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
        </div>
        
        <button onClick={handleFinish} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition-colors duration-200 shadow-lg">
          Já Paguei, Finalizar Pedido
        </button>
        <p className="text-xs text-gray-500 mt-4">Após o pagamento, seu pedido será processado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
          <p>{error}</p>
        </div>
      )}

      {/* Delivery Info Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Informações de Entrega</h3>
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><PersonIcon /></span>
            <input type="text" placeholder="Nome Completo" value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><PhoneIcon /></span>
            <input type="tel" placeholder="Telefone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LocationIcon /></span>
            <input type="text" placeholder="Endereço completo" value={address} onChange={e => setAddress(e.target.value)} className="w-full pl-10 pr-3 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"/>
          </div>
        </div>
      </div>

      {/* Observations Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Observações</h3>
        <textarea placeholder="Ex: Deixar na portaria, tirar item com cebola..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full h-24 p-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"/>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Forma de Pagamento</h3>
        <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4 flex items-center gap-4">
          <WalletIcon />
          <div>
            <p className="font-bold text-green-800 text-lg">Pagamento via PIX</p>
            <p className="text-sm text-green-700">Após confirmar, você receberá os dados para pagamento.</p>
          </div>
        </div>
      </div>
      
      {/* Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-gray-200 md:relative md:bg-transparent md:p-0 md:border-none">
         <div className="max-w-xl mx-auto">
            <button
                onClick={handleConfirm}
                className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-500 transition-colors duration-200 shadow-lg text-lg"
            >
                Confirmar Pedido
            </button>
         </div>
      </div>
    </div>
  );
};

export default CheckoutView;
