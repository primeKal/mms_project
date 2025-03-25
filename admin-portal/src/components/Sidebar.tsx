import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <nav>
        <ul className="space-y-4 p-4">
          <li><Link to="/" className="text-green-400">Dashboard</Link></li>
          <li><Link to="/users" className="text-green-400">User Management</Link></li>
          <li><Link to="/policies" className="text-green-400">Policy Management</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
