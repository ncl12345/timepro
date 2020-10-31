import React, { Component } from 'react'
import echarts from 'echarts'
import axios from 'axios'



export default class Pai extends Component {
    render() {
        return (
            <div id='main' 
            style = {
                {
                    width: '95%',
                    height: '95%',
                    background: '#1f1f1f',
                    margin: 'auto',
                    color:'#ccc'
                }
            }
            >
            </div>
        )
    }
    componentDidMount() {
        axios.get('/cinema/getCinema').then(res=>{
            console.log(res.data)
            this.initPaiEChart(res.data)
        })
         window.onresize = () => {
             console.log(13)
             this.myChart.resize()
         }
    }
    initPaiEChart(dataInfo){
        this.myChart = echarts.init(document.getElementById('main'));
       var data = dataInfo.map(item=>item.number)
            var cities = dataInfo.map(item=>item.city);
            var barHeight = 50;

        let option = {
        title: {
            text: '全国票房分析',
            subtext: '谁最喜欢看电影'
        },
        legend: {
            show: true,
            data: ['价格范围', '均值']
        },
        grid: {
            top: 100
        },
        angleAxis: {
            type: 'category',
            data: cities,
            startAngle:90,
            interval:100,
            axisLine:{
                lineStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [{
                            offset: 0,
                            color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'black' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                }
            },
            textStyle: {
                // color: function (value, index) {
                //     return value >= 0 ? 'green' : 'red';
                // }
            }
        },
        tooltip: {
            show: true,
            formatter: function (params) {
                var id = params.dataIndex;
                return cities[id] + '<br>最低：' + data[id][0] + '<br>最高：' + data[id][1] + '<br>平均：' + data[id][2];
            }
        },
        radiusAxis: {
        },
        polar: {
        },
        series: [{
            type: 'bar',
            itemStyle: {
                color: 'transparent'
            },
            data: data.map(function (d) {
                return d[0];
            }),
            coordinateSystem: 'polar',
            stack: '最大最小值',
            silent: true
        }, {
            type: 'bar',
            data: data.map(function (d) {
                return d[1] - d[0];
            }),
            coordinateSystem: 'polar',
            name: '价格范围',
            stack: '最大最小值'
        }, {
            type: 'bar',
            itemStyle: {
                color: 'transparent'
            },
            data: data.map(function (d) {
                return d[2] - barHeight;
            }),
            coordinateSystem: 'polar',
            stack: '均值',
            silent: true,
            z: 10
        }, {
            type: 'bar',
            data: data.map(function (d) {
                return barHeight * 2;
            }),
            coordinateSystem: 'polar',
            name: '均值',
            stack: '均值',
            barGap: '-100%',
            z: 10
        }]
    };
    this.myChart.setOption(option);
    }
    
}
