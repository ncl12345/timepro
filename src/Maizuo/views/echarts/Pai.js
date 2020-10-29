import React, { Component } from 'react'
import echarts from 'echarts'
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
                Pai
            </div>
        )
    }
    componentDidMount() {
           this.myChart = echarts.init(document.getElementById('main'));
           var data = [
                    [5000, 10000, 6785.71],
                    [4000, 10000, 6825],
                    [3000, 6500, 4463.33],
                    [2500, 5600, 3793.83],
                    [2000, 4000, 3060],
                    [2000, 4000, 3222.33],
                    [2500, 4000, 3133.33],
                    [1800, 4000, 3100],
                    [2000, 3500, 2750],
                    [2000, 3000, 2500],
                    [1800, 3000, 2433.33],
                    [2000, 2700, 2375],
                    [1500, 2800, 2150],
                    [1500, 2300, 2100],
                    [1600, 3500, 2057.14],
                    [1500, 2600, 2037.5],
                    [1500, 2417.54, 1905.85],
                    [1500, 2000, 1775],
                    [1500, 1800, 1650]
                ];
                var cities = ['北京', '上海', '深圳', '广州', '苏州', '杭州', '南京', '福州', '青岛', '济南', '长春', '大连', '温州', '郑州', '武汉', '成都', '东莞', '沈阳', '烟台'];
                var barHeight = 50;

            let option = {
            title: {
                text: '在中国租个房子有多贵？',
                subtext: '市中心一室月租费（数据来源：https://www.numbeo.com）'
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
                                color: 'blue' // 100% 处的颜色
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
         window.onresize = () => {
             console.log(13)
             this.myChart.resize()
         }
    }
    
}
