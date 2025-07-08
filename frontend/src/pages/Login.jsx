import React, { useState } from 'react';
import apiClient from '../services/apiClient';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await apiClient.post('/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="login-page">
      <h2>Вход</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login;