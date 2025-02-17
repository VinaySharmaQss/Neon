import React from 'react';

const CancelEventModal = ({ name = "Charlie", onConfirm, onCancel }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Hey {name},</h2>
        <p className="mt-2 text-gray-600">Are you sure you want to cancel this event?</p>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onCancel}
            className="text-gray-500 underline hover:text-gray-700"
          >
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelEventModal;
