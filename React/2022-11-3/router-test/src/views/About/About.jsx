import React from 'react'
import {
    useLocation
} from 'react-router-dom'
export default function About (props) {
    const router = useLocation()
    console.log(router);
    return (
        <div>About</div>
    )
}
