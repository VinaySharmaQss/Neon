import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logoutReducer } from "../redux/features/user";

export default function ProfileMenu({ isOpen }) {
const navigate = useNavigate();
const dispatch = useDispatch();
function handleLogout(){
  dispatch(logoutReducer());
  navigate("/");
}
  return (
    <div className="relative">
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg text-black"
          style={{ fontFamily: "BrownRegular" }}
        >
          <ul className="flex flex-col text-left m-2">
          <Link to={`/edit-profile/${JSON.parse(localStorage.getItem("user")).id}`}>
           <li className="py-2 hover:bg-gray-100 cursor-pointer">Edit profile</li>
           </Link>
           <Link to={"/feedback"}>
           <li className="py-2 hover:bg-gray-100 cursor-pointer">Feedback</li>
           </Link>
            <Link to="/settings" >
            <li className="py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            </Link>
            <li className="py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
}