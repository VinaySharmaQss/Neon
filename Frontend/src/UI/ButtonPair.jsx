import React, { useState } from "react";

const ButtonPair = () => {
  const [selected, setSelected] = useState(null);
  const options = ["10 mins drive", "20 mins drive", "30 mins drive"];
  return (
    <div className="flex justify-between items-center rounded-full border-2 border-gray-400 p-1 w-full max-w-xs mx-auto">
      <button
        onClick={() => setSelected(0)}
        className={`px-1 py-1 w-full text-center text-xs transition-all rounded-l-full ${
          selected === 0 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
      >
        {options[0]}
      </button>
      <button
        style={{ borderLeft: "1px solid #707070", borderRight: "1px solid #707070" }}
        onClick={() => setSelected(1)}
        className={`px-1 py-1 w-full text-center text-xs transition-all ${
          selected === 1 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
      >
        {options[1]}
      </button>
      <button
        onClick={() => setSelected(2)}
        className={`px-1 py-1 w-full text-center text-xs transition-all rounded-r-full ${
          selected === 2 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
      >
        {options[2]}
      </button>
    </div>
  );
};

export default ButtonPair;