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
    title: 'N场',
    dataIndex: 'NearestShowtimeCount',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];

const data = [{
    key: '1',
    name: 'John Brown',
    NearestShowtimeCount:2,
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    NearestShowtimeCount: 5,
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    NearestShowtimeCount: 1,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    NearestShowtimeCount: 10,
    chinese: 88,
    math: 99,
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