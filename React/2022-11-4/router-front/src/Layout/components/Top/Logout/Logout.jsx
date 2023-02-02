import React from 'react'
import LogoutStyle from './Logout.module.scss'
import My from './My/My'
import Info from './Info/Info'
export default function Logout () {
    return (
        <div className={LogoutStyle.logout}>
            <My />
            <Info/>
        </div>
    )
}
