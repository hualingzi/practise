import React, { Component } from 'react'
import axios from '../../netWork/index'
import CpnInfo from '../../components/CpnInfo/CpnInfo'
import Echert from '../../components/CpnEcharts/CpnEcherts'
import AppStyle from './App.module.scss'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            info: {},
            isShow: false,
            echartsTrue: false,
            xList: [],
            yList: []
        }
    }
    componentDidMount () {
        this.getData()
    }
    getData = () => {
        axios({
            url: "/mydata/roles/role-info.php?goodsID=12",
            method: "get"
        }).then(res => {
            let xList = []
            let yList = []
            res.data.map(item => {
                xList.push(item.roleName)
                yList.push(item.roleSkills.length)
            })
            this.setState({
                tableData: res.data,
                xList,
                yList,
                echartsTrue: true
            })

        })
    }
    openInfo = (val) => {
        this.setState({
            info: val,
            isShow: true
        })
        console.log(val);
        this.stopMove()
    }
    closeInfo = () => {
        this.setState({
            isShow: false
        })
        this.Move()
    }

    stopMove = () => {
        let m = function (e) { e.preventDefault(); };
        document.body.style.overflow = 'hidden';
        document.addEventListener("touchmove", m, { passive: false });//禁止页面滑动
    }
    //开启页面滚动
    Move = () => {
        let m = function (e) { e.preventDefault(); };
        document.body.style.overflow = '';//出现滚动条
        document.removeEventListener("touchmove", m, { passive: true });
    }


    render () {
        let { tableData, isShow, info, xList, yList, echartsTrue } = this.state
        return (
            <div >
                <CpnInfo isShow={isShow} info={info} closeInfo={this.closeInfo} />
                <div className={AppStyle.MaxBox}>
                    <ul>
                        {tableData.map(item =>
                            <li key={item.role_id} onClick={() => this.openInfo(item)}>
                                <img src={item.roleThumbnail} alt={item.roleName} />
                                <div>
                                    <p>神奇宝贝:<span>{item.roleName}</span></p>
                                    <p>属性:<span dangerouslySetInnerHTML={{ __html: item.roleSeries }}></span></p>
                                    <p>技能:<span>{item.roleSkills}</span></p>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {
                    echartsTrue &&
                    <Echert xList={xList} yList={yList} />
                }
            </div>
        )
    }
}
