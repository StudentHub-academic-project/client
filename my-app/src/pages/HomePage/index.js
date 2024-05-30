import React from 'react';
import './style.scss';
import PostList from '../../molecules/PostList';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/logIn');
  };

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const handleManagePostsClick = () => {
    navigate('/manage-posts');
  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo" onClick={() => navigate('/')}></div>
        <h1 className="project-title">StudentHub</h1>
        <div className="auth-buttons">
          <button className="login-btn" onClick={handleLoginClick}>Войти</button>
          <button className="register-btn" onClick={handleRegisterClick}>Зарегистрироваться</button>
        </div>
      </header>
      <main className="posts-section">
        <PostList />
        <button className="manage-posts-btn" onClick={handleManagePostsClick}>Управление постами</button>
      </main>
    </div>
  );
}

export default HomePage;
