import React, { useEffect, useState } from 'react';

interface FilterProps {
  products: any[];
  gameNames: any[];
  onFilterChange: (filtered: any[]) => void;
}

const FilterProduct: React.FC<FilterProps> = ({ products, gameNames, onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: '',
    accountType: '',
    gameId: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    timeSort: ''
  });

  useEffect(() => {
    let result = [...products];

    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    if (filters.accountType) {
      result = result.filter((p) => p.accountType === filters.accountType);
    }

    if (filters.gameId) {
      result = result.filter((p) => {
        if (typeof p.gameName === 'object') return p.gameName?._id === filters.gameId;
        return p.gameName === filters.gameId;
      });
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice));
    }

    if (filters.sort === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    if (filters.timeSort === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (filters.timeSort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    onFilterChange(result);
  }, [filters, products, onFilterChange]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      accountType: '',
      gameId: '',
      minPrice: '',
      maxPrice: '',
      sort: '',
      timeSort: ''
    });
    onFilterChange(products); // Đặt lại danh sách sản phẩm gốc
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <select
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Lọc trạng thái</option>
        <option value="Còn hàng">Còn hàng</option>
        <option value="Đã Bán">Đã Bán</option>
      </select>

      <select
        name="accountType"
        value={filters.accountType}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Loại tài khoản</option>
        <option value="email">Email</option>
        <option value="facebook">Facebook</option>
      </select>

      <select
        name="gameId"
        value={filters.gameId}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Tên game</option>
        {gameNames.map((game) => (
          <option key={game._id} value={game._id}>
            {game.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Giá từ"
        value={filters.minPrice}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Giá đến"
        value={filters.maxPrice}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      />
      <select
        name="sort"
        value={filters.sort}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Sắp xếp theo giá</option>
        <option value="asc">Tăng dần</option>
        <option value="desc">Giảm dần</option>
      </select>
      <select
        name="timeSort"
        value={filters.timeSort}
        onChange={handleFilterChange}
        className="border rounded p-2 dark:bg-gray-800 dark:text-white"
      >
        <option value="">Sắp xếp theo thời gian</option>
        <option value="oldest">Cũ nhất</option>
        <option value="newest">Mới nhất</option>
      </select>
      <button
        onClick={handleResetFilters}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 md:col-span-2"
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default FilterProduct;