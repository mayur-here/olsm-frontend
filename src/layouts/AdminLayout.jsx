// import React from 'react';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { Outlet, Link, useLocation } from 'react-router'; // <-- Correct Import

// const { Header, Content, Footer } = Layout;

// const AdminLayout = () => {
//   const breadcrumbNameMap = {
//     '/': 'Home',
//     '/instructor': 'Instructor',
//     '/course': 'Course',
//   };
  
//   const location = useLocation();  // <-- This Hook

//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   const items = [
//     { key: '/', label: <Link to="/">Home</Link> },
//     { key: '/instructor', label: <Link to="/instructor">Instructor</Link> },
//     { key: '/course', label: <Link to="/course">Course</Link> },
//   ];

//   return (
//     <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <Header style={{ display: 'flex', alignItems: 'center' }}>
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           selectedKeys={[location.pathname]}   // <-- Dynamic Menu Selection
//           items={items}
//           style={{ flex: 1, minWidth: 0 }}
//         />
//       </Header>

//       <Content style={{ padding: '0 48px', flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Breadcrumb style={{ margin: '16px 0' }}>
//           <Breadcrumb.Item>{breadcrumbNameMap[location.pathname] || 'Page'}</Breadcrumb.Item>
//         </Breadcrumb>

//         <div style={{
//           background: colorBgContainer,
//           flex: 1,
//           padding: 24,
//           borderRadius: borderRadiusLG,
//         }}>
//           <Outlet />
//         </div>
//       </Content>

//       <Footer style={{ textAlign: 'center' }}>
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };

// export default AdminLayout;


import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <Outlet />  {/* Important */}
    </div>
  );
};

export default AdminLayout;
