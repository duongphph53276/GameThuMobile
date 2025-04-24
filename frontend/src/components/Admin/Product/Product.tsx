import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FilterProduct from './ProductFilter';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [gameNames, setGameNames] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsRes, gamesRes] = await Promise.all([
          axios.get('/admin/products'),
          axios.get('/admin/gamenames')
        ]);

        if (productsRes.data.status) {
          setProducts(productsRes.data.data);
          setFilteredProducts(productsRes.data.data);
        } else {
          setError(productsRes.data.message);
        }

        if (gamesRes.data.status) {
          setGameNames(gamesRes.data.data);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu');
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
      const response = await axios.delete(`http://localhost:5000/admin/products/${id}`);
      if (response.data.status) {
        const updated = products.filter((product) => product._id !== id);
        setProducts(updated);
        setFilteredProducts(filteredProducts.filter((product) => product._id !== id));
        alert('Xóa sản phẩm thành công');
        // Nếu trang hiện tại không còn sản phẩm, chuyển về trang trước
        if (filteredProducts.length % itemsPerPage === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Không thể xóa sản phẩm');
      console.error(err);
    }
  };

  // Tính toán phân trang
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Đặt lại về trang 1 khi thay đổi số sản phẩm mỗi trang
  };

  if (loading) return <div className="text-center text-lg font-semibold">Đang tải sản phẩm...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">Lỗi: {error}</div>;

  return (
    <>
      <Helmet>
        <title>ADMIN</title>
      </Helmet>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Danh sách sản phẩm</h2>
          <Link
            to="/admin/products/add"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Thêm mới
          </Link>
        </div>

        <FilterProduct
          products={products}
          gameNames={gameNames}
          onFilterChange={setFilteredProducts}
        />

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">Không tìm thấy sản phẩm</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-gray-600 dark:text-gray-300">
                  Hiển thị {currentProducts.length} / {totalItems} sản phẩm
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-gray-600 dark:text-gray-300">Sản phẩm mỗi trang:</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border rounded p-2 dark:bg-gray-800 dark:text-white"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Tên game</th>
                    <th className="px-4 py-2 text-left">Loại tài khoản</th>
                    <th className="px-4 py-2 text-left">Email/Facebook id</th>
                    <th className="px-4 py-2 text-left">Giá</th>
                    <th className="px-4 py-2 text-left">Trạng thái</th>
                    <th className="px-4 py-2 text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
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
                        <Link to={`/admin/products/${product._id}`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Xem</Link>
                        {product.status !== 'Đã Bán' && (
                          <>
                            <Link to={`/admin/products/edit/${product._id}`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Sửa</Link>
                            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Xóa</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phân trang */}
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Trang trước
              </button>
              <span className="text-gray-600 dark:text-gray-300">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
              >
                Trang sau
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;