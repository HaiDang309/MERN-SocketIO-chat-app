import React from 'react';

import { Empty, Space } from 'antd';

import Contact from './Contact'

const ContactContainer = React.memo(props => {
    const { search } = props;
    const [user, setUser] = React.useState([]);
    React.useEffect(() => {
        window
            .fetch("http://localhost:8080/", {
                method: "GET"
            })
            .then((res) => {
                res.json()
                    .then((user) => {
                        const contact = user.user.filter(
                            (item) =>
                                item.email !==
                                window.sessionStorage.getItem("email")
                        );
                        setUser(contact);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Space direction="vertical">
            {
                !user ? <Empty description="No users are available!"/> : user.filter(item => item.username.toLowerCase().includes(search.toLowerCase())).map(item => {
                    return (<Contact username={item.username} avatar={item.avatar} id={item._id} key={item._id}/>)
                })
            }
        </Space>
    )
})

export default ContactContainer;