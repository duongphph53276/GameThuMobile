import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State để kiểm soát popup
  const [popupContent, setPopupContent] = useState<{ message: string; banReason: string; bannedUntil: string } | null>(null); // Nội dung popup
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.user.role);
        const role = response.data.user.role;
        if (role === 'admin') {
          alert("Đăng nhập thành công");
          navigate('/admin');
        } else {
          alert("Đăng nhập thành công");
          navigate('/');
        }
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        const { message, banReason, bannedUntil } = error.response.data;
        const banDate = bannedUntil ? new Date(bannedUntil).toLocaleString() : 'không xác định';
        // Hiển thị popup cho lỗi cấm
        setPopupContent({ message, banReason, bannedUntil: banDate });
        setIsPopupOpen(true);
      } else {
        // Các lỗi khác vẫn hiển thị trong div
        setErrorMessage(error.response?.data?.message || 'Đăng nhập thất bại');
      }
    }
  };

  // Hàm đóng popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Đăng nhập login" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Đăng Nhập</h2>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
            Đăng Nhập
          </button>
        </form>
      </div>

      {/* Popup */}
      {isPopupOpen && popupContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Tài khoản bị cấm</h3>
            <p className="mb-2"><strong>Thông báo:</strong> {popupContent.message}</p>
            <p className="mb-2"><strong>Lý do:</strong> {popupContent.banReason}</p>
            <p className="mb-4"><strong>Thời gian mở khóa:</strong> {popupContent.bannedUntil}</p>
            <button
              onClick={closePopup}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;