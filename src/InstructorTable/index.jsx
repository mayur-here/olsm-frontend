import React from 'react';
import { Button, Space, Table, Tag, Popconfirm, message } from 'antd';

const InstructorTable = ({ isTableDataLoading, data, setAddButton, addButton, deleteNow, editNow }) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Skills',
      key: 'skills',
      dataIndex: 'skills',
      render: (_, { skills }) => (
        <>
          {skills.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(e) => editNow(e, record.userId)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this instructor?"
            onConfirm={(e) => deleteNow(e, record.userId)}
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

export default InstructorTable;