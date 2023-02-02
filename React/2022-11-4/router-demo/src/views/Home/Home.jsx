import React, { useState, useEffect } from 'react'
import * as echarts from 'echarts';
import axios from '../../netWork'
import HomeStyle from './Home.module.scss'

export default function Home () {

    useEffect(() => {
        creatEcherts()
    })

    const creatEcherts = () => {
        var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom);
        var option;
        option = {
            title: {
                text: '浏览量与点赞量',
            },

            tooltip: {
                trigger: 'axis',
            },

            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['浏览量', '点赞']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: [
                {
                    name: '浏览量',
                    type: 'bar',
                    yAxisIbdex: 1,
                    data: []
                },
                {
                    name: '点赞',
                    type: 'bar',
                    yAxisIbdex: 2,
                    data: [],
                },
            ]
        };
        myChart.showLoading();

        axios({
            url: "/picture/check",
            method: "get",
            params: {
                pageNum: 1,
                pageSize: 99
            }
        }).then(res => {
            if (res.code === 200) {
                let xList = []
                let yList = []
                let zList = []
                console.log(res);
                res.results.map(item => {
                    xList.push(item.name)
                    yList.push(item.views)
                    zList.push(item.stars)
                })
                myChart.hideLoading(); //隐藏加载动画
                myChart.setOption({ //加载数据图表
                    xAxis: {
                        data: xList
                    },
                    series: [{
                        // 根据名字对应到相应的系列
                        name: '浏览量',
                        data: yList
                    },
                    {
                        // 根据名字对应到相应的系列
                        name: '点赞',
                        data: zList
                    }]
                });
            }
        })

        option && myChart.setOption(option);
    }

    return (
        <div className={HomeStyle.table}>
            <div id="main" style={{ width: "100%", height: "500px" }} >
            </div>
        </div>
    )
}


