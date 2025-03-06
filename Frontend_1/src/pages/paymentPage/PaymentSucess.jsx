import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { backendUrl } from '../../utils/utils';


const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const confirmPayment = async () => {
      if (!sessionId) {
        toast.error('No session ID found');
        return;
      }

      try {
        const response = await axios.get(
          `${backendUrl}payments/confirm-payment?session_id=${sessionId}`,
          { withCredentials: true }
        );
        toast.success(response.data.message || 'Payment confirmed!');
      } catch (error) {
        console.error('Error confirming payment:', error);
        toast.error(
          error.response?.data?.error || 'Error confirming payment'
        );
      }
    };

    confirmPayment();

    const timeout = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate, sessionId]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-cyan-200 p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center space-y-6"
      >
        <CheckCircle className="text-green-500 mx-auto" size={80} />
        <h1 className="text-3xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600">
          Thank you for your booking. Your payment has been processed
          successfully.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoHome}
          className="mt-4 px-6 py-3 bg-green-500 text-white rounded-full text-lg font-semibold shadow-md hover:bg-green-600 transition"
        >
          Go to Home
        </motion.button>
        <p className="text-sm text-gray-400 mt-4">
          You will be redirected to the homepage automatically.
        </p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
