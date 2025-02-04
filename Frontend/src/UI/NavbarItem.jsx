import React from 'react'

const NavbarItem = ({ children }) => {
  return (
    <ul className="flex items-center space-x-4" style={{fontFamily: "BrownMedium"}}>
      <li className="hover:text-red-500 hover:underline hover:underline-offset-4 hover:cursor-pointer  text-base">
        {children}
      </li>
    </ul>
  )
}

export default NavbarItem