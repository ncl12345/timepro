import React, { Component } from 'react'
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: '影片名',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: '导演',
    dataIndex: 'director',
    key: 'director',
  },
  {
    title: '主演',
    dataIndex: 'actor',
    key: 'actor',
  },
  {
      title: '卖票',
      dataIndex: 'ticket',
      key: 'ticket',
  },
  {
    title: '评分',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a >Delete</a>
      </Space>
    ),
  },
];

const data = [{
        name:'wohe',
        key: '1',
        ticket: 'John Brown',
        actor: 32,
        director: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        name: 'wohe',
        key: '2',
        ticket: 'Jim Green',
        actor: 42,
        director: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        name: 'wohe',
        key: '3',
        actor: 'Joe Black',
        ticket: 32,
        director: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
export default class MovieList extends Component {
    render() {
        return (
            <Table columns={columns} dataSource={data} />
        )
    }
}
