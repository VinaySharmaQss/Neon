import  { useState } from "react";

const ButtonPair = () => {
  const [selected, setSelected] = useState(null);
  const options = ["10 mins drive", "20 mins drive", "30 mins drive"];
  return (
    <div className="flex justify-between items-center rounded-full border-[1px] border-black  w-[320px] h-[35px] max-w-xs mx-auto">
      <button
        onClick={() => setSelected(0)}
        className={`px-2 py-2 w-full text-center text-[10px] transition-all rounded-l-full ${
          selected === 0 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
        style={{fontFamily:"BrownRegular"}} 
      >
        {options[0]}
      </button>
      <button
        style={{ borderLeft: "1px solid #707070", borderRight: "1px solid #707070" ,fontFamily:"BrownRegular"}}
        onClick={() => setSelected(1)}
        className={`px-2 py-2 w-full text-center text-[10px] transition-all ${
          selected === 1 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
      
      >
        {options[1]}
      </button>
      <button
        onClick={() => setSelected(2)}
        className={`px-2 py-2 w-full text-center text-[10px] transition-all rounded-r-full ${
          selected === 2 ? "bg-black text-gray-200" : "text-black hover:bg-black hover:text-white"
        }`}
        style={{fontFamily:"BrownRegular"}} 
      >
        {options[2]}
      </button>
    </div>
  );
};

export default ButtonPair;