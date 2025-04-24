import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [bannedUntil, setBannedUntil] = useState('');
  const [banReason, setBanReason] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/admin/users/${id}`);
        if (response.data.status) {
          const userData = response.data.data;
          setUser(userData);
          setStatus(userData.status);
          setBannedUntil(userData.bannedUntil || '');
          setBanReason(userData.banReason || '');
          setRole(userData.role || '');
        } else {
          setError(response.data.message || 'Không tải được thông tin người dùng');
        }
      } catch (err: any) {
        console.log('Fetch user error:', err.response?.data);
        setError(err.response?.data?.message || 'Lỗi server');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`/admin/users/edit/${id}`, {
        status,
        bannedUntil: bannedUntil || null,
        banReason: banReason || '',
        role,
      });
      if (response.data.status) {
        setSuccess('Cập nhật người dùng thành công');
        setTimeout(() => navigate('/admin/users'), 2000);
      } else {
        setError(response.data.message || 'Cập nhật thất bại');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi server khi cập nhật');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4 text-gray-600 dark:text-gray-400">Đang tải...</div>;
  if (error) return (
    <div className="text-red-500 text-center p-4">
      {error}
      <button
        onClick={() => navigate('/admin/users')}
        className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Quay lại danh sách
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Chỉnh sửa người dùng</h2>
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {user && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên:</label>
            <input
              type="text"
              value={user.name || ''}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              value={user.email || ''}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">SĐT:</label>
            <input
              type="text"
              value={user.phoneNumber || 'N/A'}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Vai trò:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="admin">Admin</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
            >
              <option value="Hoạt động">Hoạt động</option>
              <option value="Cấm">Cấm</option>
            </select>
          </div>
          {status === 'Cấm' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thời hạn cấm:</label>
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    const now = new Date();
                    const updated = new Date(now);

                    switch (value) {
                      case '1d':
                        updated.setDate(now.getDate() + 1);
                        break;
                      case '3d':
                        updated.setDate(now.getDate() + 3);
                        break;
                      case '5d':
                        updated.setDate(now.getDate() + 5);
                        break;
                      case '7d':
                        updated.setDate(now.getDate() + 7);
                        break;
                      case '1m':
                        updated.setMonth(now.getMonth() + 1);
                        break;
                      case '1y':
                        updated.setFullYear(now.getFullYear() + 1);
                        break;
                      case '100y':
                        updated.setFullYear(now.getFullYear() + 100);
                        break;
                      default:
                        break;
                    }

                    setBannedUntil(updated.toISOString());
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                >
                  <option value="">-- Chọn thời hạn cấm --</option>
                  <option value="1d">1 ngày</option>
                  <option value="3d">3 ngày</option>
                  <option value="5d">5 ngày</option>
                  <option value="7d">7 ngày</option>
                  <option value="1m">1 tháng</option>
                  <option value="1y">1 năm</option>
                  <option value="100y">Vĩnh viễn</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lý do cấm:</label>
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  rows={3}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật'}
          </button>
        </form>
      )}
    </div>
  );
};

export default UserEdit;