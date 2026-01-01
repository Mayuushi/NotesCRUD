import { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [activeItem, setActiveItem] = useState('notes');

  const menuItems = [
    { id: 'notes', label: 'Notes', action: () => setActiveItem('notes') },
    { id: 'profile', label: 'Profile', action: () => setActiveItem('profile') },
    { id: 'settings', label: 'Settings', action: () => setActiveItem('settings') },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Notes App</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={item.action}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="sidebar-logout" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;