
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router';
import LectureTable from '../../LectureTable';
import apiService from '../../services/apiService';
import { useSelector } from 'react-redux';

const { Header, Content, Footer } = Layout;

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(true);
  const token = useSelector((state) => state.auth?.token);

  const fetchData = async () => {
    try {
      const response = await apiService.search('lecture', {});  // Passing empty query to fetch all data
      if(response) {
        setData(response);
        setIsTableDataLoading(false)
      }
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <>
      <LectureTable isTableDataLoading={isTableDataLoading} data={data}/>
    </>
  );
};

export default AdminHome;
