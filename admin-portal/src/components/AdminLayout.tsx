import React, { ReactNode, useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Badge, Breadcrumb, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  GlobalOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // Handle logout logic
    } else {
      navigate(`/${key}`);
    }
  };

  const languageMenu = (
    <Menu>
      <Menu.Item key="en">
        English
      </Menu.Item>
      <Menu.Item key="fr">
        French
      </Menu.Item>
      <Menu.Item key="es">
        Spanish
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ color: 'white', textAlign: 'center', padding: '10px' }}>
          Admin Portal
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} onClick={handleMenuClick}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="users" icon={<VideoCameraOutlined />}>
            User
          </Menu.Item>
          <Menu.Item key="policies" icon={<UploadOutlined />}>
            Policy
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Dropdown overlay={languageMenu} trigger={['click']} placement="bottomRight">
              <Button icon={<GlobalOutlined />} style={{ border: 'none' }} />
            </Dropdown>
            <Badge count={5} offset={[10, 0]}>
              <BellOutlined style={{ fontSize: '20px', marginLeft: '20px' }} />
            </Badge>
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <Avatar style={{ marginLeft: '20px' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Admin Portal ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
