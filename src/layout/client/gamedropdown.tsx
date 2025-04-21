import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gameNames, setGameNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (dropdownRef.current && !dropdownRef.current.matches(':hover')) {
        setIsOpen(false);
      }
    }, 200);
  };

  useEffect(() => {
    const fetchGameNames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/gamenames');
        if (response.data.status) {
          setGameNames(response.data.data);
        } else {
          setError('Không tải được danh sách game');
        }
      } catch (error) {
        setError('Lỗi server khi tải danh sách game');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameNames();
  }, []);

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <button
        className="bg-transparent hover:bg-gray-600 text-white px-8 py-4 rounded-md shadow-md transition border-x border-white border-opacity-30"
      >
        Các loại game {isOpen ? '' : ''}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-lg rounded-md w-64 z-20">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
            {isLoading ? (
              <li className="p-3 text-center">Đang tải...</li>
            ) : error ? (
              <li className="p-3 text-center text-red-500">{error}</li>
            ) : gameNames.length > 0 ? (
              gameNames.map((game: any, index) => (
                <li key={index}>
                  <Link
                    to={`/game/${game.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {game.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-3 text-center">Không có game nào</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GameDropdown;
