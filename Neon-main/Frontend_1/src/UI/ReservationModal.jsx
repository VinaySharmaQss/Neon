import React, { useState } from "react";

const ReservationModal = ({ name = "Charlie", event = "Round of Golf", onReserve, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState("Jan 1, 2023");
  const [selectedTime, setSelectedTime] = useState("10:00 AM - 3:30 PM");
  const [selectedSeats, setSelectedSeats] = useState("1 seat");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold">Hey {name},</h2>
        <p className="mt-2 text-gray-600">
          You have chosen a new "{event}" event on {selectedDate} at {selectedTime}.
          Have a great day ahead and enjoy your round of golf!
        </p>

        {/* Selection Dropdowns */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-medium">Select a day</label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option>Jan 1, 2023</option>
            <option>Jan 2, 2023</option>
            <option>Jan 3, 2023</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-medium">Select a time slot</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option>10:00 AM - 3:30 PM</option>
            <option>4:00 PM - 8:00 PM</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-medium">Select your seats</label>
          <select
            value={selectedSeats}
            onChange={(e) => setSelectedSeats(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option>1 seat</option>
            <option>2 seats</option>
            <option>3 seats</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => onReserve(selectedDate, selectedTime, selectedSeats)}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Reserve my seats
          </button>
          <button
            onClick={onCancel}
            className="text-gray-500 underline hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
