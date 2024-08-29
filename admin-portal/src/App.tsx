import React from "react";
import AppRoutes from "./routes";
import Sidebar from "./components/Sidebar";
import 'antd/dist/reset.css'; // Ant Design styles
import './index.css'; // Your custom styles
import AdminLayout from "./components/AdminLayout";

const App: React.FC = () => {
  return (
    <AdminLayout>
          <AppRoutes />
    </AdminLayout>
  );
};

export default App;
