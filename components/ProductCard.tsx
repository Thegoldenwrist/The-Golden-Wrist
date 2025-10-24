import React, { useState, useEffect } from 'react';
import type { Product, CartItem, WishlistItem } from '../types';
import { SocialShare } from './SocialShare';

interface ProductCardProps {
  product: Product;
}

const StarIcon: React.FC<{ filled: boolean; className?: string }> = ({ filled, className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`${className} ${filled ? 'text-amber-400' : 'text-stone-300'}`}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.116 3.986 1.24 5.381c.216 1.03-.908 1.858-1.833 1.352L12 18.225l-4.715 2.501c-.925.506-2.049-.322-1.833-1.352l1.24-5.381-4.116-3.986c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  }, [product.id]);

  const renderStars = (className?: string) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<StarIcon key={i} filled={i <= Math.round(product.rating)} className={className} />);
    }
    return stars;
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemIndex = wishlist.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
        wishlist.splice(itemIndex, 1);
        setIsInWishlist(false);
    } else {
        wishlist.push({ id: product.id });
        setIsInWishlist(true);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };
  
  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };
  
  const handleToggleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShareOpen(prev => !prev);
  };

  const Modal = () => (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
        onClick={() => setIsModalOpen(false)}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full overflow-hidden relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        style={{animationFillMode: 'forwards'}}
      >
        <button 
            onClick={() => setIsModalOpen(false)} 
            className="absolute top-4 right-4 text-stone-500 hover:text-stone-800 transition-colors z-10"
            aria-label="Close product details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="grid md:grid-cols-2">
          <div className="w-full h-64 md:h-full">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 flex flex-col">
            <span className="bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full uppercase self-start mb-3">{product.category}</span>
            <h2 className="text-3xl font-bold font-serif text-stone-900 capitalize">{product.name}</h2>
            <div className="flex items-center my-4">
              {renderStars('w-5 h-5')}
              <span className="text-sm text-stone-500 ml-2">({product.reviews} reviews)</span>
            </div>
            <p className="text-stone-600 mt-2 flex-grow text-base">{product.description}</p>
            <div className="mt-6">
                <h4 className="text-sm font-semibold text-stone-700 mb-2">Share this piece:</h4>
                <SocialShare product={product} />
            </div>
            <div className="flex items-baseline justify-between mt-4">
              <p className="text-3xl font-bold font-serif text-stone-900">₹{product.price}</p>
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`text-white text-base font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                    isAdded 
                    ? 'bg-green-500 cursor-not-allowed' 
                    : 'bg-stone-800 hover:bg-amber-500'
                }`}
              >
                {isAdded ? 'Added!' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-scale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation-name: fade-in-scale;
            animation-duration: 0.3s;
            animation-timing-function: ease-out;
        }
    `}</style>
    </div>
  );

  return (
    <>
      <div className="group relative flex flex-col bg-white border border-stone-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div 
            className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden cursor-pointer"
            onClick={() => {
                setIsModalOpen(true);
                setIsShareOpen(false);
            }}
            aria-label={`View details for ${product.name}`}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
           <button 
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-colors duration-300 hover:bg-white ${isInWishlist ? 'text-red-500' : 'text-stone-400 hover:text-red-400'}`}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isInWishlist ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
           <button
            onClick={handleToggleShare}
            className="absolute top-2 left-2 p-2 rounded-full bg-white/70 backdrop-blur-sm transition-colors duration-300 hover:bg-white text-stone-500 hover:text-amber-500"
            aria-label="Share this product"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.367a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
          {isShareOpen && (
              <div 
                  className="absolute top-12 left-2 bg-white rounded-lg shadow-lg p-2 z-10 animate-fade-in-fast"
                  onClick={(e) => e.stopPropagation()}
              >
                  <SocialShare product={product} />
              </div>
          )}
        </div>

        <div className="p-4">
            <h3 className="text-lg font-semibold text-stone-800 capitalize truncate" title={product.name}>
                {product.name}
            </h3>
        </div>

        <div className="flex-grow"></div> 

        <div className="p-4 pt-0 flex items-baseline justify-between">
            <p className="text-2xl font-bold font-serif text-stone-900">₹{product.price}</p>
            <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`text-white text-sm font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform group-hover:scale-105 ${
                    isAdded 
                    ? 'bg-green-500 cursor-not-allowed' 
                    : 'bg-stone-800 hover:bg-amber-500'
                }`}
            >
                {isAdded ? 'Added!' : 'Add to Cart'}
            </button>
        </div>
      </div>
      {isModalOpen && <Modal />}
       <style>{`
        @keyframes fade-in-fast {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast {
            animation: fade-in-fast 0.2s ease-out forwards;
        }
    `}</style>
    </>
  );
};