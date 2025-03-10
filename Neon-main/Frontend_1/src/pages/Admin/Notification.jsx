import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../../utils/utils";

const NotificationCreatePage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${backendUrl}places/all`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setPlaces(response.data.message);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log("Error fetching places for notification: " + error);
      }
    };
    fetchPlaces();
  }, []);

  const handleSendNotification = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Please enter a message.");
      return;
    }

    if (!selectedPlaceId) {
      toast.error("Please select a place.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}user/notification`,
        { message, placeId: selectedPlaceId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Notification sent successfully!");
      setMessage("");
      setSelectedPlaceId("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send notification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create Notification</h2>
      <form onSubmit={handleSendNotification} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            placeholder="Enter your message"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Select Place</label>
          <select
            value={selectedPlaceId}
            onChange={(e) => setSelectedPlaceId(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
            required
          >
            <option value="" disabled>
              -- Select a place --
            </option>
            {places.map((place) => (
              <option key={place.id} value={place.id}>
                {place.title} (ID: {place.id})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-800"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
    </div>
  );
};

export default NotificationCreatePage;
