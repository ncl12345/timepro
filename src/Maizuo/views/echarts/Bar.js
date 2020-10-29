import React, { Component } from 'react'
import echarts from 'echarts'

export default class Bar extends Component {
    myChart=null
    state={
        info:[{
                    name: 'Forest',
                    type: 'bar',
                    barGap: 0,
                    // label: labelOption,
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: 'Steppe',
                    type: 'bar',
                    // label: labelOption,
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: 'Desert',
                    type: 'bar',
                    // label: labelOption,
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: 'Wetland',
                    type: 'bar',
                    // label: labelOption,
                    data: [98, 77, 101, 99, 40]
                }
            ]
    }
    render() {
        return (
            < div id = 'main'
            style = {
                {
                    width: '95%',
                    height: '95%',
                    background: '#1f1f1f',
                    margin:'auto'
                }
            } >
                Bar
            </div>
        )
    }
    componentDidMount() {
        
        var app={}
        this.myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
        ];

        app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
            },
            verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
            },
            position: {
                options: echarts.util.reduce(posList, function (map, pos) {
                    map[pos] = pos;
                    return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
        };

        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                this.myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }]
                });
            }
        };


        var labelOption = {
            show: true,
            position: app.config.position,
            distance: app.config.distance,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            rotate: app.config.rotate,
            formatter: '{c}  {name|{a}}',
            fontSize: 16,
            rich: {
                name: {
                    textBorderColor: '#fff'
                }
            }
        };

        var option = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                data: ['2012', '2013', '2014', '2015', '2016'],
                axisLine: {
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
            }],
            yAxis: [{
                type: 'value'
            }],
            series:this.state.info
        };

        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
        window.onresize = ()=>{
            console.log(13)
            this.myChart.resize()
        }
    }
    
}
