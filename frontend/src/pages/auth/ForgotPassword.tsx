

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ForgotPasswordForm from '@/components/Auth/ForgotPasswordForm';

const ForgotPassword = () => {
  const [resetSent, setResetSent] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-1 hover:shadow-2xl hover:scale-[1.05] 
      transition-all duration-700 ease-in-out bg-gradient-to-br from-gray-200 to-gray-200 border-gray-100"
    >
      <AnimatePresence mode="wait">
        {resetSent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <div className="mb-6 relative">
              <motion.div
                className="w-16 h-16 bg-green-50 rounded-full mx-auto mb-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150 }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <div className="absolute inset-0 bg-green-100/50 blur-[60px] -z-10" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Reset Link Sent!
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to your email. Please check
              your inbox and follow the link to reset your password.
            </p>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the email?{' '}
                <button
                  onClick={() => setResetSent(false)}
                  className="text-white ml-2 font-medium transition-transform duration-200 hover:scale-95"
                >
                  Resend link
                </button>
              </p>

              <Button
                asChild
                className="w-full bg-blue-600 text-white hover:bg-blue-800 transition-colors duration-300"
              >
                <Link to="/login" className="font-medium text-white">
                  Return to Login
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <ForgotPasswordForm setResetSent={setResetSent} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPassword;