import React, { Component } from 'react'
import axios from 'axios'
import {Button} from 'antd'
export default class Home extends Component {
    state = {
        dataList :[]
    }
    render() {
        return (
            <div>
                <Button type="primary" onClick={()=>this.handleAdd()}>添加</Button>
                <Button type="primary" onClick={()=>this.handleUpdate()}>更新</Button>
            </div>
        )
    }
    componentDidMount(){
        /* axios.get('/user/getUserInfo').then(res=>{
            console.log(res.data)
            this.setState({
                dataList:res.data
            })
        }) */
        
    }
    /* handleAdd(){
        axios.post('/user/addUser',{
            username:"hh",
            rolename:"管理员",
            age:25,
            roleType:2,
            password:123,
            status:true,
            default:false
        }).then(res=>{
            console.log(res.data)
        })
    } */
    /* handleUpdate(){
        axios.post('/user/updateUser',{
            id : "5f9a89856fa77353e4f69959",
            username:"haha",
            rolename:"管理员",
            age:27,
            roleType:2,
            password:123,
            status:true,
            default:false
        }).then(res=>{
            console.log(res.data)
        })
    } */
}
