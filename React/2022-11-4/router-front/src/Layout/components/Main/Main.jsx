import React from 'react'
import {
    Route,
    Routes,
} from 'react-router-dom'
import mainStyle from './Main.module.scss'
export default function Main (props) {
    return (
        <div className={mainStyle.maxbox}>
            <Routes>
                {
                    props.routes.map(item => <Route exact key={item.path} path={item.path} element={item.component} />)
                }
            </Routes>
        </div>
    )
}
