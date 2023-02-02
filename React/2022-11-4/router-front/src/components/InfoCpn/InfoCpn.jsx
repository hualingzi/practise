import React, { useEffect, useState } from 'react'
import InfoCpnStyle from './InfoCpn.module.scss'
import { Button } from 'antd';


export default function InfoCpn (props) {
    useEffect(() => {
        console.log(props);

    }, [])

    let { isShow, info, closeInfo } = props
    if (isShow) {
        return (
            <div className={InfoCpnStyle.maxbox}>
                <div className={InfoCpnStyle.minbox}>
                    <div className={InfoCpnStyle.header}>
                        <div className={InfoCpnStyle.avatar}>
                            <div className={InfoCpnStyle.avatarimg}>
                                <img src={info.imgUrl} alt="" />
                            </div>
                            <div className={InfoCpnStyle.avatartext}>
                                <span>
                                    {info.author}
                                </span>
                            </div>
                            <div>
                                <Button type="primary">关注</Button>
                            </div>
                        </div>
                    </div>
                    <div className={InfoCpnStyle.main}>
                        <div className={InfoCpnStyle.mainimg}>
                            <img src={info.imgUrl} alt={info.name} />
                        </div>
                    </div>
                    <div className={InfoCpnStyle.footer}>
                        <h1>
                            {info.name}
                        </h1>
                    </div>
                    <div onClick={() => closeInfo()} className={InfoCpnStyle.xStyle} >×</div>
                </div>
            </div>
        )
    }
}
