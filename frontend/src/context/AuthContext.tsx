import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginFormData, login } from '../services/loginService';
import { verifyOtp, resendOtp } from '../services/otpService';
import { RegisterFormData, register } from '../services/registerService';
import { checkEmailExists, requestPasswordReset } from '../services/resetPasswordService';

interface AuthContextType {
  userRole: 'student' | 'admin' | null;
  isAuthenticated: boolean;
  loginUser: (
    data: LoginFormData,
    setLoading: (loading: boolean) => void,
    setErrorMessage: (message: string) => void,
    reset: (values?: Partial<LoginFormData>) => void,
    setFocus: (field: keyof LoginFormData) => void,
    onSuccess: (email: string) => void
  ) => Promise<void>;
  registerUser: (data: RegisterFormData, setValue: any, onSuccess: () => void) => Promise<void>;
  checkEmail: (email: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  otpState: {
    otpInput: string[];
    errorMessage: string | null;
    countdown: number;
    isResendDisabled: boolean;
    loading: boolean;
    success: boolean;
    isLocked: boolean;
    lockCountdown: number;
    isOtpVerified: boolean;
    email: string;
    userRole: 'student' | 'admin' | null;
    handleOtpChange: (index: number, value: string) => void;
    handleOtpKeyDown: (e: React.KeyboardEvent, index: number) => void;
    handleSubmitOtp: () => Promise<void>;
    handleResendOtp: () => void;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [otpInput, setOtpInput] = useState<string[]>(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(3);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockCountdown, setLockCountdown] = useState<number>(0);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const loginUser = async (
    data: LoginFormData,
    setLoading: (loading: boolean) => void,
    setErrorMessage: (message: string) => void,
    reset: (values?: Partial<LoginFormData>) => void,
    setFocus: (field: keyof LoginFormData) => void,
    onSuccess: (email: string) => void
  ): Promise<void> => {
    console.log('AuthContext: loginUser called with:', data);
    await login(
      data,
      setLoading,
      setErrorMessage,
      reset,
      setFocus,
      (email) => {
        setEmail(email);
        setUserRole(data.userType);
        console.log('AuthContext: loginUser succeeded, calling onSuccess with:', email);
        onSuccess(email);
      }
    );
  };

  const registerUser = async (
    data: RegisterFormData,
    setValue: any,
    onSuccess: () => void
  ): Promise<void> => {
    await register(data, setValue, onSuccess);
  };

  const checkEmail = (email: string) => checkEmailExists(email);
  const resetPassword = (email: string) => requestPasswordReset(email);

  const handleOtpChange = (index: number, value: string) => {
    if (isLocked || !/^\d*$/.test(value)) return;
    const newOtpInput = [...otpInput];
    newOtpInput[index] = value;
    setOtpInput(newOtpInput);
    setIsOtpVerified(false);

    if (value && index === otpInput.length - 1 && newOtpInput.every((digit) => digit !== '')) {
      setTimeout(() => handleSubmitOtp(), 300);
    } else if (value && index < otpInput.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (isLocked || (e.key === 'Backspace' && !otpInput[index] && index > 0)) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmitOtp = async () => {
    setIsOtpVerified(false);
    setErrorMessage(null);
    if (isLocked) return;

    const otp = otpInput.join('');
    if (otp.length !== 6) {
      setErrorMessage('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    try {
      const otpValid = await verifyOtp(otp, email);
      if (otpValid) {
        setSuccess(true);
        setIsOtpVerified(true);
        setIsAuthenticated(true);
        setAttempts(3);
        const redirectTo = userRole === 'student' ? '/student-dashboard' : '/admin-dashboard';
        console.log('AuthContext: OTP verified, navigating to:', redirectTo);
        navigate(redirectTo, { replace: true });
      } else {
        const newAttempts = attempts - 1;
        setAttempts(newAttempts);
        if (newAttempts === 0) {
          setIsLocked(true);
          setLockCountdown(60);
          setErrorMessage('Too many attempts. Please try again in 60 seconds.');
        } else {
          setErrorMessage(`Invalid OTP. ${newAttempts} attempts remaining.`);
          toast.error('Invalid OTP. Please try again!');
        }
        setOtpInput(Array(6).fill(''));
      }
    } catch (error) {
      console.error('AuthContext: OTP verification failed:', error);
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = useCallback(() => {
    if (isResendDisabled || isLocked) return;

    setOtpInput(Array(6).fill(''));
    setErrorMessage(null);
    resendOtp(email);
    setIsResendDisabled(true);
    setCountdown(30);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isResendDisabled, isLocked, email]);

  useEffect(() => {
    if (isLocked && lockCountdown > 0) {
      const interval = setInterval(() => {
        setLockCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockCountdown]);

  const value = {
    userRole,
    isAuthenticated,
    loginUser,
    registerUser,
    checkEmail,
    resetPassword,
    otpState: {
      otpInput,
      errorMessage,
      countdown,
      isResendDisabled,
      loading,
      success,
      isLocked,
      lockCountdown,
      isOtpVerified,
      email,
      userRole,
      handleOtpChange,
      handleOtpKeyDown,
      handleSubmitOtp,
      handleResendOtp,
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};