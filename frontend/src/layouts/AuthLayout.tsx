import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-300 flex flex-col pt-20 sm:pt-8 transition-all duration-300">
      <Navbar />

      <div className="flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-16 flex-1 transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="sm:mx-auto sm:w-full sm:max-w-md transition-all duration-300"
        >
          <div className="flex justify-center">
            <GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 transition-all duration-300" />
          </div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900 transition-all duration-300">
            EnrollEase Admission Portal
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 sm:mt-8 mx-auto w-full max-w-md transition-all duration-300"
        >
          <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 shadow-lg sm:shadow-2xl rounded-lg sm:rounded-lg transition-all duration-300">
            <Outlet />
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthLayout;