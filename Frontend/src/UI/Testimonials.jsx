import React from "react";
import PropTypes from "prop-types";
import image from "../../assets/img/card2_1.jpg"; // Ensure this path is correct

const Testimonials = ({ userImage, userName, reviewDate, reviewText, rating }) => {


  return (
    <div
      className="w-80 h-70 p-4 border-2 border-black rounded-lg shadow-lg "
      style={{
        fontFamily: "BrownRegular",
      }}
    >
      {/* User Info */}
      <div className="flex items-center space-x-3">
        <img
          src={userImage || image} // Use userImage if provided, fallback to the imported image
          alt={`${userName}'s Avatar`}
          className="w-10 h-10 rounded-full"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop in case fallback fails
            e.target.src = image; // Fallback to the imported image if userImage fails to load
          }}
        />
        <div>
          <h3 className="font-semibold" style={{ fontFamily: "IvyMode" }}>{userName}</h3>
          <p className="text-xs text-gray-500" style={{ fontFamily: "BrownRegular", marginTop: "-3px" }}>{reviewDate}</p>
        </div>
      </div>

      {/* Review Content */}
      <p className="mt-3 text-sm text-gray-700" style={{ fontFamily: "BrownRegular" }}>
        {reviewText.length > 200
          ? `${reviewText.substring(0, 200)}...`
          : reviewText}
      </p>

      {/* Rating */}
      <div className="flex items-center mt-3">
        <span className="text-red-500 text-lg">
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
        </span>
        <span className="ml-2 text-sm font-semibold">{rating.toFixed(1)}</span>
      </div>

      {/* Read More */}
      
        <p className="mt-4 text-sm text-black underline cursor-pointer">
          Read more
        </p>
    
    </div>
  );
};



export default Testimonials;
