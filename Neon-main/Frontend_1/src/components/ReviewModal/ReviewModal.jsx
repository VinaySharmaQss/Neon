import { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ isOpen, onClose }) => {
  const categories = [
    "Quality of Event",
    "Services at Event",
    "Facilities of Event",
    "Operator of Event",
    "Staff Politeness",
  ];

  const [ratings, setRatings] = useState(
    categories.reduce((acc, category) => ({ ...acc, [category]: 0 }), {})
  );
  const [feedback, setFeedback] = useState("");

  const handleRating = (category, rating) => {
    setRatings((prev) => ({ ...prev, [category]: rating }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white w-[500px] rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between  border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add a review</h2>
          <button
            className="text-gray-600 hover:text-gray-900 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          <p className="text-sm text-gray-700 mb-5">
            Hi Charlie, If you're here on this page, we bet you enjoy this event
            fully. Would you mind sharing your valuable feedback review with us?
          </p>

          {/* Categories in Two Columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5">
            {categories.map((category) => (
              <div key={category}>
                <p className="text-gray-800 font-medium">{category}</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${
                        ratings[category] >= star
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRating(category, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Textarea */}
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            rows={4}
            placeholder="Share your feedback and suggestions about this event..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          {/* Submit Button */}
          <button className="mt-5 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
