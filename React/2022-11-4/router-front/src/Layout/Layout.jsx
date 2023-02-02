import React from 'react'
import Top from './components/Top/Top'
import Main from './components/Main/Main'
import Bottom from './components/Bottom/Bottom'
import routes from '../router/index'
import LayoutStyle from './Layout.module.scss'
export default function Layout () {
    return (
        <div className={LayoutStyle.maxbox}>
            <Top routes={[...routes]}/>
            <Main routes={[...routes]}/>
            <Bottom />
        </div>
    )
}
