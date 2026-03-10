import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UseAdmin from "../UseHook/UseAdmin";
import { FaUserMd, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isAdmin] = UseAdmin();
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsProfileMenuOpen(false);
      })
      .catch((error) => console.log(error));
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/availableCamps", label: "Available Camps" },
    { path: "/joinUs", label: "Join Us" },
  ];

  return (
    <nav className={`sticky z-50 top-0 w-full transition-all duration-300 ${
      isScrolled 
        ? "bg-[#0F766E]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)]" 
        : "bg-[#0F766E]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="relative overflow-hidden rounded-full ring-2 ring-[#F97316]/30 group-hover:ring-[#F97316] transition-all duration-300">
              <img 
                className="w-10 h-10 md:w-14 md:h-14 object-cover transition-transform duration-500 group-hover:scale-110" 
                src={logo} 
                alt="Medical Camp Logo" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm md:text-xl lg:text-2xl text-white leading-tight">
                Medical<span className="text-[#F97316]">Camp</span>
              </span>
              <span className="text-[10px] md:text-xs text-gray-400 hidden sm:block">Care & Support</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-lg font-medium transition-all duration-200 group overflow-hidden ${
                    isActive
                      ? "text-[#F97316]"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                <span className="relative z-10">{link.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#F97316] transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${({ isActive }) => isActive ? 'scale-x-100' : ''}`}></span>
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Dashboard Button */}
                  <Link
                    to={isAdmin ? "/dashboard/addCamp" : "/dashboard/register"}
                    className="relative p-2.5 rounded-xl bg-[#F97316]/10 hover:bg-[#F97316]/20 transition-all duration-200 group"
                    title="Dashboard"
                  >
                    <FaTachometerAlt className="text-[#F97316] text-xl group-hover:scale-110 transition-transform duration-200" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all duration-200 group"
                    title="Logout"
                  >
                    <FaSignOutAlt className="text-red-400 text-xl group-hover:scale-110 transition-transform duration-200 group-hover:rotate-12" />
                  </button>

                  {/* User Profile with Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                      className="flex items-center gap-2 group"
                    >
                      <div className="relative">
                        <img
                          className="w-10 h-10 rounded-full ring-2 ring-[#F97316] object-cover transition-all duration-300 group-hover:ring-4 group-hover:scale-105"
                          src={user?.photoURL || "https://via.placeholder.com/40"}
                          referrerPolicy="no-referrer"
                          alt={user?.displayName}
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-[#0F766E]"></span>
                      </div>
                      <div className="text-left hidden lg:block">
                        <p className="text-xs text-gray-400">Welcome back,</p>
                        <p className="text-sm font-semibold text-white max-w-[120px] truncate">
                          {user?.displayName || "User"}
                        </p>
                      </div>
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden animate-[slideDown_0.2s_ease-out]">
                        <div className="p-4 bg-gradient-to-r from-[#0F766E]/20 to-[#F97316]/20 border-b border-gray-700">
                          <p className="text-white font-semibold">{user?.displayName || "User"}</p>
                          <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to={isAdmin ? "/dashboard/addCamp" : "/dashboard/register"}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FaTachometerAlt className="text-[#F97316]" />
                            <span>Dashboard</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
                          >
                            <FaSignOutAlt className="text-red-400" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                >
                  {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium text-white bg-[#0F766E] rounded-xl hover:bg-[#115E59] hover:shadow-lg hover:shadow-[#0F766E]/30 hover:scale-105 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  className="px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium text-white bg-transparent border-2 border-[#0F766E] rounded-xl hover:bg-[#0F766E] hover:text-white hover:scale-105 transition-all duration-200"
                >
                  Register
                </Link>
                
                {/* Mobile Menu Button for non-logged in users */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200"
                >
                  {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#0F766E] to-[#F97316] text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Mobile User Info (if logged in) */}
            {user && (
              <>
                <div className="px-4 py-3 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-[#F97316]"
                      src={user?.photoURL || "https://via.placeholder.com/40"}
                      alt=""
                    />
                    <div>
                      <p className="text-white font-medium">{user?.displayName}</p>
                      <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <Link
                  to={isAdmin ? "/dashboard/addCamp" : "/dashboard/register"}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                >
                  <FaTachometerAlt className="text-[#F97316]" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-200"
                >
                  <FaSignOutAlt className="text-red-400" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add keyframe animation inline */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;