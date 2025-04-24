import React, { useState, useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/admin/users');
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          setError('Không tải được danh sách người dùng');
        }
      } catch (err) {
        setError('Lỗi server');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Danh sách người dùng</h2>
      <Link 
        to="/admin/users/add" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block transition duration-200"
      >
        Thêm người dùng
      </Link>
      {loading && <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Tên</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Email</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">SĐT</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Trạng thái</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Cấm đến</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Vai trò</th>
              <th className="border dark:border-gray-600 p-2 text-gray-700 dark:text-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{user.name}</td>
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{user.email}</td>
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{user.phoneNumber || 'N/A'}</td>
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{user.status}</td>
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">
                  {user.bannedUntil ? new Date(user.bannedUntil).toLocaleDateString() : 'N/A'}
                </td>
                <td className="border dark:border-gray-600 p-2 text-gray-800 dark:text-gray-200">{user.role}</td>
                <td className="border dark:border-gray-600 p-2">
                  <Link 
                    to={`/admin/users/edit/${user._id}`} 
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Sửa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;