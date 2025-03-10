import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Testimonials from "../../UI/Testimonials";



// Helper function to determine cards per page based on window width
function getCardsPerPage() {
  if (typeof window !== "undefined") {
    const width = window.innerWidth;
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

export default function Slider4({ cards }) {
  // Determine the number of cards visible per page
  const cardsPerPage = useCardsPerPage();
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const [page, setPage] = useState(0);

  const nextSlide = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Calculate the total width for the sliding container
  const containerWidth = (cards.length / cardsPerPage) * 100;

  return (
    <div className="w-full ml-12">
      {/* Carousel Cards Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-1"
          style={{
            width: `${containerWidth}%`,
            transform: `translateX(-${page * (100 / totalPages)}%)`,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className=""
              style={{ flex: `0 0 8%` }}
            >
              <Testimonials key={i} {...card} />
            </div>
          ))}
        </motion.div>
      </div>
      {/* Navigation Buttons (Aligned to the left) */}
      <div className="w-full flex items-center justify-start gap-4 mt-4">
      <button
  onClick={prevSlide}
  className="bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100"
>
  <ArrowLeft className="w-4 h-4" />
</button>
<button
  onClick={nextSlide}
  className="bg-white p-1 rounded-full border border-black-300 shadow hover:bg-gray-100"
>
  <ArrowRight className="w-4 h-4" />
</button>

      </div>
    </div>
  );
}