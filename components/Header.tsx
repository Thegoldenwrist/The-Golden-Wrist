import React, { useState, useEffect } from 'react';
import type { CartItem, WishlistItem } from '../types';

const GoldenWristIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-amber-500"
  >
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
      clipRule="evenodd"
    />
  </svg>
);

const getCartCount = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + item.quantity, 0);
}

const getWishlistCount = () => {
    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.length;
}


interface HeaderProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onCartClick: () => void;
    onWishlistClick: () => void;
    onShowAboutUs: () => void;
    onShowContact: () => void;
    onHomeClick: () => void;
    onShopClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onCartClick, onWishlistClick, onShowAboutUs, onShowContact, onHomeClick, onShopClick }) => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCartCount(getCartCount());
    setWishlistCount(getWishlistCount());

    const handleCartUpdate = () => {
        setCartCount(getCartCount());
    };

    const handleWishlistUpdate = () => {
        setWishlistCount(getWishlistCount());
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('wishlist-updated', handleWishlistUpdate);


    return () => {
        window.removeEventListener('cart-updated', handleCartUpdate);
        window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  const handleClearWishlist = () => {
    localStorage.removeItem('wishlist');
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };

  const handleMobileLinkClick = (handler: (e: React.MouseEvent<HTMLAnchorElement>) => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    handler(e);
    setIsMobileMenuOpen(false);
  };

  const handleShowAboutUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShowAboutUs();
  };

  const handleShowContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShowContact();
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onHomeClick();
  };
  
  const handleShopClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShopClick();
  };


  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <GoldenWristIcon />
            <a href="#" onClick={handleHomeClick} className="text-2xl font-bold font-serif text-stone-900">
              The Golden Wrist
            </a>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" onClick={handleHomeClick} className="text-stone-600 hover:text-amber-500 transition-colors duration-300">Home</a>
            <a href="#our-collection" onClick={handleShopClick} className="text-stone-600 hover:text-amber-500 transition-colors duration-300">Shop</a>
            <a href="#about-us" onClick={handleShowAboutUsClick} className="text-stone-600 hover:text-amber-500 transition-colors duration-300">About Us</a>
            <a href="#contact-us" onClick={handleShowContactClick} className="text-stone-600 hover:text-amber-500 transition-colors duration-300">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search bracelets..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-full text-sm text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-2">
                {wishlistCount > 0 && (
                    <button
                        onClick={handleClearWishlist}
                        className="text-xs text-stone-500 hover:text-red-600 hover:underline transition-colors duration-300"
                        title="Clear all items from wishlist"
                    >
                        Clear Wishlist
                    </button>
                )}
                {cartCount > 0 && (
                <button
                    onClick={handleClearCart}
                    className="text-xs text-stone-500 hover:text-red-600 hover:underline transition-colors duration-300"
                    title="Clear all items from cart"
                >
                    Clear Cart
                </button>
                )}
            </div>
             <button
                onClick={onWishlistClick}
                className="relative p-2 text-stone-600 hover:text-amber-500 rounded-full transition-colors duration-300"
                aria-label={`Open wishlist with ${wishlistCount} items`}
            >
                {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        {wishlistCount}
                    </span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-2 text-stone-600 hover:text-amber-500 rounded-full transition-colors duration-300"
              aria-label={`Open cart with ${cartCount} items`}
            >
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-amber-500 rounded-full transition-colors duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel */}
      <div className={`md:hidden bg-white border-t border-stone-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="flex flex-col p-4 space-y-2">
          <a href="#" onClick={handleMobileLinkClick(handleHomeClick)} className="text-lg text-stone-700 hover:bg-stone-100 rounded-md px-4 py-3 transition-colors">Home</a>
          <a href="#our-collection" onClick={handleMobileLinkClick(handleShopClick)} className="text-lg text-stone-700 hover:bg-stone-100 rounded-md px-4 py-3 transition-colors">Shop</a>
          <a href="#about-us" onClick={handleMobileLinkClick(handleShowAboutUsClick)} className="text-lg text-stone-700 hover:bg-stone-100 rounded-md px-4 py-3 transition-colors">About Us</a>
          <a href="#contact-us" onClick={handleMobileLinkClick(handleShowContactClick)} className="text-lg text-stone-700 hover:bg-stone-100 rounded-md px-4 py-3 transition-colors">Contact</a>
        </nav>
        <div className="relative sm:hidden p-4 border-t border-stone-200">
          <span className="absolute inset-y-0 left-0 flex items-center pl-7 top-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search bracelets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-full text-base text-stone-700 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
          />
        </div>
      </div>
    </header>
  );
};
