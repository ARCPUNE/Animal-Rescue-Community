import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logOut } from "../../Features/userSlice";
import { FaBars, FaTimes } from "react-icons/fa";
import { clearTokens } from "../../Features/authSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(selectUser); // Access user state from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut()); // Dispatch the logout action
    dispatch(clearTokens());
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative w-full border-b border-gray-400">
      <nav className="flex flex-wrap items-center justify-between px-4 py-4 mx-auto max-w-screen-xl lg:px-6">
        <Link to="/" className="flex items-center">
          <img
            src="./HeaderImages/arc_logo.png"
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-4 border-yellow-50 rounded-full"
            alt="Logo"
          />
          <span className="ml-2 text-xl sm:text-2xl lg:text-3xl font-serif font-bold hidden sm:block">
            Animal Rescue Community
          </span>
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:flex lg:flex-row lg:space-x-8 lg:mt-0 lg:order-1 w-full lg:w-auto`}
        >
          <ul className="flex flex-col font-medium lg:flex-row lg:space-x-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                }
                onClick={toggleMobileMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                }
                onClick={toggleMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                }
                onClick={toggleMobileMenu}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/donate"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                }
                onClick={toggleMobileMenu}
              >
                Donate
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/post"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 lg:p-0 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                }
                onClick={toggleMobileMenu}
              >
                Post
              </NavLink>
            </li>
            {user.role === 'ROLE_Admin' && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 lg:p-0 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } hover:text-orange-700 hover:bg-gray-50 lg:hover:bg-transparent border-b lg:border-0 border-gray-100`
                  }
                  onClick={toggleMobileMenu}
                >
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center space-x-4 lg:order-2">
          {user.id ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-800 text-sm sm:text-base">Welcome, {user.name}</span>
              <Link
                to="/profile"
                className="px-3 py-1 text-xs sm:text-sm lg:text-base font-medium text-gray-800 duration-200 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs sm:text-sm lg:text-base font-medium text-white duration-200 bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 text-xs sm:text-sm lg:text-base font-medium text-gray-800 duration-200 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={toggleMobileMenu}
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-3 py-1 text-xs sm:text-sm lg:text-base font-medium text-white duration-200 bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
                onClick={toggleMobileMenu}
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
