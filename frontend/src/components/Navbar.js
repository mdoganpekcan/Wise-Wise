import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1>🚛 Wise-Wise Lojistik (Logistics)</h1>
        <div className="navbar-links">
          <Link to="/">Ana Sayfa (Home)</Link>
          <Link to="/expenses">Harcamalar (Expenses)</Link>
          <Link to="/breakdowns">Arızalar (Breakdowns)</Link>
          <span style={{ color: '#ecf0f1' }}>
            {user.fullName} ({user.role === 'driver' ? 'Şoför' : 'Yönetici'})
          </span>
          <button onClick={handleLogout}>Çıkış (Logout)</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
