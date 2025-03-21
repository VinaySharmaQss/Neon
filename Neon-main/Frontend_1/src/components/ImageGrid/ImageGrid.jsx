import React, { useState } from "react";

export const ImageGrid = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image, image, image]; // Array with three instances of the same image

  // Function to handle next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      {/* Image Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 rounded-xl overflow-hidden mr-[7vw] ml-[4vw]">
        {/* Top-left smaller images */}
        <div className="grid grid-rows-1 grid-cols-2 gap-3 col-span-2">
          <img
            src={image}
            alt="Wave Architecture 2"
            className="h-[230px] w-[275px] object-cover shadow-md"
          />
          <img
            src={image}
            alt="Wave Architecture 3"
            className="h-[230px] w-[275px] object-cover shadow-md"
          />
        </div>

        {/* Large image with button */}
        <div className="col-span-2 row-span-2 ml-1 relative">
          <img
            src={image}
            alt="Wave Architecture 6"
            className="w-[560px] h-[465px] object-cover shadow-md"
          />
          <div className="absolute bottom-4 right-4">
            <button
              className="h-12 w-24 bg-white text-center text-xs px-2 py-1 rounded-md transition-all border-2 border-gray-400 text-black hover:bg-black hover:text-white"
              onClick={() => setIsOpen(true)}
            >
              Show all
            </button>
          </div>
        </div>

        {/* Bottom-left smaller images */}
        <div className="grid grid-rows-1 grid-cols-2 gap-3 col-span-2">
          <img
            src={image}
            alt="Wave Architecture 4"
            className="h-[230px] w-[275px] object-cover shadow-md"
          />
          <img
            src={image}
            alt="Wave Architecture 5"
            className="h-[230px] w-[275px] object-cover shadow-md"
          />
        </div>
      </div>

      {/* Fullscreen Image Slider Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          {/* Image Display */}
          <div className="relative w-[90vw] h-[80vh] flex items-center justify-center">
            <button
              className="absolute left-5 text-white text-3xl bg-gray-800 p-2 rounded-full"
              onClick={prevImage}
            >
              ❮
            </button>
            <img
              src={images[currentIndex]}
              alt="Slider Image"
              className="h-[80vh] w-[80vh] object-cover"
            />
            <button
              className="absolute right-5 text-white text-3xl bg-gray-800 p-2 rounded-full"
              onClick={nextImage}
            >
              ❯
            </button>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-5 right-5 text-white text-2xl bg-gray-800 p-2 rounded-full"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};