
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import CategoryShowcase from './components/CategoryShowcase';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { sampleProducts, heroSlides, testimonialsData, categories } from './constants';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import CartModal from './components/modals/CartModal';

const App: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsCartModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsCartModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const openCartModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsCartModalOpen(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-white text-brand-text min-h-screen flex flex-col">
          <Header
            onLoginClick={openLoginModal}
            onRegisterClick={openRegisterModal}
            onCartClick={openCartModal}
          />
          <main className="flex-grow">
            <Hero slides={heroSlides} />
            <FeaturedProducts products={sampleProducts} />
            <CategoryShowcase categories={categories} />
            <Testimonials testimonials={testimonialsData} />
          </main>
          <Footer />
        </div>
        {isLoginModalOpen && <LoginModal onClose={closeModal} onSwitchToRegister={openRegisterModal} />}
        {isRegisterModalOpen && <RegisterModal onClose={closeModal} onSwitchToLogin={openLoginModal} />}
        {isCartModalOpen && <CartModal onClose={closeModal} onLoginRedirect={openLoginModal} />}
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
