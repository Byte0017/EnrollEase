import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">Student Dashboard</h1>
      </header>
      
      {/* Main Content */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Application No:</strong> 123456</p>
          <Link to="/profile" className="text-blue-600 hover:underline mt-2 inline-block">View Profile</Link>
        </div>

        {/* Admission Status */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Admission Status</h2>
          <p className="text-green-600 font-semibold">Accepted</p>
          <Link to="/admission-status" className="text-blue-600 hover:underline mt-2 inline-block">Check Details</Link>
        </div>

        {/* Fee Payment */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Fee Payment</h2>
          <p><strong>Due Amount:</strong> ₹50,000</p>
          <Link to="/fee-payment" className="text-blue-600 hover:underline mt-2 inline-block">Proceed to Payment</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
