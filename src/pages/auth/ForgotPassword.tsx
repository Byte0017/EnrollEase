import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [resetSent, setResetSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call to check if email exists in the system
      const emailExists = await checkEmailExists(data.email);
      
      if (!emailExists) {
        setEmailError('No account found with that email address');
        return;
      }

      // Simulate API call for password reset request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Password reset requested for:', data.email);
      setResetSent(true);
      setEmailError(null); // Clear any previous email errors
    } catch (error) {
      console.error('Password reset failed:', error);
      setEmailError('Something went wrong, please try again later');
    }
  };

  // Mock function to simulate email existence check
  const checkEmailExists = async (email: string) => {
    // Simulate an API call to check if email exists (this should be replaced by an actual API call)
    const mockDatabase = ['user@example.com', 'admin@example.com'];
    return mockDatabase.includes(email);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10"
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
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email to receive reset instructions
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    autoComplete="email"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-sm text-center pt-4 border-t border-gray-100">
                  <span className="text-gray-600">Remember your password? </span>
                  <Link
                    to="/login"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                  >
                    Return to login
                  </Link>
                </div>
              </motion.div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForgotPassword;
