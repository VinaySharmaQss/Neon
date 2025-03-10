import React, { useState } from "react";
import Speedometer from "react-d3-speedometer";

const VibeOMeter = ({ flag, onClose }) => {
  const [showModal, setShowModal] = useState(flag);
  const [vibeValue, setVibeValue] = useState(200); // Default position
  const [feedback, setFeedback] = useState("");

  // Vibe labels and emojis based on the meter value
  const getVibeText = (value) => {
    if (value < 100) return "😁 Happy";
    if (value < 250) return "😐 Neutral";
    if (value < 400) return "😰 Overwhelmed";
    return "😡 Frustrated";
  };

  const handleSubmitFeedback = () => {
    alert(`Feedback Submitted: ${feedback}`);
    setShowModal(false);
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl w-full max-w-xs relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => {
                setShowModal(false);
                onClose();
              }}
            >
              ✕
            </button>

            {/* Modal Heading */}
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Vibe-o-meter
            </h2>
            <p className="text-gray-600 text-xs text-center mt-1 mb-3">
              How was your experience? Your feedback helps us improve!
            </p>

            {/* Speedometer Gauge */}
            <div className="flex flex-col items-center space-y-1">
              <Speedometer
                value={vibeValue}
                minValue={0}
                maxValue={500}
                segments={5}
                needleColor="black"
                startColor="green"
                endColor="red"
                ringWidth={20}
                width={200}
                height={120} // Decreased height
                currentValueText={getVibeText(vibeValue)}
                textColor="black"
              />

              {/* Slider Control */}
              <input
                type="range"
                min="0"
                max="500"
                step="50"
                value={vibeValue}
                onChange={(e) => setVibeValue(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Feedback Textarea */}
            <textarea
              className="w-full mt-2 p-2 border rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={2} // Reduced height
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmitFeedback}
              className="w-full mt-3 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VibeOMeter;