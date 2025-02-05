import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16 pb-16">
      {/* Fixed Navbar */}
      <Navbar isDashboard={true} />

      <div className="py-6 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
