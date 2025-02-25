import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaPhone, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../utils/utils";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    phoneNumber: "",
    Image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
     
    if (name === "Image") {
      console.log("Image selected:", files); // Debugging

      if (files.length > 0) {
        console.log("Image selected:", files[0]); // Debugging
        setFormData({ ...formData, Image: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("DOB", new Date(formData.DOB).toISOString()); // Convert to ISO DateTime
    data.append("phoneNumber", formData.phoneNumber);
    
    if (formData.Image) {
      data.append("Image", formData.Image);
    }

    // Debug: Log FormData values
    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post(
        `${backendUrl}user/signup`, 
        data, 
        { 
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true 
        }
      );   

      if (response.status === 201) {
        toast.success("User created successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          DOB: "",
          phoneNumber: "",
          Image: null,
        });
        navigate("/auth/login");
      }
     else {
        toast.error("Error creating user!");
      }
    } catch (error) {
      if(error.response.status === 409){
        toast.error("User already exists!");
      }
      else if(error.response.status === 401){
        toast.error("Phone number already exists!");
      }
      else {
        console.log("Error submitting form:", error);
        toast.error(error.response?.data?.message || "Error submitting form!");
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: "BrownRegular" }}
    >
      <motion.div className="bg-white p-8 rounded shadow-md w-full max-w-md" whileHover={{ scale: 1.02 }}>
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          
          {/* Name Field */}
          <motion.div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div className="mb-4 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              minLength="6"
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <small className="text-gray-500 block mt-1">Minimum 6 characters</small>
          </motion.div>

          {/* Date of Birth Field */}
          <motion.div className="mb-4 relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="date"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </motion.div>

          {/* Phone Number Field */}
          <motion.div className="mb-4 relative">
            <FaPhone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="1234567890"
              required
              pattern="\d{10}"
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
            <small className="text-gray-500 block mt-1">Enter 10 digit phone number</small>
          </motion.div>

          {/* Profile Image Field */}
          <motion.div className="mb-4 relative">
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              type="file"
              name="Image"
              accept="image/*"
              onChange={handleChange}
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-black text-white py-2 rounded transition duration-200"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
