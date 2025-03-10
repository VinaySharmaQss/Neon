import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";

const ModalComponent = ({ isOpen, onClose, location }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-2xl max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{location.name}</h2>
          <IoIosCloseCircleOutline 
            onClick={onClose} 
            className="text-2xl text-gray-500 cursor-pointer"
          />
        </div>
        <div className="mt-4">
          <img src={location.image} alt={location.name} className="w-full h-48 object-cover rounded-lg"/>
          <p className="mt-4 text-gray-600">Location: {location.lat}, {location.lng}</p>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;