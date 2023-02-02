import React from 'react'
import topStyle from './Top.module.scss'
import { useNavigate } from 'react-router-dom'
export default function Top () {
    const router = useNavigate()
    const toLogin = () => {
        localStorage.removeItem('token')
        router('/login')
    }
    const toHome = () => {
        window.location.href = 'http://localhost:3002/home';
    }
    return (
        <div className={topStyle.maxbox}>
            <div>天空之城管理系统</div>
            <div >
                <span onClick={toHome}>官网</span>
                <span onClick={toLogin}>退出</span>
            </div>
        </div>
    )
}
