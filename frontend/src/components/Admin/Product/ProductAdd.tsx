import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/axiosConfig';

const ProductAdd: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [gameNames, setGameNames] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/gamenames');
        if (response.data.status) setGameNames(response.data.data);
      } catch (err) {
        console.error('Lỗi khi tải game:', err);
      }
    };
    fetchGameNames();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      const response = await axios.post('http://localhost:5000/admin/products/add', formData);
      console.log('Response:', response.data);
      navigate('/admin/products');
      alert(response.data.message);
    } catch (err) {
      alert('Không thể thêm sản phẩm');
      console.error(err);
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block dark:text-white">Tên game</label>
          <select
            name="gameName"
            value={formData?.gameName || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">Chọn game</option>
            {gameNames.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block dark:text-white">Loại tài khoản</label>
          <select
            name="accountType"
            value={formData?.accountType || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">Chọn loại</option>
            <option value="email">Email</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>

        {formData?.accountType === 'email' && (
          <div>
            <label className="block dark:text-white">Email tài khoản</label>
            <input
              type="email"
              name="accountEmail"
              value={formData?.accountEmail || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        )}

        {formData?.accountType === 'facebook' && (
          <div>
            <label className="block dark:text-white">Facebook ID</label>
            <input
              type="text"
              name="accountFacebookId"
              value={formData?.accountFacebookId || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
              required
            />
          </div>
        )}

        <div>
          <label className="block dark:text-white">Mật khẩu</label>
          <input
            type="text"
            name="password"
            value={formData?.password || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block dark:text-white">Mã 2FA (nếu có)</label>
          <input
            type="text"
            name="twoFactorCode"
            value={formData?.twoFactorCode || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block dark:text-white">Email khôi phục (nếu có)</label>
          <input
            type="email"
            name="recoveryEmail"
            value={formData?.recoveryEmail || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block dark:text-white">Trạng thái</label>
          <select
            name="status"
            value={formData?.status || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            required
          >
            <option value="">Chọn trạng thái</option>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Đã Bán">Đã Bán</option>
          </select>
        </div>

        <div>
          <label className="block dark:text-white">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={formData?.price || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block dark:text-white">Mô tả</label>
          <textarea
            name="description"
            value={formData?.description || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
