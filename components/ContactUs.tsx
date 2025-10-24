
import React from 'react';

interface ContactUsProps {
  onClose: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {
  return (
    <section id="contact-us" className="bg-stone-100 py-20 sm:py-24 relative animate-fadeInDown">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
            onClick={onClose} 
            className="absolute -top-16 right-0 sm:-top-12 sm:right-0 text-stone-500 hover:text-stone-800 transition-colors z-10 p-2"
            aria-label="Close contact us section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-serif text-stone-900">Get In Touch</h2>
          <p className="mt-4 text-lg text-stone-600">
            We'd love to hear from you! Reach out with any questions or for custom orders.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-stone-800">Call Us</h3>
                <a href="tel:7584061883" className="text-2xl font-bold font-serif text-amber-600 hover:underline transition-colors">
                  7584061883
                </a>
              </div>
            </div>
            <div className="border-t border-stone-200"></div>
             <div className="flex items-center">
              <div className="flex-shrink-0 bg-amber-100 rounded-full p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-stone-800">Email Us</h3>
                <a href="mailto:Ayansaraf1883@gmail.com" className="text-2xl font-bold font-serif text-amber-600 hover:underline transition-colors">
                  Ayansaraf1883@gmail.com
                </a>
              </div>
            </div>
          </div>
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
