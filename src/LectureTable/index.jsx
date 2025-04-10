import React from 'react';
import { Button, Space, Table, Tag, Popconfirm, message } from 'antd';

const LectureTable = ({ isTableDataLoading, data}) => {

  const columns = [
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Instructor Name',
      dataIndex: 'instructorName',
      key: 'instructorName',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
    },
  ];

  return (
    <>
      <Table loading={isTableDataLoading} columns={columns} dataSource={data} rowKey="_id" />
    </>
  );
}

export default LectureTable;