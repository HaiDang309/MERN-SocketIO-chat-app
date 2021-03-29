import React from "react";

import { Form, Input, Button, Card, Typography, message } from "antd";

import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

import UploadAvatar from './UploadAvatar'

const Register = React.memo((props) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const avatar = useSelector((state) => state.userReducer.avatar);
  const handleSignup = () => {
    if(!avatar) {
      message.error('Please select an avatar!');
      return;
    }
    window
        .fetch("http://localhost:8080/sign-up", {
            method: "POST",
            body: JSON.stringify({ email, username, password, avatar, isOnline: false}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            message.success("Successfully registered!");
            setEmail("");
            setPassword("");
        })
        .catch((err) => message.error(err));
  };

  return (
    <Card
      style={{
        width: 360,
        boxShadow:
          "4px 4px 32px rgba(0,0,0,0.2), -4px -4px 32px rgba(0,0,0,0.2)",
        borderRadius: "16px",
        textAlign: "center",
      }}
      title="Realtime messenger"
    >
      <Form layout="vertical" onFinish={handleSignup}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          htmlType="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            allowClear
          />
        </Form.Item>

        <UploadAvatar />

        <Form.Item>
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            htmlType="submit"
          >
            Sign up
          </Button>
        </Form.Item>

        <Typography.Text>
          Already have an account? <NavLink to="/">Log in</NavLink>
        </Typography.Text>
      </Form>
    </Card>
  );
});

export default Register;
