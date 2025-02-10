import React, { useRef, useState, useEffect } from 'react';
import Cards1 from '../../components/Cards/Cards1/Cards1';
import { card1Data as cards } from '../../constants/data';
import { ArrowLeft, ArrowRight } from 'lucide-react';


const Slider = ({cardsData, CardComponent}) => {
    const carouselRef = useRef(null);
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    const scrollNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const checkButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setIsPrevDisabled(scrollLeft === 0);
            setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth);
        }
    };

    useEffect(() => {
        checkButtons();
        if (carouselRef.current) {
            carouselRef.current.addEventListener('scroll', checkButtons);
        }

        return () => {
            if (carouselRef.current) {
                carouselRef.current.removeEventListener('scroll', checkButtons);
            }
        };
    }, []);

    const cardWidthPercentage = 100 / 3; // Assuming 3 cards per view

    return (
        <div className="relative w-full ml-[50px] overflow-hidden">
            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="carousel flex w-full gap-8 overflow-x-auto snap-x snap-mandatory"
            >
                {cardsData.map((card, i) => (
                    <div
                        key={i}
                        style={{
                            flex: `0 0 ${cardWidthPercentage}%`,
                            marginRight: "-20px", // Each card takes equal width
                            padding: "0 0px", // Add spacing between cards
                        }}
                    >
                        <CardComponent {...card} />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex  gap-4 mt-4">
                <button
                    onClick={scrollPrev}
                    disabled={isPrevDisabled}
                    className={`border border-black rounded-full w-10 h-10 flex items-center justify-center shadow-md ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ArrowLeft className="w-6 h-6 text-black" />
                </button>
                <button
                    onClick={scrollNext}
                    disabled={isNextDisabled}
                    className={`border border-black rounded-full w-10 h-10 flex items-center justify-center shadow-md ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <ArrowRight className="w-6 h-6 text-black" />
                </button>
            </div>
        </div>
    );
};

export default Slider;
