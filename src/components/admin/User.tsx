import React, { useState, useEffect } from 'react';
import axios from '../../components/auth/axiosConfig';
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
      <Link to="/admin/users/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Thêm người dùng
      </Link>
      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">SĐT</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Cấm đến</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-t">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phoneNumber || 'N/A'}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                {user.bannedUntil ? new Date(user.bannedUntil).toLocaleDateString() : 'N/A'}
              </td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <Link to={`/admin/users/edit/${user._id}`} className="text-blue-500">Sửa</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;