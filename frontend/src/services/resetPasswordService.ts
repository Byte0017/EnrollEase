import { toast } from 'react-toastify';

const fakeEmails = ['test@example.com', 'user123@example.com', 'demo@example.com'];

export const checkEmailExists = async (email: string): Promise<boolean> => {
  email = email.toLowerCase();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeEmails.includes(email));
    }, 1000);
  });
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.1) {
        reject(new Error('Failed to send reset link'));
      } else {
        console.log(`Reset link sent to ${email}`);
        toast.success('Reset link sent successfully!');
        resolve();
      }
    }, 1500);
  });
};