import './Sidebar.css';

const Sidebar = ({ activePage, onChangePage, onLogout }) => {
  const menuItems = [
    { id: 'notes', label: 'Notes' },
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
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
                className={`sidebar-item ${
                  activePage === item.id ? 'active' : ''
                }`}
                onClick={() => onChangePage(item.id)}
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
