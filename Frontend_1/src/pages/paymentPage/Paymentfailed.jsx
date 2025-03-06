import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/'); // Redirect to homepage or payment page as needed
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-red-200 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center space-y-6"
      >
        <XCircle className="text-red-500 mx-auto" size={80} />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Failed
        </h1>
        <p className="text-lg text-gray-600">
          Oops! Something went wrong during your payment process.
        </p>
        <p className="text-md text-gray-500">
          Please check your details or try again.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRetry}
          className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full text-lg font-semibold shadow-md hover:bg-red-600 transition"
        >
          Try Again
        </motion.button>
        <p className="text-sm text-gray-400 mt-4">
          You will be redirected to the homepage if you prefer.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
