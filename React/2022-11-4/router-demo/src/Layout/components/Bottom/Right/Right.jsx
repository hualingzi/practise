import React from 'react'
import RightStyle from './Right.module.scss'
import {
    Route,
    Routes,
} from 'react-router-dom'
export default function Right (props) {
    return (
        <div className={RightStyle.maxbox}>
            <Routes>
                {
                    props.routes.map(item => <Route exact key={item.path} path={item.path} element={item.component} />)
                }
            </Routes>
        </div>
    )
}
