import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any | null>(null);
  const [gameNames, setGameNames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, gameNamesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/admin/products/${id}`),
          axios.get('http://localhost:5000/admin/gamenames'),
        ]);

        if (productResponse.data.status) {
          setFormData(productResponse.data.data);
        } else {
          setError(productResponse.data.message);
        }

        if (gameNamesResponse.data.status) {
          setGameNames(gameNamesResponse.data.data);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const payload = {
        ...formData,
        accountEmail: formData.accountType === 'email' ? formData.accountEmail : null,
        accountFacebookId: formData.accountType === 'facebook' ? formData.accountFacebookId : null,
      };
      const response = await axios.put(`http://localhost:5000/admin/products/edit/${id}`, payload);
      if (response.data.status) {
        alert('Cập nhật sản phẩm thành công');
        navigate('/admin/products');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert('Không thể cập nhật sản phẩm');
      console.error(err);
    }
  };

  if (loading) return <div className="text-gray-800 dark:text-gray-100">Đang tải sản phẩm...</div>;
  if (error || !formData) return <div className="text-red-500 dark:text-red-400">Lỗi: {error || 'Không tìm thấy sản phẩm'}</div>;

  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên game</label>
          <select
            name="gameName"
            value={typeof formData.gameName === 'string' ? formData.gameName : formData.gameName?._id ?? ''}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
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
          <label className="block mb-1">Loại tài khoản</label>
          <select
            name="accountType"
            value={formData.accountType}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="email">Email</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
        {formData.accountType === 'email' && (
          <div>
            <label className="block mb-1">Email tài khoản</label>
            <input
              type="email"
              name="accountEmail"
              value={formData.accountEmail || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        )}
        {formData.accountType === 'facebook' && (
          <div>
            <label className="block mb-1">Facebook ID</label>
            <input
              type="text"
              name="accountFacebookId"
              value={formData.accountFacebookId || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Mật khẩu</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Mã 2FA (nếu có)</label>
          <input
            type="text"
            name="twoFactorCode"
            value={formData.twoFactorCode || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Email khôi phục (nếu có)</label>
          <input
            type="email"
            name="recoveryEmail"
            value={formData.recoveryEmail || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1">Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="Còn hàng">Còn hàng</option>
            <option value="Đã Bán">Đã Bán</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Giá (VNĐ)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 dark:hover:bg-green-400"
        >
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;