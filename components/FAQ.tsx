
import React, { useState } from 'react';

interface FAQProps {
  onClose: () => void;
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const faqs = [
  {
    question: "What are your shipping policies?",
    answer: "Currently, our shipping is exclusively available within the Wagholi area of Pune. We strive to deliver your orders promptly, with an estimated delivery time of 1-2 business days for all local shipments. Delivery charges are calculated based on the distance from our outlet to your location."
  },
  {
    question: "How do I care for my bracelet?",
    answer: "To keep your bracelet looking its best, we recommend avoiding direct contact with water, perfumes, and lotions. When you're not wearing it, store it in a cool, dry place."
  },
  {
    question: "Can I request a custom order?",
    answer: "Absolutely! We love bringing your unique ideas to life. Please get in touch with us through our contact details to discuss what you have in mind. We'd be excited to create a special piece just for you. Kindly note that custom orders may involve additional charges based on the design's complexity and the materials required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We offer flexible payment options for your convenience. You can pay securely via UPI (such as Google Pay and PhonePe) or opt for Cash on Delivery (COD) when your order arrives."
  },
  {
      question: "Are the bracelets really handmade?",
      answer: "Yes, they are! Every single bracelet is handcrafted with passion and meticulous care by us, Manvik and Daksh. We believe this personal touch is what makes our bracelets so special."
  }
];

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-stone-200">
    <h2>
      <button
        type="button"
        className="flex justify-between items-center w-full py-5 px-6 text-left font-semibold text-stone-800 hover:bg-stone-50"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </h2>
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
    >
        <div className="overflow-hidden">
            <div className="px-6 pb-5 text-stone-600">
                {answer}
            </div>
        </div>
    </div>
  </div>
);

export const FAQ: React.FC<FAQProps> = ({ onClose }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleItemClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section id="faq" className="bg-white py-20 sm:py-24 relative animate-fadeInDown">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button 
            onClick={onClose} 
            className="absolute -top-16 right-0 sm:-top-12 sm:right-0 text-stone-500 hover:text-stone-800 transition-colors z-10 p-2"
            aria-label="Close FAQ section"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold font-serif text-stone-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-stone-600">
            Have questions? We've got answers. Here are some of the most common things we get asked.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-stone-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleItemClick(index)}
            />
          ))}
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
