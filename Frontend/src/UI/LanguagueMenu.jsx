import React from 'react'

const LanguagueMenu = ({isOpen}) => {
    return (
        <div className="relative">
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg text-black">
              <ul className="flex flex-col text-left m-2 text-base ">
                <li className="py-2 hover:bg-gray-100 cursor-pointer">English</li>
                <li className="py-2 hover:bg-gray-100 cursor-pointer">French</li>
                <li className=" py-2 hover:bg-gray-100 cursor-pointer">Arabic</li>
              </ul>
            </div>
          )}
        </div>
      );
}

export default LanguagueMenu