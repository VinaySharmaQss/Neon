import React from 'react';
import BlackWhiteButton from '../../UI/BlackWhiteButton';

export const ImageGrid = ({ Image }) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-1 rounded-xl overflow-hidden mr-[7vw] ml-[4vw]">
      {/* Top-left smaller images */}
      <div className="grid grid-rows-1 grid-cols-2 gap-3 col-span-2">
        <img
          src={Image}
          alt="Wave Architecture 2"
          className="h-[230px] w-[275px] object-cover shadow-md"
        />
        <img
          src={Image}
          alt="Wave Architecture 3"
          className="h-[230px] w-[275px] object-cover shadow-md"
        />
      </div>

      {/* Large image with button */}
      <div className="col-span-2 row-span-2 ml-1 relative">
        <img
          src={Image}
          alt="Wave Architecture 6"
          className="w-[560px] h-[465px] object-cover shadow-md"
        />
        <div className="absolute bottom-4 right-4">
          <BlackWhiteButton>Show all</BlackWhiteButton>
        </div>
      </div>

      {/* Bottom-left smaller images */}
      <div className="grid grid-rows-1 grid-cols-2 gap-3 col-span-2">
        <img
          src={Image}
          alt="Wave Architecture 4"
          className="h-[230px] w-[275px] object-cover shadow-md"
        />
        <img
          src={Image}
          alt="Wave Architecture 5"
          className="h-[230px] w-[275px] object-cover shadow-md"
        />
      </div>
    </div>
  );
};
