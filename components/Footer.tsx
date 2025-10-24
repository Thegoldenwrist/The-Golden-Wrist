
import React from 'react';

const GoldenWristIcon: React.FC = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 text-amber-400"
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
        clipRule="evenodd"
      />
    </svg>
);

interface FooterProps {
  onShowAboutUs: () => void;
  onShowContact: () => void;
  onShowFAQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShowAboutUs, onShowContact, onShowFAQ }) => {
  const handleShowAboutUsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShowAboutUs();
  };

  const handleShowContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShowContact();
  };

  const handleShowFAQClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onShowFAQ();
  };

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
             <div className="flex items-center space-x-3 mb-4">
                <GoldenWristIcon />
                <span className="text-xl font-bold font-serif text-white">The Golden Wrist</span>
             </div>
            <p className="text-sm text-stone-400">Crafting timeless elegance for your wrist.</p>
             <div className="mt-4 flex items-center space-x-2 text-sm text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:7584061883" className="hover:text-amber-400 transition-colors">7584061883</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">All Bracelets</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#about-us" onClick={handleShowAboutUsClick} className="hover:text-amber-400 transition-colors">Our Story</a></li>
              <li><a href="#contact-us" onClick={handleShowContactClick} className="hover:text-amber-400 transition-colors">Contact Us</a></li>
              <li><a href="#faq" onClick={handleShowFAQClick} className="hover:text-amber-400 transition-colors">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider">Stay Connected</h3>
            <p className="mt-4 text-sm">Sign up for our newsletter for exclusive deals.</p>
            <div className="mt-4 flex">
              <input type="email" placeholder="Your email" className="w-full bg-stone-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-400"/>
              <button className="bg-amber-500 text-white px-4 py-2 rounded-r-md hover:bg-amber-600 transition-colors">Go</button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-stone-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-stone-500">
            <p>&copy; {new Date().getFullYear()} The Golden Wrist. All rights reserved.</p>
            <p className="mt-4 sm:mt-0">A demonstration of world-class frontend engineering.</p>
        </div>
      </div>
    </footer>
  );
};
