import { toast } from 'react-toastify';

export const verifyOtp = async (otp: string, email: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(otp === '123456'); // Fake OTP for demo
    }, 1000);
  });
};

export const resendOtp = async (email: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      toast.info('OTP resent successfully!');
      resolve();
    }, 1000);
  });
};