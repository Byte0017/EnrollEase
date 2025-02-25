import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Smooth scroll to top with a smoother easing function
    const scrollToTop = () => {
      const start = window.pageYOffset;
      const duration = 500; // Increased duration for smoother scroll
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Smoother easing function (easeOutQuint)
        const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

        window.scrollTo(0, start * (1 - easeOutQuint(progress)));

        if (elapsedTime < duration) {
          requestAnimationFrame(animateScroll);
        } else {
          setLoading(false); // Hide spinner after scroll completes
        }
      };

      requestAnimationFrame(animateScroll);
    };

    scrollToTop();
  }, [location]);

  return loading ? (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ) : null;
};

export default ScrollToTop;