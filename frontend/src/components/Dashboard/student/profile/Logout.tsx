import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate logout process
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Logging out...</p>
    </div>
  );
};

export default Logout;