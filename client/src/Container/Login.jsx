import React from "react";

import { Form, Input, Button, Card, Typography, message } from "antd";

import { NavLink } from "react-router-dom";

const Login = React.memo(props => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState("");
  const handleLogin = () => {
          window
              .fetch("http://localhost:8080/sign-in", {
                  method: "POST",
                  body: JSON.stringify({ email, password }),
                  redirect: "follow",
                  withCredentials: true, 
                  credentials: 'include',
                  headers: {
                      "Content-Type": "application/json"
                  }
              })
              .then((res) => {
                  res.json().then(({token, user}) => {
                    if (token) {
                        message.success("Successfully Signed In!");
                        window.sessionStorage.setItem("email", email);
                        window.sessionStorage.setItem("uid", user._id);
                        window.sessionStorage.setItem("isAuth", true);
                        window.location.href = "/";
                    } else {
                        message.error("Invalid email or password!");
                    }
                  })
              })
              .catch((err) => console.log(err));
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
      <Form layout="vertical" onFinish={handleLogin}>
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Typography.Text>
          Don't have an account? <NavLink to="/sign-up">Sign up</NavLink>
        </Typography.Text>
      </Form>
    </Card>
  );
}) 

export default Login;