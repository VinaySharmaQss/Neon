import React from 'react'

const BlackWhiteButton = ({children, classes, onClick}) => {
  return (
    <button
    onClick={onClick}
     className={`${classes} h-12 w-24  bg-white text-center text-xs px-2 py-1 rounded-md transition-all border-2 border-gray-400 text-black hover:bg-black hover:text-white`}>
     {children}
    </button>
  )
}

export default BlackWhiteButton