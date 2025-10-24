import React from 'react';
import type { Product } from '../types';

interface SocialShareProps {
  product: Product;
}

const FacebookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const TwitterIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.76 2.81 1.91 3.58-.71 0-1.37-.22-1.95-.55v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21c7.35 0 11.37-6.08 11.37-11.37 0-.17 0-.34-.01-.51.78-.57 1.45-1.28 1.98-2.08z" />
    </svg>
);

const PinterestIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.084-.336-.126-1.033.015-1.55.135-.585.855-3.62.855-3.62s-.225-.45-.225-1.11c0-1.04.6-1.83 1.35-1.83.63 0 .93.465.93 1.02 0 .615-.39 1.53-.585 2.37-.165.72.36 1.305.99 1.305 1.185 0 2.085-1.485 2.085-3.6 0-1.875-1.26-3.225-3.045-3.225-2.22 0-3.585 1.665-3.585 3.39 0 .6.225 1.245.51 1.605.06.075.075.135.045.24-.03.12-.105.42-.135.525-.045.15-.225.21-.375.12-1.275-.525-2.085-2.025-2.085-3.525 0-2.67 2.175-5.025 5.505-5.025 2.895 0 5.115 2.055 5.115 4.725 0 2.88-1.725 5.145-4.125 5.145-1.125 0-2.175-.585-2.535-1.275l-.765 2.925c-.27.99-.99 2.295-1.485 3.06C8.805 21.6 10.365 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
);

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.86L2.05 22L7.31 20.59C8.76 21.36 10.37 21.8 12.04 21.8C17.5 21.8 21.95 17.35 21.95 11.89C21.95 6.43 17.5 2 12.04 2ZM12.04 20.14C10.59 20.14 9.18 19.74 7.96 19L7.54 18.76L4.31 19.7L5.3 16.56L5.04 16.14C4.33 14.85 3.91 13.38 3.91 11.89C3.91 7.41 7.59 3.73 12.04 3.73C16.49 3.73 20.17 7.41 20.17 11.89C20.17 16.37 16.49 20.14 12.04 20.14ZM17.48 14.53C17.21 14.42 15.93 13.8 15.69 13.71C15.46 13.62 15.29 13.57 15.12 13.84C14.95 14.11 14.43 14.73 14.24 14.92C14.05 15.11 13.86 15.13 13.59 15.02C13.32 14.91 12.44 14.6 11.41 13.69C10.6 12.98 10.03 12.13 9.87 11.86C9.71 11.59 9.83 11.45 9.96 11.32C10.08 11.2 10.23 11.01 10.37 10.86C10.51 10.71 10.56 10.59 10.69 10.36C10.82 10.13 10.77 9.94 10.7 9.81C10.63 9.68 10.13 8.41 9.92 7.9C9.72 7.41 9.51 7.48 9.35 7.47H9.01C8.84 7.47 8.59 7.54 8.38 7.77C8.17 8 7.65 8.47 7.65 9.59C7.65 10.71 8.38 11.78 8.51 11.95C8.64 12.12 10.13 14.42 12.39 15.31C13.1 15.62 13.62 15.82 14.01 15.95C14.59 16.15 15.08 16.12 15.47 16.05C15.9 15.97 16.94 15.38 17.15 14.79C17.36 14.2 17.36 13.71 17.29 13.62C17.23 13.54 17.14 13.49 17.02 13.43C16.9 13.37 16.78 13.31 16.66 13.26L17.48 14.53Z" />
    </svg>
);


export const SocialShare: React.FC<SocialShareProps> = ({ product }) => {
    const pageUrl = window.location.href;
    const shareUrl = `${pageUrl.split('#')[0]}#product-${product.id}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const text = `Check out this beautiful ${product.name} from The Golden Wrist!`;
    const encodedText = encodeURIComponent(text);
    const encodedImageUrl = encodeURIComponent(product.imageUrl);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedText}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    };

    return (
        <div className="flex items-center space-x-3">
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-blue-600 transition-colors" aria-label="Share on Facebook">
                <FacebookIcon />
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-sky-500 transition-colors" aria-label="Share on Twitter">
                <TwitterIcon />
            </a>
            <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-red-600 transition-colors" aria-label="Share on Pinterest">
                <PinterestIcon />
            </a>
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-green-500 transition-colors" aria-label="Share on WhatsApp">
                <WhatsAppIcon />
            </a>
        </div>
    );
};
