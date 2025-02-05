import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword'; 
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import ApplicationForm from './pages/dashboard/student/ApplicationForm';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AdmissionFAQ from './pages/AdmissionFAQ';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Root Route - Redirect to Home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Auth Routes (Login, Register, Forgot Password) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/application-form" element={<ApplicationForm />} />
          </Route>

          {/* General Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/admission-faq" element={<AdmissionFAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Catch All for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </Router>
  );
}

export default App;
