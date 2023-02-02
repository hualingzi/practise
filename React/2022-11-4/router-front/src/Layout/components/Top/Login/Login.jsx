import React from 'react'
import LoginStyle from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
export default function Login () {
    const router = useNavigate()
    const toLogin = () => {
        router('/login')
    }
    const toRegister = () => {
        router('/register')
    }
    return (
        <div className={LoginStyle.login}>
            <a onClick={() => toLogin()}>登录</a>
            <a onClick={() => toRegister()}>注册</a>
        </div>
    )
}
