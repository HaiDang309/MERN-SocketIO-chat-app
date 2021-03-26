import React from 'react';

import { Badge, Space, Avatar, Typography } from "antd";
import { NavLink } from 'react-router-dom';

const Contact = React.memo(props => {
    const { username, avatar, id } = props;
    return (
        <NavLink to={`/message/${id}`}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",

                    cursor: "pointer",

                    width: "310px",

                    marginTop: 16
                }}
            >
                <Space
                    align="center"
                    style={{
                        width: "100%"
                    }}
                >
                    <Avatar src={avatar} alt="" size={32} />
                    <Space size={-4} align="start" direction="vertical">
                        <Typography.Text strong>{username}</Typography.Text>
                        <Typography.Text
                            type="secondary"
                            style={{ fontSize: "14px", fontWeight: "400" }}
                        ></Typography.Text>
                    </Space>
                </Space>

                <Badge status="success" />
            </div>
        </NavLink>
    );
})

export default Contact;