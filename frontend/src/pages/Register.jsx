import React, { useState } from 'react';
import apiClient from '../services/apiClient';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleRegister = async () => {
    try {
      const res = await apiClient.post('/api/client/register', {
        name,
        email,
        password,
        contactPhone,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = '/';
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <div className="register-page">
      <h2>Регистрация</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
      />
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
      <input
        value={contactPhone}
        onChange={(e) => setContactPhone(e.target.value)}
        placeholder="Телефон"
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </div>
  );
}

export default Register;