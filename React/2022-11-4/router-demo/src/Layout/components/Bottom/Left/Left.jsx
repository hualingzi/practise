import React, { useState, useEffect } from 'react'
import LeftStyle from './Left.module.scss'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Left (props) {
    const router = useNavigate()
    const route = useLocation()
    const [sibelData, setSibelData] = useState([])
    useEffect(() => {
        let data = props.routes.splice(1)
        setSibelData(data)
    }, [])

    const toPage = (val) => {
        router(val)
    }
    return (
        <div className={LeftStyle.maxbox}>
            <ul>
                {sibelData && sibelData.map(item =>
                    <li className={item.path === route.pathname ? LeftStyle.active : ''}
                        onClick={() => toPage(item.path)}
                        key={item.path}>{item.mata.title}
                    </li>)}
            </ul>
        </div>
    )
}
