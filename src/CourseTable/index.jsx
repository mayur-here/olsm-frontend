import React from 'react';
import { Button, Space, Table, Tag, Popconfirm, message } from 'antd';

const CourseTable = ({ assignLecture, isTableDataLoading, data, setAddButton, addButton, deleteNow, editNow }) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Level',
      key: 'level',
      dataIndex: 'level',
      render: (_, { level }) => (
        <>
          <Tag color={'green'} key={level}>
            {level.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'd escription',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(e) => assignLecture(e, record.courseId)}>Assign Lecture</a>
          <a onClick={(e) => editNow(e, record.courseId)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={(e) => deleteNow(e, record.courseId)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: 'red' }}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <Button type='primary' onClick={() => setAddButton(!addButton)}>+ Add Instructor</Button>
      </Space>

      <Table loading={isTableDataLoading} columns={columns} dataSource={data} rowKey="_id" />
    </>
  );
}

export default CourseTable;