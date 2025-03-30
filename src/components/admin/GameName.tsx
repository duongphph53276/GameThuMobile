import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GameName } from '../../interfaces/gamename';

const GameNameList: React.FC = () => {
  const [gameNames, setGameNames] = useState<GameName[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/gamenames');
        if (response.data.status) {
          setGameNames(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Không thể tải danh sách game');
      } finally {
        setLoading(false);
      }
    };
    fetchGameNames();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa game này?')) return;
    try {
      const response = await axios.delete(`http://localhost:5000/gamenames/${id}`);
      if (response.data.status) {
        setGameNames(gameNames.filter((game) => game._id !== id));
        alert('Xóa thành công');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Không thể xóa game');
    }
  };

  if (loading) return <div className="text-center text-lg text-gray-500">Đang tải...</div>;
  if (error) return <div className="text-center text-red-500">Lỗi: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Game</h2>
        <Link
          to="/admin/gamenames/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Thêm mới
        </Link>
      </div>
      {gameNames.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có game nào</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tên</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Slug</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {gameNames.map((game) => (
                <tr key={game._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{game.name}</td>
                  <td className="px-4 py-2 text-gray-800">{game.slug || 'Chưa có slug'}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/admin/gamenames/edit/${game._id}`}
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(game._id)}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GameNameList;