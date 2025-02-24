import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create request payload
    // const payload = {
    //   email: formData.email,
    //   password: formData.password,
    // };

    // try {
    //   // Replace with your login API endpoint
    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Login failed");
    //   }

    //   const data = await response.json();
    //   console.log("Logged in successfully:", data);
    //   // TODO: Handle success (e.g., save tokens, redirect user, etc.)
    // } catch (error) {
    //   console.error("Error logging in:", error);
    //   // TODO: Display an error message to the user
    // }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{fontFamily:"BrownRegular"}}
    >
      <motion.div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} noValidate>
          {/* Email Field */}
          <motion.div
            className="mb-4 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-black"
            />
          </motion.div>
          {/* Password Field */}
          <motion.div
            className="mb-6 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength="6"
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black   "
            />
          </motion.div>
          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-black text-white py-2 rounded transition duration-200"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Login;
