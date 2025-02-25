import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Otp from '../../components/Auth/Otp';

const OtpPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (email) {
      toast.success('OTP sent to your email');
    } else {
      toast.error('No email provided. Please log in again.');
    }
  }, [email]);

  return (
    <div>
      <Otp />
    </div>
  );
};

export default OtpPage;