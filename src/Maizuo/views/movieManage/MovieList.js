import React, { Component } from 'react'
import {
  Table,
  Tag,
  Space,
  Button, message
} from 'antd';
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
      nowData: [],
      downAll:[],
      key:1
    }
  nowColumns = [
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
      title: 'N场',
      dataIndex: 'NearestShowtimeCount',
      key: 'NearestShowtimeCount',
  },
  {
      title: '评分',
      key: 'r',
      dataIndex: 'r',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
     render: item => {
        // var colroList = ["green","skyblue","red"]
        return <Tag color={item>80?"red":item>60?"green":"skyblue"}>{item}</Tag>
                  }
  },
  {
    title: 'Action',
    key: 'action',
    render: (item) => (
      <Space size="middle">
        <Button  onClick={()=>this.updateNow(item)} >更新</Button>
        <Button  onClick={()=>this.commentNow(item)} >评论</Button>

        <Button  onClick={()=>this.daleteNow(item)} danger>下架</Button>
      </Space>
    ),
  },
];

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
      // render:(grade)=>{
      //           var colroList = ["green","skyblue","red"]
      //           return <Tag color={colroList[grade-1]}>{grade}</Tag>
      //         }
      render: item => {
        // var colroList = ["green","skyblue","red"]
        return <Tag color={item>80?"red":item>60?"green":"skyblue"}>{item}</Tag>
                  }
    },
  {
    title: 'Action',
    key: 'action',
    render: (item) => (
      <Space size="middle">
        <Button  onClick={()=>this.updateComing(item)} >更新</Button>
        <Button  onClick={()=>this.comingComment(item.id)}>评论</Button>
        <Button  onClick={()=>this.showComing(item)} danger>上架</Button>
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
                this.state.downAll
              }
              />
          </TabPane>
        </Tabs>
        } 
        
      </div>
    )

  }


 

  componentDidMount() {
    //即将播放
    axios.get('/detail/comingsoonAll').then(
      res=>{
        this.setState({
          comingData: res.data
        })
      }
    )
    console.log(this.props.isShow,'uuu')
    //热播
    axios.get('/detail/nowplayingAll').then(
      res => {
      console.log(res,'res')
        this.setState({
          nowData: res.data
        })
      }
    )
    //下架
    axios.get('/detail/downAll').then(
      res => {
        this.setState({
          downAll: res.data
        })
      }
    )
  }
  updateNow(item) {
    this.props.history.push(`/movie-manage/updata/${item._id}`)
  }
  daleteNow(item) {
    axios.get(`/detail/down?id=${item._id}`).then(res => {
      
    })
    axios.get('/detail/comingsoonAll').then(
      res => {
        this.setState({
          comingData: res.data
        })
      }
    )
    console.log(this.props.isShow, 'uuu')
    //热播
    axios.get('/detail/nowplayingAll').then(
      res => {
        console.log(res, 'res')
        this.setState({
          nowData: res.data
        })
      }
    )
    //下架
    axios.get('/detail/down?id=${item._id}').then(
      res => {
          if (res.data.code == 1) {
            message.success({
              content: '提交成功!'
            })
          } else {
            message.success({
              content: '提交失败!'
            })
          }
          axios.get('/detail/comingsoonAll').then(
            res => {
              this.setState({
                comingData: res.data
              })
            }
          )
          console.log(this.props.isShow, 'uuu')
          //热播
          axios.get('/detail/nowplayingAll').then(
            res => {
              console.log(res, 'res')
              this.setState({
                nowData: res.data
              })
            }
          )
          //下架
          axios.get('/detail/downAll').then(
            res => {
              this.setState({
                downAll: res.data
              })
            }
          )
      }

    )
  }
  commentNow(item) {
    console.log('commentNowUpdata', item)
  }
  comingComment(item) {
    console.log('handleComingComment', item)
  }
  updateComing(item) {
    this.props.history.push(`/movie-manage/updata/${item._id}`)
  }
  showComing(item) {
      
    axios.get(`/detail/up?id=${item._id}`).then(res => {
      if (res.data.code == 1) {
        message.success({
          content: '提交成功!'
        })
      } else {
        message.success({
          content: '提交失败!'
        })
      }
      axios.get('/detail/comingsoonAll').then(
        res => {
          this.setState({
            comingData: res.data
          })
        }
      )
      console.log(this.props.isShow, 'uuu')
      //热播
      axios.get('/detail/nowplayingAll').then(
        res => {
          console.log(res, 'res')
          this.setState({
            nowData: res.data
          })
        }
      )
      //下架
      axios.get('/detail/downAll').then(
        res => {
          this.setState({
            downAll: res.data
          })
        }
      )
    })
    
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