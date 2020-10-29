import React, { Component } from 'react'
import {Button, Switch, Table,Modal,Form,Select,Input} from 'antd'
import axios from 'axios'
const {Option} = Select

export default class Users extends Component {
    state = {
        dataList:[],
        rolesList:[],
        visibleAdd:false
    }
    addForm = React.createRef()
    updateForm = React.createRef()
    currentUpdate = null//记录正在更新的item
    columns = [
    {
        title: '角色名称',
        dataIndex: 'rolename',
        filters: [
            {
                text: '超级管理员',
                value: '超级管理员',
            },
            {
                text: '管理员',
                value: '管理员',
            },
            {
                text: '普通用户',
                value: '普通用户',
            },
        ],
        onFilter: (value, record) => {
          return   record.rolename.indexOf(value) === 0
        }
    },
    {
        title:"用户名",
        dataIndex:'username'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title:"用户状态",
        render:(item)=>{
            return <Switch checked={item.status} disabled={item.default} onChange={()=>this.handleSwitchChange(item.id)}></Switch>
        }

    },
    {
        title : "操作",
        render:(item)=>{
            return <div>
                <Button shape="round" onClick={()=>this.handleUpdateButton(item)}>编辑</Button>
                <Button danger shape="round" onClick={()=>this.handleDelete(item.id)}>删除</Button>
            </div>
        }
    }
    ];
    render() {
        return (
            <div>
                <Button type="primary" shape="round" onClick={()=>this.handleAddButton()}>添加用户</Button>
                <input type="text" placeholder="请输入用户名"></input>
                <Table columns={this.columns} dataSource={this.state.dataList} rowKey={(item)=>item.id} onChange={()=>this.onChange} />
                <Modal
                    title="添加用户"
                    onText="确定"
                    cancelText="取消"
                    visible={this.state.visibleAdd}
                    onOk={this.handleAddOk}
                    onCancel={()=>{
                        this.setState({
                            visibleAdd : false
                        })
                    }}
                    >
                    <Form
                        // 使用ref实例获取到输入的值
                        ref={this.addForm}
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                        <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            name="age"
                            label="年龄"
                            rules={[{ required: true, message: '年龄不能为空' }]}
                        >
                        <Input type="text"/>
                        </Form.Item>
                        <Form.Item
                            name="roleType"
                            label="角色"
                            rules={[{ required: true, message: '请选择一个角色' }]}
                        >
                        <Select>
                            {
                            this.state.rolesList.map(item=>
                            <Option key={item.id} value={item.roleType}>{item.rolename}</Option>)
                            }
                        </Select>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* 编辑模态框 */}
                <Modal
                    title="编辑用户"
                    onText="确定"
                    cancelText="取消"
                    visible={this.state.visibleUpdate}
                    onOk={this.handleUpdateOk}
                    onCancel={()=>{
                        this.setState({
                            visibleUpdate : false
                        })
                    }}
                    >
                    <Form
                        // 使用ref实例获取到输入的值
                        ref={this.updateForm}
                        layout="vertical"
                        name="form_in_modal"
                    >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '用户名不能为空' }]}
                        >
                        <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required: true, message: '密码不能为空' }]}
                        >
                        <Input type="password"/>
                        </Form.Item>
                        <Form.Item
                            name="age"
                            label="年龄"
                            rules={[{ required: true, message: '年龄不能为空' }]}
                        >
                        <Input type="text"/>
                        </Form.Item>
                        <Form.Item
                            name="roleType"
                            label="角色"
                            rules={[{ required: true, message: '请选择一个角色' }]}
                        >
                        <Select>
                            {
                            this.state.rolesList.map(item=>
                            <Option key={item.id} value={item.roleType}>{item.rolename}</Option>)
                            }
                        </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
    onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    componentDidMount(){
        axios.get('http://localhost:5001/users').then(res=>{
            //console.log(res.data)
            this.setState({
                dataList:res.data
            })
        })

        axios.get('http://localhost:5001/roles').then(res=>{
           // console.log(res.data)
            this.setState({
                rolesList : res.data
            })
        })
    }
    //删除操作
    handleDelete(id){  
        //在页面删除
        this.setState({
            dataList : this.state.dataList.filter((item)=>item.id !==id)
        })
        //在数据库中删除
        axios.delete(`http://localhost:5001/users/${id}`)
    }
    //添加用户按钮
    handleAddButton(){
        this.setState({
            visibleAdd : true
        })
    }
    //添加模态框中的确定
    handleAddOk = ()=>{
        this.addForm.current.validateFields().then(values=>{
            let {username,roleType,age,password} = values
            //根据roleType找到对应的rolename
            let rolename = this.state.rolesList.filter(item=>item.roleType === roleType)[0].rolename

            this.setState({
                visibleAdd:false
            })
            //添加数据
            axios.post('http://localhost:5001/users',{
                username,
                rolename,
                age,
                roleType,
                password,
                status:true,
                default:false
            }).then(res=>{
                //获取到新添加的数据的完整信息（包括id）
                //console.log("我是添加的数据",res.data)
                this.setState({
                    dataList : [...this.state.dataList,res.data]
                })
            })
            //清空输入框的值
            this.addForm.current.resetFields()
        })
    }
    //编辑用户按钮--点击后数据回显
    handleUpdateButton(item){
        this.currentUpdate = item
        let {username , age,roleType,password} = item
        //点击更新时，要保证先创建模态框再去获取实例
        setTimeout(()=>{
            //创建模态框
            this.setState({
                visibleUpdate:true
            })
            //获取实例并设置初始值(数据回显)
            this.updateForm.current.setFieldsValue({
                username,
                age,
                roleType,
                password
            },0)
        })
    }
    //编辑模态框中的确定
    handleUpdateOk = ()=>{
        this.updateForm.current.validateFields().then(values=>{
            let rolename = this.state.rolesList.filter(item=>item.roleType===values.roleType)[0].rolename
            //更新页面数据
            this.setState({
                dataList:this.state.dataList.map(item=>{
                    if(item.id===this.currentUpdate.id){
                       return {
                        ...item,
                        ...values,
                        rolename
                       }
                    }
                    return item
                }),
                visibleUpdate:false
            })
            //更新数据库
            axios.put(`http://localhost:5001/users/${this.currentUpdate.id}`,{
                ...this.currentUpdate,
                ...values,
                rolename
            })
        })
    }
    //控制状态
    handleSwitchChange(id){
        //在页面上进行修改
        this.setState({
            dataList:this.state.dataList.map(item=>{
                if(item.id===id){
                    //不能改变原状态，先将所点击的这一项展开，将状态取反在return出去 
                    return {
                        ...item,
                        status : !item.status
                    }
                }
                //id不匹配的原样返回
                return item
            })
        })
        //在数据库中进行修改
        //根据id找到当前操作的那项
        let item = this.state.dataList.filter(item=>item.id===id)[0]
        axios.put(`http://localhost:5001/users/${id}`,{
            ...item,
            status : !item.status
        })
    }
}
