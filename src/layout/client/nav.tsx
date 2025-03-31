import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../components/auth/axiosConfig';

const NavClient: React.FC = () => {
  const [gameNames, setGameNames] = useState<{ name: string; slug: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);

  // Lấy danh sách GameName từ API
  useEffect(() => {
    const fetchGameNames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/gamenames');
        console.log('Response từ /gamenames:', response.data); // Debug response
        if (response.data.status) {
          setGameNames(response.data.data); // Lấy từ data
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
        <li className="relative"
            onMouseEnter={() => setIsGameDropdownOpen(true)} // Mở dropdown khi di chuột vào
            onMouseLeave={() => setIsGameDropdownOpen(false)} // Đóng dropdown khi di chuột ra
        >
          <button
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors flex items-center"
          >
            Các loại game
            <span className="ml-1">▼</span>
          </button>
          {isGameDropdownOpen && (
            <div className="absolute z-10 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-64">
              <ul className="text-gray-700 dark:text-gray-200">
                {isLoading ? (
                  <li className="p-2 text-center">Đang tải...</li>
                ) : error ? (
                  <li className="p-2 text-center text-red-500">{error}</li>
                ) : gameNames.length > 0 ? (
                  gameNames.map((game, index) => (
                    <li key={index} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600">
                      <Link to={`/games/${game.slug}`}>{game.name}</Link> {/* Chỉ hiển thị tên game */}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-center">Không có game nào</li>
                )}
              </ul>
            </div>
          )}
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