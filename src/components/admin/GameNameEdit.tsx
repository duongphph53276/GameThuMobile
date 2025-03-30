import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GameName } from '../../interfaces/gamename';

const GameNameEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gameName, setGameName] = useState<GameName | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchGameName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/admin/gamenames/${id}`);
        if (response.data.status) {
          setGameName(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchGameName();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameName) return;

    try {
      const response = await axios.put(`http://localhost:5000/admin/gamenames/edit/${id}`, {
        name: gameName.name,
      });
      if (response.data.status) {
        alert('Cập nhật thành công');
        navigate('/admin/gamenames')
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Cập nhật thất bại');
    }
  };

  if (loading) return <div className="text-center text-lg text-gray-500">Đang tải...</div>;
  if (error || !gameName) return <div className="text-center text-red-500">Lỗi: {error || 'Không tìm thấy game'}</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sửa Game</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Tên game</label>
          <input
            type="text"
            value={gameName.name}
            onChange={(e) => setGameName({ ...gameName, name: e.target.value })}
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={gameName.slug || 'Chưa có slug'}
            disabled
            className="mt-1 w-full border border-gray-300 p-2 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default GameNameEdit;