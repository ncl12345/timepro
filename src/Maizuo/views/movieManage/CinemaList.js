import React, { Component } from 'react'
import {
  Table
} from 'antd';

const columns = [{
    title: '电影',
    dataIndex: 'name',
  },
  {
    title: '地点',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: '评分',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: '场次',
    dataIndex: 'NearestShowtimeCount',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [{
    key: '1',
    name: '一点就到家',
    NearestShowtimeCount:35,
    chinese: '万达影城',
    math: 86,
    english: 70,
  },
  {
    key: '2',
    name: '月半爱丽丝',
    NearestShowtimeCount: 8,
    chinese: '中影华晨影院',
    math: 91,
    english: 89,
  },
  {
    key: '3',
    name: '风平浪静',
    chinese: '华美影城',
    NearestShowtimeCount: 10,
    math: 76,
    english: 70,
  },
  {
    key: '4',
    name: '我和我的家乡',
    NearestShowtimeCount: 15,
    chinese: '北联影城',
    math: 96,
    english: 89,
  },
];
function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}
export default class CinemaList extends Component {
  render() {
    return (
      <div>
        < Table columns = {
          columns
        }
        dataSource = {
          data
        }
        onChange = {
          onChange
        }
        />
      </div>
    )
  }
}