import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        {/* Outer static ring */}
        <div
          className="absolute w-full h-full rounded-full border-4 border-gray-300 opacity-50"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        ></div>

        {/* Inner spinning ring */}
        <div
          className="absolute w-full h-full rounded-full border-4 border-t-transparent border-blue-600 animate-spin"
          style={{
            animationDuration: "0.8s",
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;
