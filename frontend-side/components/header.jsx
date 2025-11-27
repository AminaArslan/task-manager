"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { FaHome } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="bg-purple-400 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-2">
        {/* Logo */}
        <div className="shrink-0">
          <img src="/logoo.webp" alt="Task Manager Logo" className="w-25 h-auto" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          <Link href="/" className="text-white hover:text-gray-200 font-medium transition-colors flex flex-col items-center">
            <FaHome className="text-2xl" />
            Home
          </Link>
          <Link href="/boards" className="text-white hover:text-gray-200 font-medium transition-colors flex flex-col items-center">
          <RiDashboardFill className="text-2xl" />
          
            Dashboard
          </Link>
        </nav>

        {/* Auth buttons desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100 transition font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-500 px-4 pb-4 space-y-2">
          <Link href="/" className="block text-white font-medium hover:text-gray-200">
            Home
          </Link>
          <Link href="/boards" className="block text-white font-medium hover:text-gray-200">
          
            Dashboard
          </Link>
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-white text-purple-500 px-4 py-2 mr-6 rounded hover:bg-gray-100 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100 transition font-medium"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-white text-purple-500 px-4 py-2 rounded hover:bg-gray-100 transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
