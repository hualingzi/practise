import React, { Component } from 'react'
import CpnTwo from './CpnTwo.module.scss'

export default class CpnTwo extends Component {
    render () {
        let { isShow } = this.props
        if (isShow) {
            return (
                <div>注册</div>
            )
        }

    }
}
