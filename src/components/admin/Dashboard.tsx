import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from '../auth/axiosConfig';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    productsAvailable: number;
    productsSold: number;
    totalUsers: number;
    revenueData: { month: string; revenue: number }[];
  }>({
    productsAvailable: 0,
    productsSold: 0,
    totalUsers: 0,
    revenueData: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          axios.get('/admin/products'),
          axios.get('/admin/users'),
        ]);

        if (productsRes.data.status) {
          const products = productsRes.data.data;
          const available = products.filter((p: any) => p.status === 'Còn hàng').length;
          const sold = products.filter((p: any) => p.status === 'Đã Bán').length;
          setStats((prev) => ({ ...prev, productsAvailable: available, productsSold: sold }));
        } else {
          setError(productsRes.data.message);
        }

        if (usersRes.data.status) {
          setStats((prev) => ({ ...prev, totalUsers: usersRes.data.data.length }));
        } else {
          setError(usersRes.data.message);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu dashboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Dữ liệu cho biểu đồ doanh thu
  const chartData = {
    labels: stats.revenueData.map((data) => data.month),
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: stats.revenueData.map((data) => data.revenue),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Doanh thu qua các tháng',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VNĐ)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Tháng',
        },
      },
    },
  };

  if (loading) return <div className="text-center text-lg font-semibold">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-red-500 font-semibold">Lỗi: {error}</div>;

  return (
    <>
      <Helmet>
        <title>ADMIN - Dashboard</title>
      </Helmet>
      <div className="container mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h2>

        {/* Tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-100 dark:bg-blue-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Sản phẩm còn lại</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-100">{stats.productsAvailable}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Sản phẩm đã bán</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-100">{stats.productsSold}</p>
          </div>
          <div className="bg-purple-100 dark:bg-purple-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Số lượng người dùng</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-100">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;