import React from 'react';

import { Button, Card, Space, Typography, Avatar, Input } from "antd";
import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";
import { NavLink, useParams } from 'react-router-dom';

import Message from './Message';

import io from "socket.io-client";

const Messenger = React.memo(props => {
    const { id } = useParams();
    const [yourID, setYourID] = React.useState();
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const socketRef = React.useRef();
    let ENDPOINT = "localhost:8080";
    const handleChangeMessage = (e) => {
      setMessage(e.target.value);
    }
    const [user, setUser] = React.useState({});
    React.useEffect(() => {
        window
            .fetch(`http://localhost:8080/message/${id}`, {
                method: "GET"
            })
            .then((res) => {
                res.json()
                    .then((user) => setUser(user.user))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [id]);

    const receivedMessage = (message) => {
        setMessages((oldMsgs) => [...oldMsgs, message]);
    }

    React.useEffect(() => {
        socketRef.current = io.connect(ENDPOINT);

        socketRef.current.on("your id", (id) => {
            setYourID(id);
        });

        socketRef.current.on("message", (message) => {
            console.log("here");
            receivedMessage(message);
        });
    }, [ENDPOINT]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject); 
    };
    return (
        <Card
            actions={[]}
            size="small"
            bodyStyle={{
                background: "#f8f6f8",
                height: 512,
                borderBottomLeftRadius: 16,
                borderBottomRightRadius: 16,

                paddingBottom: 48,

                overflowY: "auto"
            }}
            style={{
                width: 512,
                borderRadius: 16,
                boxShadow:
                    "4px 4px 32px rgba(0,0,0,0.2), -4px -4px 32px rgba(0,0,0,0.2)",
                position: "relative"
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "16px",

                        cursor: "pointer"
                    }}
                >
                    <NavLink to="/">
                        <Button type="text" icon={<ArrowLeftOutlined />} />
                    </NavLink>
                    <Space
                        align="center"
                        style={{
                            width: "100%"
                        }}
                    >
                        <Avatar src={user.avatar} alt="" size={40} />
                        <Space size={-4} align="start" direction="vertical">
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
                </div>
            }
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    background: "white",
                    padding: 8,
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,

                    zIndex: 2
                }}
            >
                <Space>
                    <Input
                        value={message}
                        onChange={handleChangeMessage}
                        onPressEnter={handleSendMessage}
                        placeholder="Type a message here"
                        style={{ width: "420px" }}
                    />
                    <SendOutlined
                        style={{
                            padding: 8,
                            background: "#616061",
                            margin: 0,
                            color: "white",
                            borderRadius: 8
                        }}
                    />
                </Space>
            </div>
            <Message messages={messages} yourID={yourID} avatar={user.avatar} />
        </Card>
    );
})

export default Messenger;