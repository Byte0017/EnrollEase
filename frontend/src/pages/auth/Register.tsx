import { motion } from 'framer-motion';
import RegisterForm from '../../components/Auth/RegisterForm';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg 
      hover:shadow-2xl hover:scale-[1.05] transition-all duration-700 ease-in-out
      bg-gradient-to-br from-gray-200 to-gray-200 border-gray-100"
    >
      <h1 className="text-2xl font-bold text-center mb-5 mt-0">Register Here...</h1>
      <RegisterForm onSuccess={handleRegisterSuccess} />
    </motion.div>
  );
};

export default Register;