import React from 'react'
import { Button, Form, Input } from 'antd';
import axios from '../../netWork';

export default function Login () {
    const onFinish = (values) => {
        // console.log('Success:', values);
        axios({
            url: './login',
            method: 'post',
            data: values
        }).then(res => {
            console.log(res);
            if (res.code === 200) {
                localStorage.setItem('token', res.token)
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="账号"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
