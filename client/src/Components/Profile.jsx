import React from 'react';

import { Card, Form, Input, message, Button } from 'antd';

import { NavLink } from 'react-router-dom';

import UploadAvatar from '../Container/UploadAvatar';

const Profile = React.memo(props => {
    const [username, setUsername] = React.useState(
        window.sessionStorage.getItem("username")
    );
    const uid = window.sessionStorage.getItem('uid');
    const avatar = window.sessionStorage.getItem('avatar');
    const handleSave = () => {
        window.fetch('http://localhost:8080/profile', {
            method: "PUT",
            body: JSON.stringify({uid, username}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(res => {
            if(res.status === 200) {
                res.json().then(({updatedUser}) => {
                    window.sessionStorage.setItem('username', updatedUser.username);
                    message.success("Successfully updated!")
                });
            }
        })
        .catch(err => message.error(err.message));
    }
    return (
        <Card
            style={{
                width: 360,
                boxShadow:
                    "4px 4px 32px rgba(0,0,0,0.2), -4px -4px 32px rgba(0,0,0,0.2)",
                borderRadius: "16px",
                textAlign: "center"
            }}
            title="Profile"
            actions={[
                <NavLink to="/">
                    <Button>Home</Button>
                </NavLink>
            ]}
        >
            <Form layout="vertical" onFinish={() => handleSave()}>
                <Form.Item label="Username">
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        allowClear
                    />
                </Form.Item>
                <UploadAvatar currentAvatar={avatar} />

                <Form.Item>
                    <Button
                        style={{ marginTop: 16 }}
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
})

export default Profile;