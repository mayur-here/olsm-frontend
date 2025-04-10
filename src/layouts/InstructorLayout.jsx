import { Layout, Menu, theme, Breadcrumb } from 'antd';
import { Link, Outlet, useLocation } from 'react-router';

const { Header, Content, Footer } = Layout;

const InstructorLayout = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const breadcrumbNameMap = {
    '/': 'Instructor Home',
  };

  const items = [{ key: '/', label: <Link to="/">Home</Link> }];

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>

      <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{breadcrumbNameMap[location.pathname] || 'Page'}</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{
          background: colorBgContainer,
          flex: 1,
          padding: 24,
          borderRadius: borderRadiusLG,
        }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Instructor Panel ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default InstructorLayout;
