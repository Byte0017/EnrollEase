import { z } from 'zod';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/context/Firebase';

// Zod schema for login form validation
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  userType: z.enum(['student', 'admin']),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Fake login credentials
const FAKE_USER_EMAIL = 'user@gmail.com';
const FAKE_USER_PASSWORD = '00000000';
const FAKE_ADMIN_EMAIL = 'admin@gmail.com';
const FAKE_ADMIN_PASSWORD = '11111111';

/**
 * Unified login function to handle both fake login and Firebase authentication.
 */
export const login = async (
  data: LoginFormData,
  setLoading: (loading: boolean) => void,
  setErrorMessage: (message: string) => void,
  reset: (values?: Partial<LoginFormData>) => void,
  setFocus: (field: keyof LoginFormData) => void,
  onSuccess: (email: string) => void
) => {
  setLoading(true);
  setErrorMessage('');

  try {
    // 1. First check if email exists (fake or Firestore)
    console.log('loginService: Checking email:', data.email);
    
    // Fake credentials check
    const isFakeUser = data.email === FAKE_USER_EMAIL && data.userType === 'student';
    const isFakeAdmin = data.email === FAKE_ADMIN_EMAIL && data.userType === 'admin';
    let isEmailValid = isFakeUser || isFakeAdmin;

    // Firestore check if not fake email
    let userData = null;
    if (!isEmailValid) {
      const userRef = doc(db, 'users', data.email);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        throw new Error('Email not found');
      }
      
      userData = userDoc.data();
      isEmailValid = userData.userType === data.userType;
      if (!isEmailValid) {
        throw new Error('User type mismatch');
      }
    }

    if (!isEmailValid) {
      throw new Error('Email not found');
    }

    // 2. Check password
    console.log('loginService: Email found, checking password');
    
    // Fake password check
    if (isFakeUser) {
      if (data.password !== FAKE_USER_PASSWORD) {
        throw new Error('Password not matched');
      }
    } else if (isFakeAdmin) {
      if (data.password !== FAKE_ADMIN_PASSWORD) {
        throw new Error('Password not matched');
      }
    } else {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, data.email, data.password);
    }

    // Success case
    console.log('loginService: Login successful');
    toast.success('Email and password verified successfully!');
    onSuccess(data.email);

  } catch (error: any) {
    console.error('loginService: Error:', error.message);

    if (error.message === 'Email not found' || error.message === 'User type mismatch') {
      setErrorMessage('Email not found');
      setFocus('email');
      toast.error('Email not found');
      reset({ email: '', password: '', userType: data.userType });
    } else if (error.message === 'Password not matched' || error.code === 'auth/wrong-password') {
      setErrorMessage('Password not matched');
      setFocus('password');
      toast.error('Password not matched');
      reset({ ...data, password: '' });
    } else {
      setErrorMessage('Something went wrong');
      toast.error('Something went wrong');
    }
  } finally {
    setLoading(false);
  }
};

/**
 * Handle user type change and reset form fields.
 */
export const handleUserTypeChange = (
  userType: 'student' | 'admin',
  reset: (values?: Partial<LoginFormData>) => void
) => {
  reset({ email: '', password: '', userType });
};