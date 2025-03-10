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
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add a review</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 text-sm mb-4">
          Hi Charlie, If you're here on this page, we bet you enjoy this event
          fully. Would you mind sharing your valuable feedback review with us?
        </p>
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category}>
              <p className="text-gray-800">{category}</p>
              <div className="flex gap-1">
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
        <textarea
          className="w-full border p-2 mt-4 rounded-md"
          placeholder="Share your feedback and suggestions about this event..."
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="bg-black text-white w-full py-2 mt-4 rounded-md hover:bg-gray-800">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;