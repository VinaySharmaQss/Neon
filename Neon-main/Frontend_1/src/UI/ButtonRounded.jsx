import React from "react";

const ButtonRounded = ({ children, width, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-${width} h-8 text-[10px] flex justify-center px-3 items-center rounded-full transition-all border-[1px] border-black ${
        active ? "bg-black text-white border-2 " : "text-black"
      }`}
      style={{ fontFamily: "BrownRegular" }}
    >
      {children}
    </button>
  );
};

export default ButtonRounded;