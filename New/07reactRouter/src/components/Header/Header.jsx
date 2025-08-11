import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex items-center justify-between">
        
        {/* Logo / Brand */}
        <NavLink
          to="/"
          className="text-xl font-bold hover:text-yellow-400 transition"
        >
          MyStore
        </NavLink>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-md mx-auto block rounded px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/bulkorder"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            Bulk Order
          </NavLink>
          <NavLink
            to="/payment"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            Payment
          </NavLink>

          <NavLink
            to="/github"
            className={({ isActive }) =>
              isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
            }
          >
            Github
          </NavLink>

          <NavLink
            to="/login"
            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
