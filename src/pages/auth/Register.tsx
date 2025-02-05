import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

// Zod schema for form validation
const registerSchema = z.object({
  jeeMainsNumber: z
    .string()
    .min(12, 'JEE Mains number must be at least 12 characters')
    .max(12, 'JEE Mains number must be exactly 12 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rePassword: z.string().min(8, 'Re-entered password must be at least 8 characters'),
}).refine(data => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ['rePassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log(data);
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* JEE Mains Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            JEE Mains Application Number
          </label>
          <div className="mt-1">
            <input
              {...register('jeeMainsNumber')}
              type="text"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Enter JEE Mains number"
            />
            {errors.jeeMainsNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.jeeMainsNumber.message}</p>
            )}
          </div>
        </motion.div>

        {/* Full Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <div className="mt-1">
            <input
              {...register('name')}
              type="text"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            Email address
          </label>
          <div className="mt-1">
            <input
              {...register('email')}
              type="email"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </motion.div>

        {/* Phone Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            Phone Number
          </label>
          <div className="mt-1">
            <input
              {...register('phone')}
              type="tel"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <div className="mt-1">
            <input
              {...register('password')}
              type="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Create password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
        </motion.div>

        {/* Re-enter Password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <label className="block text-sm font-medium text-gray-600">
            Re-enter Password
          </label>
          <div className="mt-1">
            <input
              {...register('rePassword')}
              type="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white placeholder-gray-400 transition-all duration-150"
              placeholder="Confirm password"
            />
            {errors.rePassword && (
              <p className="mt-1 text-sm text-red-600">{errors.rePassword.message}</p>
            )}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </motion.div>

        {/* Link to Login page */}
        <div className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-150"
          >
            Sign in
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default Register;