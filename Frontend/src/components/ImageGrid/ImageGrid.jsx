import React from 'react'
import BlackWhiteButton from '../../UI/BlackWhiteButton'

 export const ImageGrid = ({Image}) => {
  return (
    <div className="grid grid-cols-4 grid-rows-2  gap-1 rounded-2xl overflow-hidden">

    {/* Top-right smaller images */}
    <div className="grid grid-rows-1 grid-cols-2 gap-1 col-span-2">
      <img
        src={Image}
        alt="Wave Architecture 2"
        className="h-64 object-cover shadow-md"
      />
      <img
        src={Image}
        alt="Wave Architecture 3"
        className="h-64 object-cover  shadow-md"
      />
    </div>
       {/* Large image on the right */}
       <div className="col-span-2 row-span-2">
      <img
        src={Image}
        alt="Wave Architecture 6"
        className="w-full h-[517px] object-cover shadow-md relative"
      />
        
        <div className='absolute bottom-[-100px] left-[1140px]'>
        <BlackWhiteButton>Show all</BlackWhiteButton>
        </div>
      
    
    </div>

    {/* Bottom-left smaller images */}
    <div className="grid grid-rows-1 grid-cols-2 gap-1 col-span-2 ">
      <img
        src={Image}
        alt="Wave Architecture 4"
        className=" h-64 object-cover  shadow-md"
      />
      <img
        src={Image}
        alt="Wave Architecture 5"
        className=" h-64 object-cover shadow-md"
      />
    </div>

 
  </div>
  )
}

