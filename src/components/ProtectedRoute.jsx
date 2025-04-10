import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user?.role) {
    return <Navigate to="/login" />;
  }

  return <Outlet />; // allow to load App Layout
};

export default ProtectedRoute;
