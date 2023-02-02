import React from 'react'
import { Button, Form, Input, message } from 'antd';
import axios from '../../netWork';
import { useNavigate } from 'react-router-dom'
import LoginStyle from './Login.module.scss'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login () {
    const router = useNavigate()
    const toRegister = () => {
        router('/register')
    }
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
                message.success('登录成功');
                router('/')
            } else {
                message.error('用户名或密码错误');
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={LoginStyle.login}>
            <div className={LoginStyle.leftimg}>
                <img src={require('../../img/login/login.jpg')} alt="" />
            </div>
            <div className={LoginStyle.card}>
                <div className={LoginStyle.tabs}>
                    <span>登 录</span>
                </div>
                <div className={LoginStyle.user}>
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
                                    message: '用户名不能为空!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="用户名/邮箱/手机号" />
                        </Form.Item>

                        <Form.Item
                            label=""
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '密码不能为空!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
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
                    <div className={LoginStyle.actions}>
                        <div>
                            <span>
                                <a href="">
                                    忘记密码
                                </a>
                            </span>
                        </div>
                        <div>
                            <span>
                                还没有账号？
                                <a onClick={toRegister}>注册</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
