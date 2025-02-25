import { FaLock } from 'react-icons/fa';
import { RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Otp = () => {
  const navigate = useNavigate();
  const { otpState } = useAuth();
  const {
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
  } = otpState;

  const getStatusIcon = () => {
    if (success) return <CheckCircle2 className="w-8 h-8 text-green-500" />;
    if (errorMessage && !isOtpVerified) return <XCircle className="w-8 h-8 text-red-500" />;
    if (loading) return <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />;
    return <FaLock className="w-8 h-8 text-blue-600" />;
  };

  // Navigate to dashboard after successful OTP verification
  if (success && isOtpVerified) {
    setTimeout(() => {
      const dashboardPath = userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard';
      navigate(dashboardPath, { replace: true });
      toast.success('Welcome to your dashboard!');
    }, 2000);
  }

  return (
    <div className="max-w-md mx-auto p-2 bg-white rounded-2xl mt-0 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 ease-in-out bg-gradient-to-br from-gray-200 to-gray-200 border-gray-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative space-y-4 p-auto px-6 py-10">
        <div className="text-center space-y-auto pb-4">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-500 ease-out ${
              success ? 'bg-green-50' : errorMessage && !isOtpVerified ? 'bg-red-50' : 'bg-blue-50'
            }`}
          >
            {getStatusIcon()}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {success ? 'Verification Successful' : 'Verify Your Account'}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <p className="text-gray-700 font-semibold bg-gray-200">
              Enter the 6-digit code sent to your email ({email})
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {otpInput.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleOtpKeyDown(e, index)}
              disabled={isLocked || success}
              className={`w-10 h-10 text-center text-xl font-semibold border-2 rounded-lg ${
                errorMessage && !isOtpVerified
                  ? 'border-red-300 bg-red-50 animate-shake text-red-600'
                  : success
                  ? 'border-green-300 bg-green-50 text-green-600'
                  : 'border-gray-300 bg-gray-50 text-gray-900'
              }`}
              placeholder="·"
            />
          ))}
        </div>
        {errorMessage && !isOtpVerified && (
          <div className="flex items-center justify-center gap-2 text-red-500 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <p className="text-sm">{errorMessage}</p>
          </div>
        )}
        <button
          onClick={handleSubmitOtp}
          disabled={loading || success || isLocked}
          className={`w-full h-auto px-6 mx-auto py-3 mt-2 text-white font-medium rounded-xl ${
            isLocked || loading || success
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:scale-98 hover:shadow-lg'
          }`}
        >
          {loading ? (
            <RefreshCw className="w-5 h-5 animate-spin mx-auto" />
          ) : success ? (
            'Verified Successfully!'
          ) : isLocked ? (
            `Try again in ${lockCountdown}s`
          ) : (
            'Verify Now'
          )}
        </button>
        <div className="text-center">
          <p
            onClick={handleResendOtp}
            className={`text-sm font-medium transition-colors duration-200 ${
              isResendDisabled || isLocked
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:text-blue-700 cursor-pointer'
            }`}
          >
            {isResendDisabled ? `Resend code in ${countdown}s` : 'Resend verification code'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;