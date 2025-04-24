import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderAdminProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout: () => void;
  user: any; // Thông tin user từ backend
}

const HeaderAdmin: React.FC<HeaderAdminProps> = ({ darkMode, setDarkMode, onLogout, user }) => {
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Quản trị hệ thống</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 dark:text-gray-300">
          Xin chào, {user?.name || "Admin"}
        </span>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title={darkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
        >
          {darkMode ? <FaSun size={20} className="text-yellow-400" /> : <FaMoon size={20} className="text-gray-600" />}
        </button>
        <button
          onClick={onLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default HeaderAdmin;