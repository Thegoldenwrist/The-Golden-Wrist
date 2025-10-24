
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Wishlist } from './components/Wishlist';
import { ContactUs } from './components/ContactUs';
import { FAQ } from './components/FAQ';

interface HeroSectionProps {
  onShopNowClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onShopNowClick }) => {
    return (
        <div className="relative bg-stone-800">
            <div className="absolute inset-0">
                <img className="w-full h-full object-cover opacity-30" src="https://picsum.photos/seed/bracelet/1600/900" alt="Hero background of bracelets"/>
            </div>
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-48 text-center text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-serif tracking-tight">
                    Timeless Elegance,
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold font-serif tracking-tight mt-2">
                    <span className="text-amber-400">Perfectly Crafted</span>
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-stone-200">
                    Find the perfect bracelet to complement your style. Handcrafted with passion, designed for you.
                </p>
                <div className="mt-10">
                    <a 
                        href="#our-collection" 
                        onClick={onShopNowClick}
                        className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105 text-lg"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    )
}

interface AboutUsProps {
  onClose: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onClose }) => {
  return (
    <section id="about-us" className="bg-white py-20 sm:py-24 relative animate-fadeInDown">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
            onClick={onClose} 
            className="absolute -top-16 right-0 sm:-top-12 sm:right-0 text-stone-500 hover:text-stone-800 transition-colors z-10 p-2"
            aria-label="Close our story section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-serif text-stone-900">Our Story</h2>
          <p className="mt-4 text-lg text-stone-600">
            Welcome to The Golden Wrist, a brand born from the shared dream of two friends.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto text-stone-700 text-base leading-relaxed space-y-6 text-left md:text-justify">
          <p>
            We're Manvik Saraf and Kumar Daksh Gupta, and our story began when we were 13-year-old classmates at Sri Chaitanya Techno School in Wagholi, Pune. Our journey started right here in the vibrant city of Pune, Maharashtra, with a simple idea: to create beautiful, handcrafted bracelets that were more than just accessories—they were a form of expression.
          </p>
          <p>
            We believed that elegance was for everyone, regardless of age, and that a single piece of jewelry could tell a powerful story. Every bracelet we designed became a piece of our passion. We poured our hearts into crafting each one, hoping to bring a touch of 'The Golden Wrist' magic into your life.
          </p>
          <p className="font-semibold text-center mt-8 text-stone-800">
            We're incredibly excited to share our creations with you. Thank you for being a part of our journey.
          </p>
          <p className="text-center font-serif text-lg text-amber-600">
            - Manvik & Daksh
          </p>
        </div>
      </div>
       <style>{`
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out forwards; }
      `}</style>
    </section>
  );
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isFAQVisible, setIsFAQVisible] = useState(false);

  const handleShowAboutUs = () => {
    setIsContactVisible(false);
    setIsFAQVisible(false);
    setIsAboutUsVisible(true);
  };

  const handleShowContact = () => {
    setIsAboutUsVisible(false);
    setIsFAQVisible(false);
    setIsContactVisible(true);
  }

  const handleShowFAQ = () => {
    setIsAboutUsVisible(false);
    setIsContactVisible(false);
    setIsFAQVisible(true);
  }

  const handleHomeClick = () => {
    setIsAboutUsVisible(false);
    setIsContactVisible(false);
    setIsFAQVisible(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleShopNowClick = (event?: React.MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    const element = document.getElementById('our-collection');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (isAboutUsVisible) {
      setTimeout(() => {
        const aboutSection = document.getElementById('about-us');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [isAboutUsVisible]);

  useEffect(() => {
    if (isContactVisible) {
      setTimeout(() => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [isContactVisible]);

  useEffect(() => {
    if (isFAQVisible) {
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }, [isFAQVisible]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onShowAboutUs={handleShowAboutUs}
        onShowContact={handleShowContact}
        onHomeClick={handleHomeClick}
        onShopClick={() => handleShopNowClick()}
      />
      <main className="flex-grow">
        <HeroSection onShopNowClick={handleShopNowClick} />
        <ProductList searchTerm={searchTerm} />
        {isAboutUsVisible && <AboutUs onClose={() => setIsAboutUsVisible(false)} />}
        {isContactVisible && <ContactUs onClose={() => setIsContactVisible(false)} />}
        {isFAQVisible && <FAQ onClose={() => setIsFAQVisible(false)} />}
      </main>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
      <Footer 
        onShowAboutUs={handleShowAboutUs} 
        onShowContact={handleShowContact}
        onShowFAQ={handleShowFAQ}
      />
    </div>
  );
};

export default App;
