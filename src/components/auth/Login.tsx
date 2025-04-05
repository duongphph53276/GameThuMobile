import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        const { message, banReason, bannedUntil } = error.response.data;
        const banDate = bannedUntil ? new Date(bannedUntil).toLocaleString() : 'không xác định';
        setErrorMessage(`${message}. Lý do: ${banReason}. Thời gian mở khóa: ${banDate}`);
      } else {
        setErrorMessage(error.response?.data?.message || 'Đăng nhập thất bại');
      }
    }
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
    </>
  );
};

export default Login;