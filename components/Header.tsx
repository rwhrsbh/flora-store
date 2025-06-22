
import React, { useState, useContext } from 'react';
import Button from './ui/Button';
import { ShoppingCartIcon } from './icons/ShoppingCartIcon';
import { AuthContext } from '../contexts/AuthContext';
import { CartContext } from '../contexts/CartContext';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onRegisterClick, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);

  if (!auth || !cart) {
    // This should ideally not happen if providers are set up correctly
    return <header className="bg-white shadow-md sticky top-0 z-50 p-4">Loading header...</header>;
  }

  const { currentUser, logout } = auth;
  const { cartItems } = cart;

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#featured-products', label: 'Shop' },
    { href: '#categories', label: 'Categories' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#footer-contact', label: 'Contact' }, // Changed to target footer for demo
  ];

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };
  
  const handleMobileMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-3xl font-playfair font-bold text-brand-primary">
              FloraModern
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-brand-text-light hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-sm text-brand-text-light">Hi, {currentUser.username}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={onLoginClick}>
                  Login
                </Button>
                 <Button variant="primary" size="sm" onClick={onRegisterClick}>
                  Register
                </Button>
              </>
            )}
            <button
              aria-label="Shopping cart"
              className="relative p-2 text-brand-text-light hover:text-brand-primary"
              onClick={onCartClick}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button
              aria-label="Shopping cart"
              className="relative p-2 mr-2 text-brand-text-light hover:text-brand-primary"
              onClick={onCartClick}
            >
              <ShoppingCartIcon className="h-6 w-6" />
               {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {totalCartItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-text-light hover:text-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleMobileMenuLinkClick}
                className="text-brand-text-light hover:text-brand-primary hover:bg-brand-secondary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 space-y-2">
               {currentUser ? (
                 <>
                  <p className="px-3 py-2 text-brand-text">Hi, {currentUser.username}</p>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full text-left block">
                    Logout
                  </Button>
                 </>
               ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => { onLoginClick(); setIsMobileMenuOpen(false);}} className="w-full text-left block mb-2">
                    Login
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => { onRegisterClick(); setIsMobileMenuOpen(false);}} className="w-full text-left block">
                    Register
                  </Button>
                </>
               )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
