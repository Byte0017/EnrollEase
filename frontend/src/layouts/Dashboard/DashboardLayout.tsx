import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-300 flex flex-col pt-2 pb-4">
    

      <div className="py-4 flex-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 rounded-lg shadow-2xl bg-white"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>

    </div>
  );
};

export default DashboardLayout;
