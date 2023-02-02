import React from 'react'
import boottomStyle from './Bottom.module.scss'

export default function Bottom () {
    return (
        <div className={boottomStyle.maxbox}>
            <div>
                <a href="">
                    使用条款
                </a>
                <a href="">
                    隐私政策
                </a>
                <a href="">
                    内容指引
                </a>
                <a href="">
                    网站反馈
                </a>
                <a href="">
                    常见问题
                </a>
            </div>
            <p>
                Copyright © 2022
                <a href="/">Skypixel.com</a>
                天空之城 版权所有
            </p>
            <p>
                <a href="">粤ICP备2022092332号</a>
            </p>
        </div>
    )
}
