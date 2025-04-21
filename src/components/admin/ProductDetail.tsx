import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../auth/axiosConfig';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/admin/products/${id}`);
        if (response.data.status) {
          setProduct(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Không thể tải chi tiết sản phẩm');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center text-lg font-semibold">Đang tải sản phẩm...</div>;
  if (error || !product) return <div className="text-center text-red-500 font-semibold">Lỗi: {error || 'Không tìm thấy sản phẩm'}</div>;

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Chi tiết sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID sản phẩm:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{product._id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tên game:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {typeof product.gameName === 'string' ? product.gameName : product.gameName?.name ?? 'Không xác định'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loại tài khoản:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{product.accountType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email tài khoản:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {product.accountEmail || '(dữ liệu ở đây trống)'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Facebook ID:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {product.accountFacebookId || '(dữ liệu ở đây trống)'}
            </p>
          </div>
          {product.status !== 'Đã Bán' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mật khẩu:</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{product.password}</p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mã 2FA:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {product.twoFactorCode || '(dữ liệu ở đây trống)'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email khôi phục:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {product.recoveryEmail || '(dữ liệu ở đây trống)'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hình ảnh:</label>
            <div className="mt-1">
              {product.images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {product.images.map((image: any, index: any) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Hình ảnh sản phẩm ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Hình+ảnh+lỗi';
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-900 dark:text-gray-100">(dữ liệu ở đây trống)</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ngày tạo:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{new Date(product.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{product.status}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Giá:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{product.price} VNĐ</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả:</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {product.description || '(dữ liệu ở đây trống)'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;