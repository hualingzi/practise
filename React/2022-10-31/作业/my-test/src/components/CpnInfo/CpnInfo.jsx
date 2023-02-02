import React, { Component } from 'react'
import CpnInfoStyle from './CpnInfo.module.scss'

export default class CpnInfo extends Component {
    render () {
        let { isShow, info, closeInfo } = this.props
        if (isShow) {
            return (
                <div className={CpnInfoStyle.MaxBox}>
                    <div className={CpnInfoStyle.MinBox}>
                        <img src={info.roleThumbnail} alt={info.roleName} />
                        <div>
                            <p>神奇宝贝:<span>{info.roleName}</span></p>
                            <p>属性:<span dangerouslySetInnerHTML={{ __html: info.roleSeries }}></span></p>
                        </div>
                        <div onClick={() => closeInfo()} className={CpnInfoStyle.xStyle} >×</div>
                    </div>
                </div >
            )
        }
    }
}
