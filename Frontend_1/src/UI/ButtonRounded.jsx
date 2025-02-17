import React, { useState } from "react";

const ButtonRounded = ({ children, width }) => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected(!selected)}
      className={`w-${width} h-8 text-[10px] flex  justify-center px-3 items-center rounded-full transition-all border-[1px] border-black ${
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

