import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../../components/Auth/LoginForm';



const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = (email: string) => {
    console.log('Login.tsx: handleLoginSuccess called with email:', email);
    console.log("navigating to otpPage");
    navigate('/otpPage', { state: { email }, replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto p-6 bg-white rounded-xl mt-0 shadow-lg hover:shadow-xl hover:scale-[1.10] transition-all duration-500 ease-in-out bg-gradient-to-br from-gray-200 to-gray-200 border-gray-100"
    >
      <h1 className="text-2xl font-bold text-center mb-5 mt-0">Welcome Back!</h1>
      <LoginForm
        onSuccess={handleLoginSuccess} // Pass handleLoginSuccess as onSuccess prop
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </motion.div>
  );
};

export default Login;