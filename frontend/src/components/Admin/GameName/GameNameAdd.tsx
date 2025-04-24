import React, { useState } from 'react';
import axios from '../../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const GameNameAdd: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/gamenames/add', { name });
      if (response.data.status) {
        alert('Thêm game thành công');
        setName(''); // Reset input sau khi thêm thành công
        setError(null);
        navigate('/admin/gamenames')
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Thêm game thất bại');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Thêm Game Mới</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên game</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 p-2 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên game"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Thêm
        </button>
      </form>
    </div>
  );
};

export default GameNameAdd;