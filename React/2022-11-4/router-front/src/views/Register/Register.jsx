import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import axios from '../../netWork';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import RegisterStyle from './Register.module.scss'
export default function Register () {
    const router = useNavigate()
    const toLogin = () => {
        router('/login')
    }
    const onFinish = (values) => {
        // delete values.confirmPassword
        console.log('Success:', values);
        axios({
            url: '/registered',
            method: 'post',
            data: values
        }).then(res => {
            console.log(res);
            if (res.code === 200) {
                message.success('注册成功');
                router('/login')
            }
            // if (res.code === 500) {
            //     message.success('注册失败(账号已注册)');
            // }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={RegisterStyle.register}>
            <div className={RegisterStyle.leftimg}>
                <img src={require('../../img/login/login.jpg')} alt="" />
            </div>
            <div className={RegisterStyle.card}>
                <div className={RegisterStyle.tabs}>
                    <span>注 册</span>
                </div>
                <div className={RegisterStyle.user}>
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
                            label=""
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                                { pattern: /^[^\s]*$/, message: '禁止输入空格！' },
                                { min: 2, max: 8, message: '用户名长度在 6 到 20 个字符' },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="用户名" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
                        </Form.Item>
                        <Form.Item
                            label=""
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                    message: '请确认密码!',
                                },
                                ({ getFieldValue }) => ({
                                    validator (_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject(new Error('两次输入的密码不一致'))
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                注 册
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className={RegisterStyle.actions}>
                        <div>
                            <span>
                                已有账号？
                                <a onClick={toLogin}>登录</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
