import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const user = useSelector(state => state.auth.user);

  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        {user ? (
          <>
            <Link to="/dashboard">Личный кабинет</Link>
            {user.role === 'manager' && <Link to="/manager/support-chats">Чаты</Link>}
            {user.role === 'admin' && <Link to="/admin">Админка</Link>}
            <button onClick={() => window.location.href = '/api/auth/logout'}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/register">Зарегистрироваться</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;