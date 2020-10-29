import axios from 'axios';
import React, { Component } from 'react'
import RightListAction from '../../redux/actionCreator/RightListAction'
import {Tag,Button,Table} from 'antd'
import { connect } from 'react-redux';

class Rigins extends Component {
    render() {
        const columns = [
            //form表单在底层自己做好了map，因此直接指定每次遍历时需要的值就行
            {
              title: '#',
              dataIndex: 'id'//数据库中的字段名
            },
            {
              title: '权限名称',
              dataIndex: 'title'
            },
            {
              title: '权限等级',
              dataIndex: 'grade',
              //使用render可以做定制化需求，return后跟啥即返回啥
              render:(grade)=>{
                var colroList = ["green","skyblue","red"]
                return <Tag color={colroList[grade-1]}>{grade}</Tag>
              }
            },
            {
              title: '操作',
              dataIndex: '',
              render:(item)=>{
                return <div>
                  <Button danger onClick={()=>this.handleDelete(item.id)}>删除</Button>
                  <Button type="primary">更新</Button>
                </div>
              }
            },
          ];
        return (
            <div>
               <Table columns={columns} dataSource={this.props.list} rowKey={(item)=>item.id} pagination={
                {//pagination是Table的属性，pageSize是pagination的属性，因此要套两层
                    pageSize : 5
                }
                }/>
            </div>
        )
    }
    componentDidMount(){
        if(this.props.list.length===0){
          this.props.RightListAction()
        }else{
          this.setState({
            list :this.props.list
          })
        }
    }

    handleDelete(id){
        //页面删除
        this.setState({
            list : this.props.list.filter(item=>item.id !==id)
        })
        //数据库中删除
        axios.delete(`http://localhost:5001/rights/${id}`)
    }

}

const mapStateToProps = (storeState)=>{
  return {
    list :storeState.RightListReducer.List
  }
}

const mapDispatchToProps = {
  RightListAction
}
export default connect(mapStateToProps,mapDispatchToProps)(Rigins)
