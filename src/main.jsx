import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router';
import App from './App';
import Login from './pages/Login';
import Instructor from './pages/Instructor';
import Course from './pages/Course';

import { Provider } from 'react-redux';
import { store } from './store';
import RoleBasedHome from './components/RoleBasedHome';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <RoleBasedHome />
        ),
      },
      // {
      //   index: true,
      //   element: JSON.parse(localStorage.getItem('user'))?.role === 'instructor' 
      //     ? <InstructorHome />
      //     : <AdminHome />  // Create a separate HomePage.jsx or use existing content
      // },
      { path: 'instructor', element: <Instructor /> },
      { path: 'course', element: <Course /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <RouterProvider router={router} />
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
