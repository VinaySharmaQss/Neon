import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Cards2 from "../Cards/Cards2/Cards2";

// Helper function to determine cards per page based on window width
function getCardsPerPage() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
    if (width > 1440) return 4; // Adjusted for larger screens
    if (width > 1024) return 3;
    if (width > 768) return 2;
  }
  return 1;
}

// Custom hook to update cards per page on resize
function useCardsPerPage() {
  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return cardsPerPage;
}

export default function Slider2({ cards }) {
  const cardsPerPage = useCardsPerPage();
  const [translateX, setTranslateX] = useState(0);

  const gap = 24; // Gap between cards in pixels
  const totalGap = (cardsPerPage - 1) * gap; // Total gap for all visible cards
  const cardWidthPercentage = (100 - totalGap / cardsPerPage) / cardsPerPage; // Width of each card (adjusted for gaps)

  const handleNext = () => {
    const maxTranslateX = -(cards.length - cardsPerPage) * (cardWidthPercentage + gap / cardsPerPage);
    if (translateX > maxTranslateX) {
      setTranslateX((prev) => Math.max(prev - (cardWidthPercentage + gap / cardsPerPage), maxTranslateX));
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX((prev) => Math.min(prev + (cardWidthPercentage + gap / cardsPerPage), 0));
    }
  };

  return (
    <div className=" ml-[50px]">
      {/* Carousel Cards Container */}
      <div className="overflow-hidden relative">
        <motion.div
          style={{
            display: "flex",
            gap: `${gap}px`, 
            // Add consistent gap between cards
            // width: `${cards.length * (cardWidthPercentage + gap / cardsPerPage)}%`, // Total width of all cards
          }}
          animate={{ x: `${translateX}%` }} // Use percentage for smooth transitions
          transition={{ duration: 0.7 }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 100px`, // Set fixed width for each cardpx`, // Set dynamic width for each card
              }}
            >
              <Cards2 {...card} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-start gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={translateX === 0} // Disable if on the first slide
          className={`bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100 ${
            translateX === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          disabled={
            translateX ===
            -((cards.length - cardsPerPage) * (cardWidthPercentage + gap / cardsPerPage)) // Disable if on the last slide
          }
          className={`bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100 ${
            translateX ===
            -((cards.length - cardsPerPage) * (cardWidthPercentage + gap / cardsPerPage))
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
