
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, Link, useLocation } from 'react-router';
import LectureTable from '../../LectureTable';
import apiService from '../../services/apiService';

const { Header, Content, Footer } = Layout;

const InstructorHome = () => {
  const [data, setData] = useState([]);
  const [isTableDataLoading, setIsTableDataLoading] = useState(true);
  
  const fetchData = async () => {
    try {
      const response = await apiService.search('lecture', {});  // Passing empty query to fetch all data
      if(response) {
        setData(response?.map(e => {
          return {
            ...e,
            instructorName : `${e.instructorName} (You)`
          }
        }));
        setIsTableDataLoading(false)
      }
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <LectureTable isTableDataLoading={isTableDataLoading} data={data}/>
    </>
  );
};

export default InstructorHome;
