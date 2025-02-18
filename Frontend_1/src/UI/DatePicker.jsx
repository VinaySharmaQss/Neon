
import { MdOutlineDateRange } from "react-icons/md";

const DatePicker = () => {
  return (
    <div className="flex items-center border-[1px] border-black  rounded-full px-2 py-1 w-[100px] h-[35px] max-w-xs mx-auto">
      <MdOutlineDateRange className="text-pink-500 ml-1" />
      <span
        className="ml-1 text-gray-700 text-[10px]"
        style={{ fontFamily: "BrownRegular" }}
      >
        Pick a Date
      </span>
    </div>
  );
};

export default DatePicker;