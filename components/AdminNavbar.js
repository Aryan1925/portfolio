"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiLogIn, 
  FiUserPlus, 
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiMenu
} from "react-icons/fi";
import { MdSpaceDashboard } from "react-icons/md";

export default function AdminNavbar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initialize state directly from localStorage (no useEffect!)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      return !!token;
    }
    return false;
  });
  
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("adminUser");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/admin/login";
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LEFT SIDE - Dashboard Link & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button - to toggle sidebar on mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <FiMenu className="w-5 h-5 text-gray-300" />
              </button>

              {/* Dashboard Link */}
              <Link
                href="/admin/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-300
                  ${isActive("/admin/dashboard") 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-500/30' 
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <MdSpaceDashboard className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            </div>

            {/* RIGHT SIDE - Register / Login / User Menu */}
            <div className="flex items-center gap-3">
              {!isLoggedIn ? (
                // Not Logged In - Show Register & Login buttons
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/register"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${isActive("/admin/register")
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-500/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <FiUserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Link>

                  <Link
                    href="/admin/login"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-300
                      ${isActive("/admin/login")
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 border border-purple-500/30'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105 shadow-lg shadow-purple-500/25'
                      }`}
                  >
                    <FiLogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </div>
              ) : (
                // Logged In - Show User Menu
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 
                             border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 
                                  flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-white">
                        {user?.name || "Admin"}
                      </p>
                      <p className="text-xs text-gray-400">Administrator</p>
                    </div>
                    <FiChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 
                      ${userMenuOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-lg 
                               border border-white/10 rounded-xl shadow-xl overflow-hidden z-20"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white">{user?.name || "Admin User"}</p>
                        <p className="text-xs text-gray-400">{user?.email || "admin@example.com"}</p>
                      </div>
                      
                      <div className="p-2">
                        <Link
                          href="/admin/dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 
                                   hover:bg-white/10 transition-all duration-300"
                        >
                          <MdSpaceDashboard className="w-4 h-4" />
                          Dashboard
                        </Link>
                      </div>
                      
                      <div className="p-2 border-t border-white/10">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 
                                   hover:bg-red-500/10 transition-all duration-300"
                        >
                          <FiLogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="flex items-center justify-around py-2">
          <Link
            href="/admin/dashboard"
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium
              transition-all duration-300
              ${isActive("/admin/dashboard") 
                ? 'text-purple-400' 
                : 'text-gray-400 hover:text-white'
              }`}
          >
            <MdSpaceDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          {!isLoggedIn ? (
            <>
              <Link
                href="/admin/register"
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium
                  transition-all duration-300
                  ${isActive("/admin/register") 
                    ? 'text-purple-400' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <FiUserPlus className="w-5 h-5" />
                <span>Register</span>
              </Link>
              
              <Link
                href="/admin/login"
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium
                  transition-all duration-300
                  ${isActive("/admin/login") 
                    ? 'text-purple-400' 
                    : 'text-gray-400 hover:text-white'
                  }`}
              >
                <FiLogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-xs font-medium text-red-400"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Add padding-bottom on mobile to prevent content hiding behind bottom nav */}
      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: 60px;
          }
        }
      `}</style>
    </>
  );
}