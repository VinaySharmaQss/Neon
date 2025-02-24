import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaPhone, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    DOB: "",
    phoneNumber: "",
    ProfileImg: null,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ProfileImg") {
      setFormData({ ...formData, ProfileImg: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create form data to send to the backend
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("DOB", formData.DOB);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("ProfileImg", formData.ProfileImg);

    // For now, log the data; replace with API call.
    console.log("Submitting form data:", formData);
  };

  // Framer Motion variants for staggered input animations
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{fontFamily: "BrownRegular"}}
    >
      <motion.div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          {/* Name Field */}
          <motion.div
            className="mb-4 relative"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
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
          <motion.div
            className="mb-4 relative"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
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
          <motion.div
            className="mb-4 relative"
            custom={3}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
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
          <motion.div
            className="mb-4 relative"
            custom={4}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
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
          <motion.div
            className="mb-4 relative"
            custom={5}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
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
          <motion.div
            className="mb-4 relative"
            custom={6}
            initial="hidden"
            animate="visible"
            variants={inputVariants}
          >
            <FaImage className="absolute left-3 top-3 text-gray-400" />
            <input
              type="file"
              name="ProfileImg"
              accept="image/*"
              onChange={handleChange}
              required
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
