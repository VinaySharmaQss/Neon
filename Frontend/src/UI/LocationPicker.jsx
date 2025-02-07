import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationPicker = () => {
  return (
    <div className="flex items-center border-2 border-black rounded-full px-2 py-1 w-64 max-w-xs mx-auto">
      <FaMapMarkerAlt className="text-pink-500 ml-1" />
      <span className="ml-1 text-gray-700 text-sm" style={{ fontFamily: "BrownRegular" }}>Pick a location</span>
    </div>
  );
};

export default LocationPicker;