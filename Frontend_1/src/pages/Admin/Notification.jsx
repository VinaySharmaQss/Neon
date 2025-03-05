import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { backendUrl } from "../../utils/utils";

const NotificationCreatePage = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendNotification = async (e) => {
    e.preventDefault();

    if (!message) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${backendUrl}user/notification`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Notification sent successfully!");
      setMessage("");
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
