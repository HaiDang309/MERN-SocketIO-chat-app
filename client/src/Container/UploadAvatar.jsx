import React from "react";

import { Space, Avatar, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const UploadAvatar = React.memo((props) => {
    const { currentAvatar } = props;
    const [avatar, setAvatar] = React.useState("");
    const loadImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function () {
                window.sessionStorage.setItem('avatar', reader.result);
                setAvatar(reader.result);
            };
        }
        reader.readAsDataURL(event.target.files[0]);
    };
    return (
        <div style={{ textAlign: "center" }}>
            <Space
                size={2}
                direction="vertical"
                align="center"
                style={{ marginBottom: 16 }}
            >
                <label for="avatar">
                    <Avatar
                        style={{
                            boxShadow:
                                "8px 8px 24px rgba(0,0,0,0.1), -8px 8px 24px rgba(0,0,0,0.1)",
                            cursor: "pointer"
                        }}
                        icon={<PlusOutlined />}
                        src={avatar || currentAvatar}
                        alt=""
                        size={38}
                    />
                </label>
                <form>
                    <input
                        onChange={(e) => loadImg(e)}
                        style={{ display: "none" }}
                        id="avatar"
                        type="file"
                    />
                </form>
                <Typography.Text>Select Avatar</Typography.Text>
            </Space>
        </div>
    );
});

export default UploadAvatar;
