import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DropdownButton({ setUser }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        |||
      </button>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <button onClick={handleLogout}>Logout</button><br />
          <Link to="settings">Settings</Link>
        </div>
      )}
    </div>
  );
}
