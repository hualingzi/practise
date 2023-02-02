import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
    SearchOutlined
} from '@ant-design/icons';
import topStyle from './Top.module.scss'
import Login from './Login/Login'
import Logout from './Logout/Logout';

export default function Top (props) {
    const router = useNavigate()
    const route = useLocation()
    const [sibelData, setSibelData] = useState([])
    let [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        let data = props.routes.splice(1)
        setSibelData(data)
        if (localStorage.getItem('token')) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])
    const toPage = (val) => {
        router(val)
    }
    return (
        <div className={topStyle.maxbox}>

            <div className={topStyle.logo}>
                <img src="https://spcn-webfront.skypixel.com/skypixel/v2/public/assets/images/logo-cn.00c32c62.svg" alt="" />
            </div>
            <ul>
                {sibelData && sibelData.map(item =>
                    <li className={item.path === route.pathname ? topStyle.active : ''}
                        onClick={() => toPage(item.path)}
                        key={item.path}>{item.mata.title}
                    </li>)}
            </ul>
            <div className={topStyle.right}>
                <div className={topStyle.seach}>
                    <input type="text" placeholder='Seach' />
                    <SearchOutlined />
                </div>
                {isLogin ? <Logout /> : <Login />}
            </div>
        </div>

    )
}
