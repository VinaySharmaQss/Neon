import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { backendUrl } from "../../utils/utils"; // Your API URL

const Test = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user with ID:", id);
        const response = await axios.get(`${backendUrl}user/${id}`, { withCredentials: true });
        console.log("Fetched user:", response.data.data);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phoneNumber}</p>
    </div>
  );
};

export default Test;
