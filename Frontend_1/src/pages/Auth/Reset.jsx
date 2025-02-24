import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  // Handle email input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email };

    // try {
    //   // Replace '/api/reset-password' with your actual endpoint
    //   const response = await fetch("/api/reset-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to send reset password link.");
    //   }

    //   const data = await response.json();
    //   console.log("Reset link sent:", data);
    //   // You can display a success message to the user here.
    // } catch (error) {
    //   console.error("Error resetting password:", error);
    //   // You can display an error message to the user here.
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
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
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
              value={email}
              onChange={handleChange}
              placeholder="your-email@example.com"
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
            Send Reset Link
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;
