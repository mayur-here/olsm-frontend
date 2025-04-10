import { useSelector } from 'react-redux';
import InstructorHome from './../pages/InstructorHome';
import AdminHome from './../pages/AdminHome';
import { Spin } from 'antd';

const RoleBasedHome = () => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === 'instructor') {
    return <InstructorHome />;
  } else if (user?.role === 'admin') {
    return  <AdminHome />;
  } else 
    return <Spin />;
};

export default RoleBasedHome;
