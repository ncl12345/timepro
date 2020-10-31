import React, { Component } from 'react'
import { Table, Tag, Space,Button } from 'antd';
import {Tabs} from 'antd'
import { withRouter } from 'react-router-dom';
import MovieTabsAction from '../../redux/actionCreator/MovieTabsAction'
import axios from 'axios'
import {
  connect
} from 'react-redux';
const {
  TabPane
} = Tabs;
 class MovieList extends Component {
    state={
      comingData:[],
      nowDate:[],
      key:1
    }
    nowColumns = [ {
      title: '影片名',
      
      dataIndex: 'ssname',
      key: 'ssname',
      render: text => <a>{text}</a>,
    }]
  nowColumns = [
  {
    title: '影片名',
    
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
    // width:,
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
      title: 'N场',
      dataIndex: 'NearestShowtimeCount',
      key: 'NearestShowtimeCount',
  },
  {
    title: '评分',
    key: 'tags',
    dataIndex: 'tags',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
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
    render: (item) => (
      <Space size="middle">
        <Button  onClick={()=>this.updateNow(item.id)} >更新</Button>
        <Button  onClick={()=>this.commentNow(item.id)} >评论</Button>

        <Button  onClick={()=>this.daleteNow(item.id)} danger>下架</Button>
      </Space>
    ),
  },
];
// export default class MovieList extends Component {
//     render() {
//         return (
//            
//         )
//     }
// }

    comingColumns = [
    {
      title: '影片名',
      dataIndex: 'title',
      key: 'title',
      render: text => <a>{text}</a>,
      // width:,
    },
    {
      title: '导演',
      dataIndex: 'directors',
      key: 'directors',
    },
    {
      title: '主演',
      dataIndex: 'actors',
      key: 'actors',
    },
    {
        title: '上映时间',
        dataIndex: 'releaseDate',
        key: 'releaseDate',
    },
    {
      title: '评分',
      key: 'r',
      dataIndex: 'r',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
      // render: tags => (
      //   <>
      //     {tags.map(tag => {
      //       let color = tag.length > 5 ? 'geekblue' : 'green';
      //       if (tag === 'loser') {
      //         color = 'volcano';
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
  {
    title: 'Action',
    key: 'action',
    render: (item) => (
      <Space size="middle">
        <Button  onClick={()=>this.updateComing(item)} >更新</Button>
        <Button  onClick={()=>this.comingComment(item.id)}>评论</Button>
        <Button  onClick={()=>this.showComing(item.id)} danger>上架</Button>
      </Space>
    ),
  },
];

  callback(key) {
    console.log(key)
    key && this.props.MovieTabsAction(key)
    
  }
  render() {
    return (
      <div>
        {
          this.props.isShow&&
          < Tabs 
        activeKey = {
          this.props.isShow
        }
        // defaultActiveKey={2}
        onChange = {
          (key) => {
            this.callback(key)}
        }
        tabPosition = "top" >
          < TabPane tab = "即将上映"
          key = "1"
          >
          <Table columns={this.comingColumns} dataSource={this.state.comingData} />
          </TabPane>
          <TabPane tab="正在热映" key="2">
              <Table columns = {
                this.nowColumns
              }
              dataSource = {
                this.state.nowData
              }
              />
          </TabPane>
          <TabPane tab="已下架" key="3">
              <Table columns = {
                this.nowColumns
              }
              dataSource = {
                this.state.nowData
              }
              />
          </TabPane>
        </Tabs>
        } 
        
      </div>
    )

  }


 

  componentDidMount() {
    axios.get('/detail/comingsoonAll').then(
      res=>{
        console.log(res,'res')
        this.setState({
          comingData: res.data
        })
      }
    )
    console.log(this.props.isShow,'uuu')
    this.setState({
      nowData: [{
          name: 'wohe',
          key: '1',
          id: 1,
          NearestShowtimeCount: 'John Brown',
          NearestShowtimeCount: 'John Brown',
          actor: 32,
          director: 'New ',
          tags: ['nice', 'developer'],
        },
        {
          name: 'wohe',
          key: '2',
          id: 1,
          NearestShowtimeCount: 'Jim Green',
          actor: 42,
          director: 'London ',
          tags: ['loser'],
        }
      ]
    })
    
  }
  updateNow(id) {
  console.log('handleNowUpdata',id)
    this.props.history.push(`/movie-manage/updata/${id}`)
  }
  daleteNow(id) {
    console.log('daleteNowUpdata',id)
  }
  commentNow(id){
    console.log('commentNowUpdata', id)
  }
  comingComment(id){
    console.log('handleComingComment', id)
  }
  updateComing(item) {
    console.log('updataNow', item)
    this.props.history.push(`/movie-manage/updata/${item._id}`)
  }
  showComing(id){
    console.log('showComingUpdata', id)
  }
}
const mapStateToProps = (storeState) => {
  console.log(storeState)
  return {
    isShow: storeState.MovieTabsReducer.isShow
    // a:1
  }
}

const mapDispatchToProps = {
  MovieTabsAction
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieList))