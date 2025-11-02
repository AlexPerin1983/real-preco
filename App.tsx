import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { View } from './types';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartView from './components/CartView';
import CheckoutView from './components/CheckoutView';
import ConfirmationView from './components/ConfirmationView';
import CategoryView from './components/CategoryView';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.Shop);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewBeforeCart, setViewBeforeCart] = useState<{ view: View; category: string | null }>({ view: View.Shop, category: null });

  const handleNavigateToCart = () => {
    setViewBeforeCart({ view: currentView, category: selectedCategory });
    setCurrentView(View.Cart);
  };

  const handleBack = () => {
    if (currentView === View.Checkout) {
      setCurrentView(View.Cart);
    } else if (currentView === View.Cart || currentView === View.Confirmation) {
      setCurrentView(viewBeforeCart.view);
      setSelectedCategory(viewBeforeCart.category);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setCurrentView(View.Shop);
    setSelectedCategory(null);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case View.Cart:
        return <CartView onConfirm={() => setCurrentView(View.Checkout)} />;
      case View.Checkout:
        return <CheckoutView onOrderConfirmed={() => setCurrentView(View.Confirmation)} />;
      case View.Confirmation:
        return <ConfirmationView onNewOrder={handleGoHome} />;
      case View.Shop:
      default:
        if (selectedCategory) {
          return <CategoryView categoryName={selectedCategory} />;
        }
        return <ProductList onSelectCategory={handleSelectCategory} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Header 
          onBack={handleBack} 
          onGoHome={handleGoHome}
          onGoToCart={handleNavigateToCart}
          showBack={currentView !== View.Shop || !!selectedCategory}
        />
        <main className="container mx-auto p-2 md:p-6">
          {renderMainContent()}
        </main>
        <footer className="text-center py-4 text-gray-500 text-sm">
          <p>&copy; 2025 Supermercado Real Preço. Todos os direitos reservados.</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;