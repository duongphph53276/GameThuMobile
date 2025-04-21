import React, { useState } from 'react';
import { FaMoon, FaSun, FaShoppingCart  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface HeaderClientProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  user: any;
}

const HeaderClient: React.FC<HeaderClientProps> = ({ darkMode, setDarkMode, onLogout, isLoggedIn, user }) => {
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <a href="/">
        <img src="uploads/logo2.png" alt="Logo" className=" h-14 w-auto object-contain" />
      </a>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Thông tin người dùng
                </Link>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Đăng ký
            </Link>
          </>
        )}
        <Link
          to="/cart"
          className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title="Giỏ hàng"
        >
          <FaShoppingCart size={20} className="text-gray-800 dark:text-white" />
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title={darkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
        >
          {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-600" />}
        </button>
      </div>
    </header>
  );
};

export default HeaderClient;