import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarAdmin: React.FC = () => {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isGameNameOpen, setIsGameNameOpen] = useState(false); // State cho dropdown tên game

  const toggleProductDropdown = () => {
    setIsProductOpen(!isProductOpen);
  };

  const toggleGameNameDropdown = () => {
    setIsGameNameOpen(!isGameNameOpen);
  };

  return (
    <div className="h-full p-6 flex flex-col bg-white dark:bg-gray-800">
      <nav className="space-y-3">
          {/* Dashboard */}
          <Link
          to="/"
          className="block px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          Home
        </Link>
        {/* Dashboard */}
        <Link
          to="/admin"
          className="block px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          Dashboard
        </Link>

        {/* Quản lý sản phẩm (Dropdown) */}
        <div>
          <button
            onClick={toggleProductDropdown}
            className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex justify-between items-center transition-colors duration-200"
          >
            Quản lý sản phẩm
            <span className="text-sm">{isProductOpen ? '▲' : '▼'}</span>
          </button>
          {isProductOpen && (
            <div className="pl-6 mt-2 space-y-2">
              <Link
                to="/admin/products"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-600/50 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Danh Sách
              </Link>
              <Link
                to="/admin/products/add"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-600/50 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Thêm mới
              </Link>
            </div>
          )}
        </div>

        {/* Quản lý tên game (Dropdown) */}
        <div>
          <button
            onClick={toggleGameNameDropdown}
            className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex justify-between items-center transition-colors duration-200"
          >
            Quản lý tên game
            <span className="text-sm">{isGameNameOpen ? '▲' : '▼'}</span>
          </button>
          {isGameNameOpen && (
            <div className="pl-6 mt-2 space-y-2">
              <Link
                to="/admin/gamenames"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-600/50 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Danh Sách
              </Link>
              <Link
                to="/admin/gamenames/add"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-600/50 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Thêm mới
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default SidebarAdmin;