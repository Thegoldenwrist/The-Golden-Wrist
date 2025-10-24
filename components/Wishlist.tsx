import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import type { Product, WishlistItem, CartItem } from '../types';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const updateWishlistItems = () => {
    const wishlist: WishlistItem[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const itemsInWishlist = wishlist.map(wishlistItem => {
        return PRODUCTS.find(p => p.id === wishlistItem.id);
    }).filter((item): item is Product => !!item);
    setWishlistItems(itemsInWishlist);
  };

  useEffect(() => {
    if (isOpen) {
      updateWishlistItems();
    }
    
    const handleUpdate = () => updateWishlistItems();
    window.addEventListener('wishlist-updated', handleUpdate);
    
    return () => {
        window.removeEventListener('wishlist-updated', handleUpdate);
    };
  }, [isOpen]);

  const handleRemoveItem = (productId: number) => {
    let wishlist: WishlistItem[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };

  const handleAddToCart = (product: Product) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
    // Optionally remove from wishlist after adding to cart
    handleRemoveItem(product.id);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-50"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
    >
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className={`transform transition ease-in-out duration-500 sm:duration-700 w-screen max-w-md ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                My Wishlist
                            </h2>
                            <div className="ml-3 h-7 flex items-center">
                                <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                                    <span className="sr-only">Close panel</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flow-root">
                                {wishlistItems.length > 0 ? (
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {wishlistItems.map((product) => (
                                            <li key={product.id} className="py-6 flex">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />
                                                </div>
                                                <div className="ml-4 flex-1 flex flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href="#">{product.name}</a>
                                                            </h3>
                                                            <p className="ml-4">₹{product.price.toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 flex items-end justify-between text-sm">
                                                        <button 
                                                            type="button" 
                                                            className="font-medium text-amber-600 hover:text-amber-500"
                                                            onClick={() => handleAddToCart(product)}
                                                        >
                                                            Add to Cart
                                                        </button>
                                                        <div className="flex">
                                                            <button 
                                                                type="button" 
                                                                className="font-medium text-stone-600 hover:text-stone-500"
                                                                onClick={() => handleRemoveItem(product.id)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-center py-12">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
                                        <p className="mt-1 text-sm text-gray-500">Add some bracelets you love to see them here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {wishlistItems.length > 0 && (
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                <p>
                                    or <button type="button" className="text-amber-600 font-medium hover:text-amber-500" onClick={onClose}>
                                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};