import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Card5 from '../Cards/Card5/Card5';

const Slider3 = ({ cards = [] }) => {
  // Number of cards visible per page
  const cardsPerPage = 3; // You can also make this dynamic depending on screen size
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const [page, setPage] = useState(0);

  const nextSlide = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Calculate the width for the sliding container
  const containerWidth = (cards.length / cardsPerPage) * 100;

  return (
    <div className="w-full mx-12">
      {/* Carousel Cards Container */}
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex gap-4"
          style={{
            width: `${containerWidth}%`,
            transform: `translateX(-${page * (100 / totalPages)}%)`, // Apply sliding animation
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 45%`, // Adjust card width based on how many are visible
              }}
            >
              <Card5 {...card} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-start gap-4 mt-4">
        <button
          onClick={prevSlide}
          disabled={page === 0} // Disable if on the first slide
          className={`bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100 ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          disabled={page === totalPages - 1} // Disable if on the last slide
          className={`bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100 ${page === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Slider3;
