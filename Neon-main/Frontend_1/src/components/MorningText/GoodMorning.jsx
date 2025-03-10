import React from 'react'
import { useSelector } from 'react-redux';


const GoodMorning = () => {
  const userName = useSelector((state) => state.user?.user?.name) 
                ?? JSON.parse(localStorage.getItem("user"))?.name 
                ?? "Guest";
  return (
    <div className='mx-[52px] my-8' >
      <h1 className='text-[25px]' style={{ fontFamily: "IvyMode" }}>Good morning {userName}!</h1>
      <p className='font-brown text-[13px] mt-[8px] ' style={{ fontFamily: "BrownRegular" }}>Below the listed are your itineraries, have a look at the timings and the location</p>
      <p className='font-brown text-[13px] mt-[-15px]' style={{ fontFamily: "BrownRegular" }}>We wish you enjoy the activities and the weather!</p>
    </div>
  )
}

export default GoodMorning