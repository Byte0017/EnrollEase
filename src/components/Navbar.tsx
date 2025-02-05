import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { GraduationCap, Home, User, FileText, Menu, X } from 'lucide-react';

const Navbar = ({ isDashboard }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const NavLogo = () => (
    <Link to="/" className="flex items-center space-x-3">
      <div className="relative">
        <GraduationCap className="h-10 w-10 text-white" />
      </div>
      <span className="text-2xl font-bold text-white">
        {isDashboard ? 'College Portal' : 'EnrollEase'}
      </span>
    </Link>
  );

  const NavLink = ({ to, children, isIcon }) => (
    <Link
      to={to}
      className={`relative group px-4 py-2.5 rounded-xl transition-colors ${
        isActive(to)
          ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white'
          : 'text-white/80 hover:bg-white/10'
      } ${isIcon ? 'p-3' : ''}`}
    >
      {children}
    </Link>
  );

  const MobileMenu = () => (
    <div className="md:hidden absolute top-full left-0 right-0 bg-blue-700">
      <div className="flex flex-col p-4 space-y-3">
        {!isDashboard ? (
          <>
            <MobileNavLink to="/home">Home</MobileNavLink>
            <MobileNavLink to="/login">Registration</MobileNavLink>
            <MobileNavLink to="/admission-faq">Admission FAQ</MobileNavLink>
            <MobileNavLink to="/contact">Contact</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
          </>
        ) : (
          <>
            <MobileNavLink to="/home"><Home className="h-5 w-5 text-white" /></MobileNavLink>
            <MobileNavLink to="/profile"><User className="h-5 w-5 text-white" /></MobileNavLink>
            <MobileNavLink to="/documents"><FileText className="h-5 w-5 text-white" /></MobileNavLink>
          </>
        )}
      </div>
    </div>
  );

  const MobileNavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 rounded-xl ${
        isActive(to)
          ? 'bg-blue-500 text-white'
          : 'text-white/80 hover:bg-white/10'
      }`}
      onClick={() => setIsMobileOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <NavLogo />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {isDashboard ? (
                <div className="flex space-x-4">
                  <NavLink to="/home" isIcon>
                    <Home className="h-6 w-6 text-white" />
                  </NavLink>
                  <NavLink to="/profile" isIcon>
                    <User className="h-6 w-6 text-white" />
                  </NavLink>
                  <NavLink to="/documents" isIcon>
                    <FileText className="h-6 w-6 text-white" />
                  </NavLink>
                </div>
              ) : (
                <div className="flex space-x-6">
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/login">Registration</NavLink>
                  <NavLink to="/admission-faq">Admission FAQ</NavLink>
                  <NavLink to="/contact">Contact</NavLink>
                  <NavLink to="/about">About</NavLink>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileOpen && <MobileMenu />}
        </div>
      </nav>
      {/* Spacer to push content below the fixed navbar */}
      <div className="h-[1.0rem]" />
    </>
  );
};

export default Navbar;