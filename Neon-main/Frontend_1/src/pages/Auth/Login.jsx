import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { backendUrl } from "../../utils/utils";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginReducer } from "../../redux/features/user";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch user data by ID
  const getUserDataById = async (userId) => {
    try {
      const response = await axios.get(`${backendUrl}user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error("Get user data error:", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching user data.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}user/login`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Login successful!");
        const userId = response.data.data.userId;

        // ✅ Fetch and store user data
        const userData = await getUserDataById(userId);
        if (userData) {
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("isSignup", "true");

          // ✅ Update Redux store
          dispatch(loginReducer(userData));

          setFormData({ email: "", password: "" });
          navigate(`/`);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
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
      <motion.div
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        whileHover={{ scale: 1.02 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} noValidate>
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
              className="pl-10 w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-black"
            />
          </motion.div>

          {/* Password Field */}
          <motion.div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              minLength="6"
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
            Login
          </motion.button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
