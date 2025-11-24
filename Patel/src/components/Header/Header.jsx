import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onMenuToggle }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const adminLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") setIsAdmin(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // MENU TOGGLE
  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    if (onMenuToggle) onMenuToggle(newState);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("adminLoggedIn");

    window.location.reload();
  };

  // NAV LINKS
  const navLinks = [
    { to: "/", text: "Home", icon: "🏠" },
    { to: "/about", text: "About", icon: "ℹ️" },
    { to: "/contact", text: "Contact", icon: "✉️" },
    { to: "/bulkorder", text: "Bulk Order", icon: "📦" },
    { to: "/product", text: "Products", icon: "🛒" },

    ...(isAdmin
      ? [{ to: "/admin", text: "Admin Panel", icon: "⚙️", isAdmin: true }]
      : []),

    ...(isLoggedIn
      ? [
          {
            to: "/dashboard",
            text: "Dashboard",
            isButton: true,
            color: "bg-purple-600 hover:bg-purple-700 text-white",
          },
          {
            text: "Logout",
            isLogout: true,
            isButton: true,
            color: "bg-red-600 hover:bg-red-700 text-white",
          },
        ]
      : [
          {
            to: "/login",
            text: "Login",
            isButton: true,
            color: "bg-blue-600 hover:bg-blue-700 text-white",
          },
          {
            to: "/signup",
            text: "Sign Up",
            isButton: true,
            color: "bg-green-600 hover:bg-green-700 text-white",
          },
        ]),
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all ${
          isScrolled ? "bg-gray-900 shadow-xl" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <NavLink to="/" className="text-2xl font-bold text-yellow-400">
              🛒 TrazooProducts
            </NavLink>

            {/* Menu Button */}
            <button
              className={`p-2 rounded-md transition-all ${
                isMenuOpen ? "bg-gray-700 rotate-90" : "hover:bg-gray-700"
              }`}
              onClick={toggleMenu}
            >
              <div className="w-8 flex flex-col space-y-2">
                <span
                  className={`h-1 w-full bg-yellow-400 transition-all ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-full bg-yellow-400 transition-all ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-full bg-yellow-400 transition-all ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Dropdown Menu */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-screen py-3" : "max-h-0"
            }`}
          >
            <div className="flex flex-col space-y-3 pb-4">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (link.isLogout) {
                      handleLogout();
                    } else if (link.to) {
                      navigate(link.to);
                    }
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center px-4 py-3 rounded-lg text-lg transition-all 
                    ${
                      link.isButton
                        ? `${link.color} font-medium justify-center`
                        : "text-gray-200 hover:bg-gray-700"
                    }
                  `}
                >
                  {link.icon && <span className="mr-3 text-xl">{link.icon}</span>}
                  {link.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
