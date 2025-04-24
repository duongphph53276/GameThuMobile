import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để xem thông tin hồ sơ");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.status) {
          setUser(data.user);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Lỗi khi tải thông tin hồ sơ");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Thông tin hồ sơ</h2>
        <Link
          to="/client/edit"
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Chỉnh sửa
        </Link>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Họ tên:</label>
          <p className="text-gray-900 dark:text-white">{user.name}</p>
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Email:</label>
          <p className="text-gray-900 dark:text-white">{user.email}</p>
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Số điện thoại:</label>
          <p className="text-gray-900 dark:text-white">{user.phoneNumber || "Chưa cập nhật"}</p>
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Vai trò:</label>
          <p className="text-gray-900 dark:text-white">{user.role === "admin" ? "Quản trị viên" : "Người dùng"}</p>
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Trạng thái:</label>
          <p className="text-gray-900 dark:text-white">{user.status === "active" ? "Hoạt động" : "Bị cấm"}</p>
        </div>
        {user.avatar && (
          <div>
            <label className="text-gray-600 dark:text-gray-300 font-medium">Ảnh đại diện:</label>
            <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;