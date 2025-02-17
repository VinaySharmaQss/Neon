import React from "react";
import { Link } from "react-router";

export default function ProfileMenu({ isOpen }) {
  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg text-black"
          style={{ fontFamily: "BrownRegular" }}
        >
          <ul className="flex flex-col text-left m-2">
           <Link to={"/edit-profile"}>
           <li className="py-2 hover:bg-gray-100 cursor-pointer">Edit profile</li>
           </Link>
            <li className="py-2 hover:bg-gray-100 cursor-pointer">Feedback</li>
            <Link to="/settings" >
            <li className="py-2 hover:bg-gray-100 cursor-pointer">Settings</li></Link>
            
          </ul>
        </div>
      )}
    </div>
  );
}