import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationPicker = ({ options, value, onChange }) => {
  return (
    <div className="relative w-[225px] h-[35px] max-w-xs mx-auto">
      {/* Hidden select element covering the entire container */}
      <select
        value={value}
        onChange={onChange}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer appearance-none"
      >
        <option value="">Pick a location</option>
        {options.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
      </select>
      {/* Visible container */}
      <div className="flex items-center border-[1px] border-black rounded-full px-2 py-1 w-full h-full">
        <FaMapMarkerAlt className="text-pink-500 ml-1" />
        <span
          className="ml-1 text-gray-700 text-[10px]"
          style={{ fontFamily: "BrownRegular" }}
        >
          {value || "Pick a location"}
        </span>
      </div>
    </div>
  );
};

export default LocationPicker;
