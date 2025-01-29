import React from 'react'

const NavbarItem = ({ children }) => {
  return (
    <ul className="flex items-center space-x-4">
      <li className="hover:text-red-500 hover:underline hover:underline-offset-4 hover:cursor-pointer font-semibold text-base">
        {children}
      </li>
    </ul>
  )
}

export default NavbarItem