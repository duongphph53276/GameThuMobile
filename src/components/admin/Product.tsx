import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../../interfaces/product';
import { Link } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        if (response.data.status) {
          setProducts(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

    try {
      const response = await axios.delete(`http://localhost:5000/products/${id}`);
      if (response.data.status) {
        setProducts(products.filter((product) => product._id !== id));
        alert('Xóa sản phẩm thành công');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Không thể xóa sản phẩm');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center text-lg font-semibold">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">Lỗi: {error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Danh sách sản phẩm</h2>
      <Link to="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600">
        Thêm mới
      </Link>
      {products.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">Chưa có sản phẩm nào</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Tên game</th>
                <th className="px-4 py-2 text-left">Loại tài khoản</th>
                <th className="px-4 py-2 text-left">Email/ID</th>
                <th className="px-4 py-2 text-left">Giá</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">
                    {typeof product.gameName === 'string' ? product.gameName : product.gameName?.name ?? 'Không xác định'}
                  </td>
                  <td className="px-4 py-2">{product.accountType}</td>
                  <td className="px-4 py-2">
                    {product.accountType === 'email' ? product.accountEmail : product.accountFacebookId}
                  </td>
                  <td className="px-4 py-2">{product.price} VNĐ</td>
                  <td className="px-4 py-2">{product.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Xem
                    </Link>
                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

export default ProductList;