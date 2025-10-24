import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import type { Product, CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartProduct extends Product {
    quantity: number;
}

type CheckoutStep = 'cart' | 'payment' | 'upiDetails' | 'success';

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');

  const updateCartItems = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemsInCart = cart.map(cartItem => {
        const product = PRODUCTS.find(p => p.id === cartItem.id);
        return { ...product, quantity: cartItem.quantity } as CartProduct;
    }).filter(item => item.id); // Filter out any undefined products
    setCartItems(itemsInCart);
  };

  useEffect(() => {
    if (isOpen) {
      updateCartItems();
    } else {
        // Reset checkout state when cart is closed
        setTimeout(() => setCheckoutStep('cart'), 500);
    }
    
    window.addEventListener('cart-updated', updateCartItems);
    
    return () => {
        window.removeEventListener('cart-updated', updateCartItems);
    };
  }, [isOpen]);

  const updateCartInStorage = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const itemInCart = cart.find(item => item.id === productId);
        if (itemInCart) {
            itemInCart.quantity = newQuantity;
        }
    }
    updateCartInStorage(cart);
  };

  const handleRemoveItem = (productId: number) => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(id => id.id !== productId);
    updateCartInStorage(cart);
  };

  const handleProceedToPayment = () => {
    setCheckoutStep('payment');
  };

  const finalizeOrder = () => {
    setCheckoutStep('success');
    setTimeout(() => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new CustomEvent('cart-updated'));
        onClose();
    }, 3000);
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  if (!isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (checkoutStep) {
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold font-serif text-green-600 mt-6">Thank You!</h2>
            <p className="text-stone-600 mt-2">Your order has been placed successfully.</p>
            <p className="text-stone-500 mt-1 text-sm">The panel will close shortly.</p>
          </div>
        );
       case 'upiDetails':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                        Pay with UPI
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
                <div className="mt-8 text-center">
                    <p className="text-stone-600 mb-4">
                        Scan the QR code with your UPI app or use the UPI ID below.
                    </p>
                    <div className="flex justify-center my-6">
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=goldenwrist@upi&pn=The%20Golden%20Wrist&am=${totalPrice.toFixed(2)}&cu=INR`}
                            alt="UPI QR Code"
                            className="w-48 h-48 border-4 border-stone-200 rounded-lg shadow-md"
                        />
                    </div>
                    <p className="text-stone-700 font-semibold">UPI ID:</p>
                    <p className="text-lg font-bold text-amber-600 tracking-wider bg-stone-100 py-2 px-4 rounded-md inline-block my-2">
                        goldenwrist@upi
                    </p>
                    <p className="text-stone-700 font-semibold mt-4">Amount to Pay:</p>
                    <p className="text-2xl font-bold font-serif text-stone-900">
                        ₹{totalPrice.toFixed(2)}
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={finalizeOrder}
                            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                            I have paid
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-center text-sm text-center text-gray-500">
                    <p>
                        <button type="button" className="text-amber-600 font-medium hover:text-amber-500" onClick={() => setCheckoutStep('payment')}>
                            <span aria-hidden="true">&larr;</span> Back to Payment Options
                        </button>
                    </p>
                </div>
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                        Payment Method
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
                <div className="mt-8 space-y-4">
                    <button
                        onClick={finalizeOrder}
                        className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-stone-800 hover:bg-stone-900"
                    >
                        Cash on Delivery
                    </button>
                    <button
                        onClick={() => setCheckoutStep('upiDetails')}
                        className="w-full flex justify-center items-center px-6 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                    >
                        Pay with UPI
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-center text-sm text-center text-gray-500">
                    <p>
                        <button type="button" className="text-amber-600 font-medium hover:text-amber-500" onClick={() => setCheckoutStep('cart')}>
                            <span aria-hidden="true">&larr;</span> Back to Cart
                        </button>
                    </p>
                </div>
            </div>
          </div>
        );
      case 'cart':
      default:
        return (
          <>
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                  Shopping cart
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
                  {cartItems.length > 0 ? (
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cartItems.map((product) => (
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
                                <p className="ml-4">₹{(product.price * product.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center border border-gray-200 rounded">
                                <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} className="px-2 py-1 text-gray-600">-</button>
                                <p className="text-gray-700 px-3">{product.quantity}</p>
                                <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} className="px-2 py-1 text-gray-600">+</button>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-amber-600 hover:text-amber-500"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p className="mt-1 text-sm text-gray-500">Add some bracelets to get started.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{totalPrice.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700"
                  >
                    Checkout
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or <button type="button" className="text-amber-600 font-medium hover:text-amber-500" onClick={onClose}>
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </>
        );
    }
  };

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
                    {renderContent()}
                </div>
            </div>
        </div>
    </div>
  );
};