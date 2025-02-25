import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/homePage/Home';
import NotFound from './pages/homePage/NotFound';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/Dashboard/DashboardLayout';
import ScrollToTop from './layouts/ScrollToTop';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import OtpPage from './pages/auth/OtpPage';
import AdmissionFAQ from './pages/homePage/AdmissionFAQ';
import Contact from './pages/homePage/Contact';
import AboutPage from './pages/homePage/AboutPage';
import AdminDashboard from './components/Dashboard/admin/AdminDashboard';
import StudentDashboard from './components/Dashboard/student/StudentDashboard';
import ApplicationForm from './components/Dashboard/student/form/ApplicationForm';
import Profile from './components/Dashboard/student/profile/Profile';
import Payment from './components/Dashboard/student/payment/Payment';
import Notification from './components/Dashboard/student/Notification';
import Logout from './components/Dashboard/student/profile/Logout';
import ProtectedRoute from './ProtectedRoute';
// Note: AuthProvider is already provided in main.tsx, so no need to import it here

function App() {
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/resetPassword" element={<ForgotPassword />} />
              <Route path="/otpPage" element={<OtpPage />} />
            </Route>
          </Route>

          <Route element={<DashboardLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedRoute allowedRoles={['student']} />}>
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/application" element={<ApplicationForm />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/notification" element={<Notification />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={['student', 'admin']} />}>
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>
          </Route>

          <Route path="/home" element={<Home />} />
          <Route path="/admission-faq" element={<AdmissionFAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
      <ToastContainer />
    </>
  );
}

export default App;