import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.data.status) {
        localStorage.setItem('token', response.data.token); // Lưu token
        localStorage.setItem('role', response.data.user.role); // Lưu role
        const role = response.data.user.role;
        if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      alert('Đăng nhập thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Đăng nhập</button>
    </form>
  );
};

export default Login;