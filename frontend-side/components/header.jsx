"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get first letter of user name in uppercase
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "";

  return (
    <header className="bg-purple-400 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-2">
        {/* Logo */}
        <div className="shrink-0">
          <img src="/logoo.webp" alt="Logo" className="w-24 h-auto" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          <Link href="/" className="flex flex-col items-center hover:text-gray-200">
            <FaHome className="text-2xl" />
            Home
          </Link>
          <Link href="/boards" className="flex flex-col items-center hover:text-gray-200">
            <RiDashboardFill className="text-2xl" />
            Dashboard
          </Link>
        </nav>

        {/* Auth Buttons + Profile */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {!user ? (
            <>
              <Link href="/login" className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100">
                Login
              </Link>
              <Link href="/register" className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100">
                Signup
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* User Initial Circle */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-white text-purple-500 flex items-center justify-center font-bold cursor-pointer border-2 border-white"
              >
                {userInitial}
              </div>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 bg-white text-black rounded-xl shadow-lg w-52 p-3 z-50">
                  {/* User Info */}
                  <div className="pb-3 mb-3 border-b">
                    <p className="text-sm font-semibold capitalize">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-500 px-4 pb-4 space-y-2">
          <Link href="/" className="block text-white hover:text-gray-200">Home</Link>
          <Link href="/boards" className="block text-white hover:text-gray-200">Dashboard</Link>
          {!user ? (
            <>
              <Link href="/login" className="block bg-white text-purple-500 px-4 py-2 rounded">Login</Link>
              <Link href="/register" className="block bg-white text-purple-500 px-4 py-2 rounded">Signup</Link>
            </>
          ) : (
            <button onClick={logout} className="block bg-white text-purple-500 px-4 py-2 rounded">Logout</button>
          )}
        </div>
      )}
    </header>
  );
}
