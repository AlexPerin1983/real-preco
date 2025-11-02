import React from 'react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onBack: () => void;
  onGoHome: () => void;
  onGoToCart: () => void;
  showBack: boolean;
}

const ShoppingCartIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BackIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);


const Logo: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <div className="flex items-center gap-3 cursor-pointer" onClick={onClick}>
        <img
            src="https://media.canva.com/v2/image-resize/format:PNG/height:550/quality:100/uri:ifs%3A%2F%2FM%2F809fad30-e81c-49a8-86ce-b6a2b47a6366/watermark:F/width:550?csig=AAAAAAAAAAAAAAAAAAAAAF1P2Y-Z8mTThGuhhzTOfxF0MaVPaDnoKtZ5CbrBlzKH&exp=1762113170&osig=AAAAAAAAAAAAAAAAAAAAAKCvfeMIai0YkQKLt8TLr_mmVREfEWQ3WK8HBWXv2opM&signer=media-rpc&x-canva-quality=thumbnail_large"
            alt="Supermercado Real Preço Logo"
            className="w-20 h-20 flex-shrink-0 shadow-md object-contain rounded-full"
        />
        <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-wide">
            Supermercado Real Preço
            </h1>
            <p className="text-xs text-gray-600 font-semibold uppercase">Delivery Exprés</p>
        </div>
    </div>
);


const Header: React.FC<HeaderProps> = ({ onBack, onGoHome, onGoToCart, showBack }) => {
  const { totalItems } = useCart();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
            {showBack && (
                <button 
                  onClick={onBack}
                  className="text-gray-500 hover:text-amber-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
                  aria-label="Voltar"
                >
                    <BackIcon />
                </button>
            )}
            <Logo onClick={onGoHome} />
        </div>
        
        <button
          onClick={onGoToCart}
          className="relative text-gray-500 hover:text-amber-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          aria-label="Ver carrinho"
        >
          <ShoppingCartIcon />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;