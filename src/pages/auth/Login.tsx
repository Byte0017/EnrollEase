import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['student', 'admin']),
  otp: z.string().optional(), // Optional OTP field (appears after submitting email and password)
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [otpSent, setOtpSent] = useState(true); // State to check if OTP has been sent
  const [otpVerified, setOtpVerified] = useState(false); // State to check if OTP is verified
  const [errorMessage, setErrorMessage] = useState(''); // Error message for failed login or OTP verification

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'student',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (!otpSent) {
        // Simulate API call for login validation (before OTP)
        const user = await fakeLoginApi(data.email, data.password, data.userType); // Simulate API call for login validation

        if (user) {
          // Send OTP after valid email and password check
          sendOtp(data.email); // Simulate OTP sending
          setOtpSent(true); // Mark OTP as sent
        } else {
          setErrorMessage('Invalid credentials. Please check your email and password.');
        }
      } else if (!otpVerified) {
        // Simulate OTP verification process
        const otpValid = await verifyOtp(data.otp); // Simulate OTP verification

        if (otpValid) {
          // Proceed to the dashboard based on the user type after OTP verification
          if (data.userType === 'student') {
            navigate('/student-dashboard'); // Navigate to Student Dashboard
          } else if (data.userType === 'admin') {
            navigate('/admin-dashboard'); // Navigate to Admin Dashboard
          }
        } else {
          setErrorMessage('Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  const fakeLoginApi = async (email: string, password: string, userType: string) => {
    // Simulate successful login for now
    if (email === 'test@example.com' && password === 'password123') {
      return { email, userType };
    }
    return null; // Return null if no valid user found
  };

  const sendOtp = (email: string) => {
    console.log(`OTP sent to: ${email}`);
    // Here, you would trigger an API call to send OTP to the user's email.
  };

  const verifyOtp = async (otp: string) => {
    // Simulate OTP verification logic (replace with your real verification logic)
    return otp === '123456'; // Hardcoded OTP for now
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg mt-10"
    >
      <h1 className="text-2xl font-bold text-center mb-8">Welcome Back!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* User Type Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Login as
          </label>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {['student', 'admin'].map((role) => (
              <label
                key={role}
                className={`flex-1 text-center py-2 px-4 rounded-md transition-all cursor-pointer ${
                  watch('userType') === role
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                }`}
              >
                <input
                  {...register('userType')}
                  type="radio"
                  value={role}
                  className="hidden"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
        </motion.div>

        {/* Email Field */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </motion.div>

        {/* Password Field */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* OTP Field (only shows after email & password are valid) */}
        {otpSent && !otpVerified && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="mt-1">
              <input
                {...register('otp')}
                type="text"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
                placeholder="Enter OTP sent to your email"
              />
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            {isSubmitting || otpSent ? 'Signing in...' : 'Sign in'}
          </Button>
        </motion.div>

        {/* Error Message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-sm text-red-600 text-center"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Registration Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-sm text-center pt-4 border-t border-gray-100">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Register now
            </Link>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default Login;
