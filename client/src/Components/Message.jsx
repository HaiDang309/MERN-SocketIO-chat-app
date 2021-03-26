import React from 'react';

import { Space, Avatar } from "antd";

const Message = React.memo(props => {
    const { avatar, messages, yourID } = props;
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            {messages.map((message) => {
                return message.id === yourID ? (
                    <div
                        key={Math.random()}
                        style={{
                            marginBottom: -8,

                            float: "right",

                            maxWidth: "85%",

                            lineHeight: 1.5
                        }}
                    >
                        <p
                            style={{
                                background: "#282c34",
                                color: "white",
                                padding: 8,
                                borderTopLeftRadius: 16,
                                borderBottomLeftRadius: 16,
                                borderTopRightRadius: 16,
                                boxShadow:
                                    "4px 4px 64px rgba(0,0,0,0.2), -4px -4px 64px rgba(0,0,0,0.2)"
                            }}
                        >
                            {message.body}
                        </p>
                    </div>
                ) : (
                    <Space
                        key={Math.random()}
                        align="start"
                        style={{
                            marginBottom: -8,

                            width: "85%",

                            lineHeight: 1.5
                        }}
                    >
                        <Avatar
                            src={avatar}
                            alt=""
                            style={{ width: 32, height: 32 }}
                        />
                        <p
                            style={{
                                padding: 8,
                                borderTopLeftRadius: 16,
                                borderBottomRightRadius: 16,
                                borderTopRightRadius: 16,
                                boxShadow:
                                    "4px 4px 64px rgba(0,0,0,0.2), -4px -4px 64px rgba(0,0,0,0.2)"
                            }}
                        >
                            {message.body}
                        </p>
                    </Space>
                );
            })}
        </Space>
    );
})

export default Message;