// NO ACTIVE


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../components/auth/axiosConfig';

const NavClient: React.FC = () => {
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
  const [gameNames, setGameNames] = useState<{ name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mở dropdown khi hover
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsGameDropdownOpen(true);
  };

  // Đóng dropdown khi rời chuột, với độ trễ
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
        setIsGameDropdownOpen(false);
      }
    }, 200);
  };

  // Lấy danh sách GameName từ API
  useEffect(() => {
    const fetchGameNames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/gamenames');
        console.log('Response từ /gamenames:', response.data);
        if (response.data.status) {
          setGameNames(response.data.data);
        } else {
          setError('Không tải được danh sách game');
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách game:', error);
        setError('Lỗi server khi tải danh sách game');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameNames();
  }, []);

  return (
    <nav className="bg-gray-200 dark:bg-gray-700 p-4 shadow-md">
      <ul className="flex space-x-6 justify-center">
        {/* 1. Trang chủ */}
        <li>
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Trang chủ
          </Link>
        </li>

        {/* 2. Các loại game (Dropdown) */}
        <li className="relative">
          <div
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
          >
            <button
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
            >
              Các loại game
              <span className="ml-1">{isGameDropdownOpen ? '▲' : '▼'}</span>
            </button>
            {isGameDropdownOpen && (
              <div className="absolute z-10 mt-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-64 top-full">
                <table className="w-full text-left text-gray-700 dark:text-gray-200">
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td className="p-2 text-center">Đang tải...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td className="p-2 text-center text-red-500">{error}</td>
                      </tr>
                    ) : gameNames.length > 0 ? (
                      gameNames.map((game, index) => (
                        <tr key={index} className="border-t dark:border-gray-600">
                          <td className="p-2">
                            <a
                              href={`/game/${game.slug}`}
                              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors block"
                            >
                              {game.name}
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="p-2 text-center">Không có game nào</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </li>

        {/* 3. Góp ý & hỗ trợ */}
        <li>
          <Link
            to="/support"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Góp ý & hỗ trợ
          </Link>
        </li>

        {/* 4. Chính sách */}
        <li>
          <Link
            to="/policy"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Chính sách
          </Link>
        </li>

        {/* 5. Liên hệ */}
        <li>
          <Link
            to="/contact"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Liên hệ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavClient;