import React from 'react'
import { Dropdown } from 'antd';
import { BellOutlined, LikeOutlined, MessageOutlined, UserAddOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';

export default function Info () {
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    点赞
                </a>
            ),
            icon: <LikeOutlined />
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    评论
                </a>
            ),
            icon: <MessageOutlined />
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    关注
                </a>
            ),
            icon: <UserAddOutlined />
        },
        {
            key: '4',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    收藏
                </a>
            ),
            icon: <StarOutlined />
        },
        {
            key: '5',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    通知
                </a>
            ),
            icon: <BellOutlined />
        },
        {
            key: '6',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    私信
                </a>
            ),
            icon: <CommentOutlined />
        },
    ];
    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
            >
                <BellOutlined />
            </Dropdown>
        </div>
    )
}
