import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import FeedsPage from './FeedsPage';

const Dashboard = ({ onLogout }) => {
  const [currentTab, setTab] = useState('feeds');

  const layoutStyle = { display: 'flex', minHeight: '100vh' };
  const contentStyle = { flexGrow: 1, display: 'flex' };

  const renderContent = () => {
    switch (currentTab) {
      // case 'overview':
      //   return <div style={{ padding: '32px', fontSize: '24px' }}>Overview Content</div>;
      case 'feeds':
        return <FeedsPage />;
      // case 'settings':
      //   return <div style={{ padding: '32px', fontSize: '24px' }}>Settings Content</div>;
      default:
        return <FeedsPage />;
    }
  };

  return (
    <div style={layoutStyle}>
      <Sidebar currentTab={currentTab} setTab={setTab} onLogout={onLogout} />
      <div style={contentStyle}>{renderContent()}</div>
    </div>
  );
};

export default Dashboard;