import React from 'react';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';

const { Header, Content, Footer } = Layout;
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/slices/authSlice';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const breadcrumbNameMap = {
    '/': user?.role === 'instructor' ? 'Dashboard' : 'Assigned Lecture List',
    '/instructor': 'Instructor List',
    '/course': 'Course List',
  };

  const menuItems = [
    { key: '/', label: <Link to="/">{user?.role === 'instructor' ? 'Dashboard' : 'Home'}</Link> },
    ...(user?.role === 'admin'
      ? [
          { key: '/instructor', label: <Link to="/instructor">Instructor</Link> },
          { key: '/course', label: <Link to="/course">Course</Link> },
        ]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ flex: 1, minWidth: 0 }}
        />
         <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
      </Header>

      <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>
            {breadcrumbNameMap[location.pathname] || 'Page'}
          </Breadcrumb.Item>
        </Breadcrumb>

        <div
          style={{
            background: colorBgContainer,
            flex: 1,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Created By Mayur Koladiya
      </Footer>
    </Layout>
  );
};

export default App;
