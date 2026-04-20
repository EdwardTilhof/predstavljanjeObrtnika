import React from 'react';
import RoleCheck from '../../Permissions/RoleCheck';

const AdminPage = () => {
  return (
    <RoleCheck minRole="ADMIN">
      <div className="admin-dashboard">
        <h1>Admin Control Panel</h1>
        <p>Only people with the ADMIN rank can see this page.</p>
        <div className="stats-grid">
          <div className="card">Total Users: 150</div>
          <div className="card">Revenue: $5,000</div>
        </div>
      </div>
    </RoleCheck>
  );
};

export default AdminPage;