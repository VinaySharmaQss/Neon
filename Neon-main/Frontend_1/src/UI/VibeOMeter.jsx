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
          <div className="bg-white p-5 rounded-lg shadow-xl w-[380px] h-[500px] flex flex-col justify-between relative animate-fadeIn">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg"
              onClick={() => {
                setShowModal(false);
                onClose();
              }}
            >
              ✕
            </button>

            {/* Modal Heading */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Vibe-o-meter</h2>
              <p className="text-gray-600 text-sm mt-1">
                How was your experience? Your feedback helps us improve!
              </p>
            </div>

            {/* Speedometer Gauge */}
            <div className="flex flex-col items-center">
              <Speedometer
                value={vibeValue}
                minValue={0}
                maxValue={500}
                segments={5}
                needleColor="black"
                startColor="green"
                endColor="red"
                ringWidth={20}
                width={220}
                height={150} // Decreased height
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
                className="w-full mt-4 accent-black cursor-pointer"
              />
            </div>

            {/* Feedback Textarea */}
            <textarea
              className="w-full p-2 border rounded-lg text-gray-700 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Share your experience..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={5}
            />

            {/* Submit Button */}
            <button
              onClick={handleSubmitFeedback}
              className="w-[100px] mt-2 px-3 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
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
