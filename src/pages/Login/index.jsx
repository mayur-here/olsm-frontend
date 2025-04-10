import React from 'react';
import { Button, Checkbox, Form, Input, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './../../store/slices/authSlice';
import axios from 'axios';
import apiService from '../../services/apiService';

const { Title } = Typography;


const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await apiService.login(values) // username & password
  
      if (res?.token) {
        const userData = {
          user: res.user,      // user details from API
          token: res.token,    // token from API
        };
  
        await dispatch(loginSuccess(userData));   // Store in Redux
        message.success('Login Successful!');
        navigate('/');

        messageApi.open({
          type: 'success',
          content: 'Login successfully!',
        });
      } else {
        message.error('Invalid Credentials!');
      }
    } catch (error) {
      message.error('Something went wrong!');
    }
  };
  


  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      {contextHolder}
      <Card
        style={{
          width: 400,
          padding: '32px 24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: 12,
        }}
      >
        <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
          Login
        </Title>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size="large" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
