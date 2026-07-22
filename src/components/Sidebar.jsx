import React from 'react';

const Sidebar = ({ currentTab, setTab, onLogout }) => {
  const navItems = [
    // { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'feeds', label: 'Feeds', icon: '📰' },
  ];

  const sidebarStyle = {
    width: '260px',
    height: '100vh',
    backgroundColor: 'var(--color-muted-background)',
    borderRight: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 16px',
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'var(--color-primary-text)',
    marginBottom: '32px',
    paddingLeft: '8px',
  };

  const itemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px',
    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
    color: isActive ? 'var(--color-primary)' : 'var(--color-secondary-text)',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s ease',
  });

  const logoutBtnStyle = {
    ...itemStyle(false),
    color: 'var(--color-danger-text)',
    marginTop: 'auto',
  };

  return (
    <div style={sidebarStyle}>
      <div>
        <div style={logoStyle}>Dashboard</div>
        <nav>
          {navItems.map((item) => (
            <div
              key={item.id}
              style={itemStyle(currentTab === item.id)}
              onClick={() => setTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <div style={logoutBtnStyle} onClick={onLogout}>
        <span>🚪</span>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;