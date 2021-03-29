import React from "react";

import { Card, Avatar, Typography, Space, Button, Input, } from "antd";

import ContactContainer from "./ContactContainer";

import { NavLink } from 'react-router-dom'

const Dashboard = React.memo((props) => {
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = '/sign-in'
  }
  const [user, setUser] = React.useState({});
  const [search, setSearch] = React.useState('')
  React.useEffect(() => {
    window
        .fetch("http://localhost:8080/", {
            method: "GET"
        })
        .then((res) => {
            res.json()
                .then((user) => {
                  const currentUser = user.user.filter(item => item.email === window.sessionStorage.getItem('email'));
                  setUser(currentUser[0])
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
  },[])
  return (
      <Card
          style={{
              borderRadius: 16,
              width: 360,
              boxShadow:
                  "4px 4px 32px rgba(0,0,0,0.2), -4px -4px 32px rgba(0,0,0,0.2)"
          }}
          title={
              <div
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                  }}
              >
                  <NavLink to="/profile">
                    <Space align="center">
                      <Avatar src={window.sessionStorage.getItem('avatar')} alt="" size={40} />
                      <Space align="start" size={-4} direction="vertical">
                          <Typography.Text strong>
                              {user.username}
                          </Typography.Text>
                          <Typography.Text
                              style={{ fontSize: "14px", fontWeight: "400" }}
                          >
                              Active now
                          </Typography.Text>
                      </Space>
                  </Space>
                  </NavLink>

                  <Button danger onClick={handleLogout}>
                      Log out
                  </Button>
              </div>
          }
      >
          <Input.Search value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Select an user to start chat" />

          <ContactContainer search={search}/>
      </Card>
  );
});

export default Dashboard;
