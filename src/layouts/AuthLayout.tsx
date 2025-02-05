import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-16 pb-16">
      {/* Fixed Navbar */}
      <Navbar isDashboard={false} />
      
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            EnrollEase Admission Portal
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Outlet />
          </div>
        </motion.div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default AuthLayout;
