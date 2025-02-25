import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Home, User, FileText, Menu, X, LogOut, Mail, Info, HelpCircle } from 'lucide-react';

const Navbar = ({ isDashboard, user }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const profileRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileOpen]);

  const NavLogo = () => (
    <Link to="/" className="flex items-center space-x-3 relative z-10">
      <GraduationCap className="h-10 w-10 text-white transition-transform hover:scale-105" />
      <span className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        {isDashboard ? 'College Portal' : 'EnrollEase'}
      </span>
    </Link>
  );

  const NavLink = ({ to, children, isIcon, label }) => (
    <Link
      to={to}
      className={`relative group px-4 py-2.5 rounded-xl transition-all duration-300 ${
        isActive(to)
          ? 'bg-gradient-to-br from-blue-400/90 to-blue-600/90 text-white shadow-lg'
          : 'text-white/80 hover:bg-gray-900/50 hover:shadow-lg'
      } ${isIcon ? 'p-3' : ''}`}
    >
      {isIcon ? (
        <div className="relative">
          {children}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
            {label}
          </span>
        </div>
      ) : (
        children
      )}
    </Link>
  );

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[80%] z-50 bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-2xl transition-transform duration-500 ease-out border border-gray-800 overflow-hidden ${
        isVisible ? 'translate-y-0' : '-translate-y-32'
      }`}>
        <div className="relative max-w-8xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center relative z-10">
            <NavLogo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {isDashboard ? (
                <div className="flex space-x-4">
                  <NavLink to="/home" isIcon label="Home">
                    <Home className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                  <NavLink to="/profile" isIcon label="Profile">
                    <User className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                  <NavLink to="/documents" isIcon label="Documents">
                    <FileText className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <NavLink to="/home" isIcon label="Home">
                    <Home className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                  <NavLink to="/admission-faq" isIcon label="FAQ">
                    <HelpCircle className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                  <NavLink to="/contact" isIcon label="Contact">
                    <Mail className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                  <NavLink to="/about" isIcon label="About">
                    <Info className="h-7 w-7 text-white transition-transform hover:scale-110" />
                  </NavLink>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4" ref={profileRef}>
              {user ? (
                <div className="relative">
                  <button
                    className="text-white p-3 hover:bg-gray-800/50 rounded-xl transition-all duration-300 relative group"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <User className="h-7 w-7 transition-transform hover:scale-110" />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md pointer-events-none">
                      Profile
                    </span>
                  </button>
                  {isProfileOpen && <ProfileMenu />}
                </div>
              ) : (
                <NavLink to="/login">Login</NavLink>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-3 text-white hover:bg-gray-800/50 rounded-xl transition-all duration-300 group relative"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="h-9 w-9 transition-transform hover:rotate-90" />
              ) : (
                <Menu className="h-9 w-9 transition-transform hover:scale-110" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileOpen && (
            <div className="md:hidden mt-4 bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-xl z-50">
              <div className="flex flex-col p-4 space-y-3">
                {isDashboard ? (
                  <>
                    <MobileNavLink to="/home" icon={<Home className="h-6 w-6" />} label="Home" onClick={() => setIsMobileOpen(false)} />
                    <MobileNavLink to="/profile" icon={<User className="h-6 w-6" />} label="Profile" onClick={() => setIsMobileOpen(false)} />
                    <MobileNavLink to="/documents" icon={<FileText className="h-6 w-6" />} label="Documents" onClick={() => setIsMobileOpen(false)} />
                  </>
                ) : (
                  <>
                    <MobileNavLink to="/home" icon={<Home className="h-6 w-6" />} label="Home" onClick={() => setIsMobileOpen(false)} />
                    <MobileNavLink to="/admission-faq" icon={<HelpCircle className="h-6 w-6" />} label="FAQ" onClick={() => setIsMobileOpen(false)} />
                    <MobileNavLink to="/contact" icon={<Mail className="h-6 w-6" />} label="Contact" onClick={() => setIsMobileOpen(false)} />
                    <MobileNavLink to="/about" icon={<Info className="h-6 w-6" />} label="About" onClick={() => setIsMobileOpen(false)} />
                    {!user && <MobileNavLink to="/login" label="Login" onClick={() => setIsMobileOpen(false)} />}
                  </>
                )}
                {user && (
                  <MobileNavLink 
                    to="/logout" 
                    icon={<LogOut className="h-6 w-6 text-red-400" />} 
                    label="Logout" 
                    className="text-red-400/90"
                    onClick={() => setIsMobileOpen(false)}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

const MobileNavLink = ({ to, icon, label, className, onClick }) => {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-white/80 hover:bg-gray-700/50 transition-colors shadow-sm ${
        location.pathname === to ? 'bg-gray-700/50 text-white' : ''
      } ${className || ''}`}
      onClick={onClick}
    >
      {icon && React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
      <span>{label}</span>
    </Link>
  );
};

const ProfileMenu = () => (
  <div className="absolute right-0 top-14 mt-2 bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-800 min-w-[200px] animate-pop-in">
    <div className="p-2">
      <Link
        to="/profile"
        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 text-white/90 transition-colors"
      >
        <User className="h-5 w-5" />
        <span>Profile</span>
      </Link>
      <Link
        to="/logout"
        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 text-red-400/90 transition-colors"
      >
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </Link>
    </div>
  </div>
);

export default Navbar;