import React from 'react'
import topStyle from './Top.module.scss'
import { useNavigate } from 'react-router-dom'
export default function Top () {
    const router = useNavigate()
    const toLogin = () => {
        localStorage.removeItem('token')
        router('/login')
    }
    return (
        <div className={topStyle.maxbox}>
            <div>发发管理系统</div>
            <div onClick={toLogin}>退出</div>
        </div>
    )
}
