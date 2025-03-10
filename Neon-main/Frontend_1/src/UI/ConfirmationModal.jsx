import React from 'react';

const ConfirmationMessage = ({ name = "Charlie", event = "Round of Golf", time = "4:40 PM", onClose }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Great {name},</h2>
        <p className="mt-2 text-gray-600">
          You have chosen a new "{event}" event today at {time}. Have a great day ahead and enjoy your new round of golf!
        </p>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Okay!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationMessage;
