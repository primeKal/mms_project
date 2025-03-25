import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './features/Dashboard';
import UserManagement from './features/UserManagement/UserManagement';
import PolicyManagement from './features/PolicyManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/policies" element={<PolicyManagement />} />
    </Routes>
  );
};

export default AppRoutes;
