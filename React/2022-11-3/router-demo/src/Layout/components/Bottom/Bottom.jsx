import React from 'react'
import Left from './Left/Left'
import Right from './Right/Right'
import routes from '../../../router/index'
import BootomStyle from './Bootom.module.scss'
export default function Bottom () {
    return (
        <div className={BootomStyle.maxbox}>
            <Left routes={[...routes]}/>
            <Right routes={[...routes]} />
        </div>
    )
}
