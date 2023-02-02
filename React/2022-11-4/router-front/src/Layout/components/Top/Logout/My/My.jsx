import React from 'react'
import { Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

export default function My () {
    const router = useNavigate()
    const toLogin = () => {
        localStorage.removeItem('token')
        router('/login')
    }
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    我的
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    我的收藏
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    修改个人信息
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    修改密码
                </a>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '5',
            label: (
                <a onClick={toLogin}>
                    退出
                </a>
            ),
        },
    ];
    return (
        <div >
            <Dropdown
                menu={{
                    items,
                }}
            >
                <UserOutlined />
            </Dropdown>
        </div>
    )
}
