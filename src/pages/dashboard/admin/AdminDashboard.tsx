import { motion } from 'framer-motion';
import { Users, FileText, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  // Mock statistics - these would come from your backend
  const stats = [
    {
      name: 'Total Applications',
      stat: '24',
      icon: FileText,
      change: '12%',
      changeType: 'increase',
    },
    {
      name: 'Pending Review',
      stat: '8',
      icon: Users,
      change: '2%',
      changeType: 'decrease',
    },
    {
      name: 'Approved',
      stat: '12',
      icon: CheckCircle,
      change: '4%',
      changeType: 'increase',
    },
    {
      name: 'Rejected',
      stat: '4',
      icon: XCircle,
      change: '1%',
      changeType: 'increase',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Admin Dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Overview of admission applications and statistics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    {item.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.stat}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        item.changeType === 'increase'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {item.changeType === 'increase' ? '↑' : '↓'} {item.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Applications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="overflow-hidden bg-white shadow sm:rounded-lg"
      >
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Applications
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="bg-gray-50 px-4 py-3 text-sm text-gray-500">
            No applications to review at the moment.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;