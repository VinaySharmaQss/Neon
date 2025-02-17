import React, { useState } from "react";
import { Star } from "lucide-react"; // Using lucide-react for star icons
import { IoIosCloseCircleOutline } from "react-icons/io";

const ReviewModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [ratings, setRatings] = useState({
    quality: 0,
    services: 0,
    facilities: 0,
    operator: 0,
    politeness: 0,
  });

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Review
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl mt-40 mb-32 p-8 w-2xl shadow-xl">
            <div className="flex justify-between">
              <div
                className="text-lg font-semibold text-gray-800 mb-4"
                style={{ fontFamily: "IvyMode" }}
              >
                Add a review
              </div>
              <div className="mt-[-20px] ml-[30px]">
                <IoIosCloseCircleOutline
                  onClick={() => setIsModalOpen(false)}
                  className="text-2xl text-gray-500 cursor-pointer bg-white"
                />
              </div>
            </div>
            <p
              className="text-sm text-gray-600 mb-6"
              style={{ fontFamily: "BrownRegular" }}
            >
              Hi Charlie, if you’re here on this page, we bet you enjoy this
              event fully. Would you mind sharing your valuable feedback review
              with us?
            </p>

            {/* Quality of Event */}
            <div className="flex flex-row justify-between">
              <div className="mb-4">
                <p
                  className="text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "BrownRegular" }}
                >
                  Quality of Event
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-6 h-6 cursor-pointer ${
                        ratings.quality >= value
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating("quality", value)}
                    />
                  ))}
                </div>
              </div>

              {/* Services at Event */}
              <div className="mb-4" style={{ fontFamily: "BrownRegular" }}>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Services at Event
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-6 h-6 cursor-pointer ${
                        ratings.services >= value
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating("services", value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="mb-4">
                <p
                  className="text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "BrownRegular" }}
                >
                  Facilities of Event
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-6 h-6 cursor-pointer ${
                        ratings.facilities >= value
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating("facilities", value)}
                    />
                  ))}
                </div>
              </div>

              {/* Operator of Event */}
              <div className="mb-4">
                <p
                  className="text-sm font-medium text-gray-700 mb-1"
                  style={{ fontFamily: "BrownRegular" }}
                >
                  Operator of Event
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star
                      key={value}
                      className={`w-6 h-6 cursor-pointer ${
                        ratings.operator >= value
                          ? "text-black"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating("operator", value)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Staff Politeness */}
            <div className="mb-4">
              <p
                className="text-sm font-medium text-gray-700 mb-1"
                style={{ fontFamily: "BrownRegular" }}
              >
                Staff Politeness
              </p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`w-6 h-6 cursor-pointer ${
                      ratings.politeness >= value
                        ? "text-black"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating("politeness", value)}
                  />
                ))}
              </div>
            </div>

            {/* Feedback Input */}
            <div className="mb-4 mt-8">
              <textarea
                className="w-full border rounded-lg p-2 text-sm text-gray-700"
                rows="8"
                placeholder="Share your feedback and suggestions about this event..."
              ></textarea>
            </div>

            {/* Submit and Close Buttons */}
            <div className="flex gap-2">
              <button className="w-40 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;