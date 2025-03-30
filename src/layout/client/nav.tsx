import React from 'react';
import { Link } from 'react-router-dom';

const NavClient: React.FC = () => {
  return (
    <nav className="bg-gray-200 dark:bg-gray-700 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Trang chủ
          </Link>
        </li>
        {/* Thêm các link khác sau này nếu cần */}
      </ul>
    </nav>
  );
};

export default NavClient;