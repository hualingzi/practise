import React, { Component } from 'react'
import * as echarts from 'echarts';
export default class CpnEcherts extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        this.creatEcherts()
    }
    creatEcherts = () => {
        let { xList, yList } = this.props
        var chartDom = document.getElementById('ech');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                data: xList
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yList,
                    type: 'bar'
                }
            ]
        };

        option && myChart.setOption(option);

    }
    render () {
        return (
            <div>
                <div id="ech" style={{ width: "1000px", height: "500px" }}>
                </div>
            </div>
        )
    }
}
