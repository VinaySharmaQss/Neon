import React, { useState } from "react";

const ButtonRounded = ({ children, width }) => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`w-${width} h-8 text-xs px-2 py-1 rounded-full transition-all border-2 border-black ${
        selected ? "bg-black text-white border-2 border-white" : "text-black"
      }`
    }
    style={{ fontFamily: "BrownRegular" }}
    >
      {children}
    </button>
  );
};

export default ButtonRounded;

