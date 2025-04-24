import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    avatar: '',
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Bạn cần đăng nhập để chỉnh sửa hồ sơ");
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
          setFormData({
            name: data.user.name,
            phoneNumber: data.user.phoneNumber || '',
            avatar: data.user.avatar || '',
          });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status) {
        setSuccess("Cập nhật thành công!");
        setTimeout(() => navigate("/profile"), 2000); // Chuyển về profile sau 2 giây
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Lỗi khi cập nhật hồ sơ");
    }
  };

  if (loading) return <div className="text-center py-8">Đang tải...</div>;
  if (error && !formData.name) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Chỉnh sửa hồ sơ</h2>
      {success && <div className="text-green-500 mb-4">{success}</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Họ tên:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">Số điện thoại:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="text-gray-600 dark:text-gray-300 font-medium">URL ảnh đại diện:</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded-md dark:bg-gray-700 dark:text-white"
            placeholder="Nhập URL ảnh (tùy chọn)"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;