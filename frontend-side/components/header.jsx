"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Header() {
  const { user, logout } = useAuth();

  return (
     <header className="bg-purple-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Left side: Logo / Title */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>

        {/* Center: Navigation */}
        <nav className="flex-1 flex justify-center space-x-6">
          <Link href="/" className="hover:text-gray-200 transition-colors font-medium">
            Home
          </Link>
          <Link href="/boards" className="hover:text-gray-200 transition-colors font-medium">
            Dashboard
          </Link>
        </nav>

        {/* Right side: Auth buttons */}
        <div className="flex-1 flex justify-end space-x-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-white text-purple-500 px-3 py-1 rounded hover:bg-gray-100 transition font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-purple-500 px-3 py-1 rounded hover:bg-gray-100 transition font-medium"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
