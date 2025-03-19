import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { modalToggle, postReview } from "../../redux/features/modal";
import VibeOMeter from "../../UI/VibeOMeter";

const categories = [
  { key: "quality", label: "Quality of Event" },
  { key: "services", label: "Services at Event" },
  { key: "facilities", label: "Facilities of Event" },
  { key: "operator", label: "Operator of Event" },
  { key: "politeness", label: "Staff Politeness" },
];

const ReviewModal = ({ placeId, cusineId, isModalOpen }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.modal);

  const [ratings, setRatings] = useState(
    categories.reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {})
  );
  const [feedback, setFeedback] = useState("");
  const [showVibeOMeter, setShowVibeOMeter] = useState(false);

  const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
  const userId = useSelector((state) => state.user?.user?.id) 
                ?? JSON.parse(localStorage.getItem("user"))?.id
                ?? null;
  const userImage = useSelector((state) => state.user?.user?.Image) 
                ?? JSON.parse(localStorage.getItem("user"))?.Image
                ?? null;
  const reviewDate = new Date(Date.now()).toISOString();

  const handleRating = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleSubmit = () => {
    const reviewData = {
      userId,
      userName,
      userImage,
      feedback,
      ratings,
      placeId,
      cusineId,
      reviewDate
    };
    dispatch(postReview(reviewData))
      .unwrap()
      .then(() => {
        console.log("Review submitted successfully");
        dispatch(modalToggle()); // Close modal on success
        setFeedback("");
        setRatings(
          categories.reduce((acc, { key }) => ({ ...acc, [key]: 0 }), {})
        );
        setShowVibeOMeter(true); // Open VibeOMeter modal
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
      });
  };

  return (
    <div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white rounded-2xl p-6 shadow-xl w-[531px] h-[550px] flex flex-col justify-between"
            style={{ fontFamily: "BrownRegular" }}
          >
            {/* Header */}
            <div className="flex justify-between items-center ">
              <h2
                className="text-lg font-semibold text-gray-800 mb-[-50px]"
                style={{ fontFamily: "IvyMode" }}
              >
                Add a review
              </h2>
              <IoIosCloseCircleOutline
                onClick={() => dispatch(modalToggle())}
                className="text-2xl text-gray-500 cursor-pointer"
              />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600">
              Hi {userName}, if you’re here on this page, we bet you enjoyed this
              event. Would you mind sharing your valuable feedback with us?
            </p>

            {/* Ratings */}
            <div className="grid grid-cols-2 gap-2 mt-[-20px]">
              {categories.map(({ key, label }) => (
                <div key={key}>
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={`w-5 h-5 cursor-pointer ${
                          ratings[key] >= value ? "text-black" : "text-gray-300"
                        }`}
                        onClick={() => handleRating(key, value)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback */}
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm text-gray-700 mt-2"
              rows="3"
              placeholder="Share your feedback and suggestions about this event..."
            ></textarea>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-[100px] bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition mt-2"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            {error && (
              <p className="text-sm text-red-500 text-center mt-1">{error}</p>
            )}
          </div>
        </div>
      )}

      {/* VibeOMeter Modal */}
      {showVibeOMeter && <VibeOMeter flag={true} onClose={() => setShowVibeOMeter(false)} />}
    </div>
  );
};

export default ReviewModal;
