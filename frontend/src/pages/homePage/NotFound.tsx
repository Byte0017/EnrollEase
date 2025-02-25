import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/Common/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-max"
      >
        <main className="sm:flex">
          <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-8 sm:border-l sm:border-transparent sm:pl-6">
              <Button asChild>
                <Link to="/">Go back home</Link>
              </Button>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default NotFound;