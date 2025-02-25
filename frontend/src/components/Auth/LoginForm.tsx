import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../Common/button';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LoginFormData, loginSchema } from '../../services/loginService';

interface LoginFormProps {
  onSuccess: (email: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}

const LoginForm = ({ onSuccess, errorMessage, setErrorMessage }: LoginFormProps) => {
  const { loginUser } = useAuth(); // Use loginUser instead of fakeLoginUser
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    setFocus,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: 'student',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('LoginForm: onSubmit called with:', data);
    setErrorMessage('');
    setLoading(true);

    try {
      await loginUser(
        data,
        setLoading,
        setErrorMessage,
        reset,
        setFocus,
        (email) => {
          console.log('LoginForm: loginUser succeeded, calling onSuccess with:', email);
          onSuccess(email); // Calls handleLoginSuccess
        }
      );
      console.log('LoginForm: Login process completed successfully');
    } catch (error) {
      console.error('LoginForm: Login failed:', error);
      // Error message is set by loginUser; no need to override unless unexpected
    }
  };

  useEffect(() => {
    reset({ email: '', password: '', userType: watch('userType') });
  }, [watch('userType'), reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-medium text-gray-700 mb-3">Login as</label>
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
              <input {...register('userType')} type="radio" value={role} className="hidden" />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <label className="block text-sm font-medium text-gray-700">Email address</label>
        <div className="mt-1">
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          {errorMessage === 'Email not found.' && (
            <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          {errorMessage && errorMessage !== 'Email not found.' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
              {errorMessage === 'Incorrect password.' && (
                <Link
                  to="/resetPassword"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors mt-3 inline-block"
                >
                  Forgot your password? Reset here
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <Button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          {isSubmitting || loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </motion.div>

      {watch('userType') === 'student' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }}>
          <div className="text-sm text-center pt-4 border-t border-gray-100">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Register now
            </Link>
          </div>
        </motion.div>
      )}
    </form>
  );
};

export default LoginForm;