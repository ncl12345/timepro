import React, { Component } from 'react'
import {connect} from 'react-redux'
import {
    withRouter
} from 'react-router'
import {
    Layout,
    Menu,
} from 'antd';
import {
    UserOutlined,

} from '@ant-design/icons';

const {
    SubMenu
} = Menu;
const {
    Sider
} = Layout;
const menus = [{
            path: '/home',
            name: '首页',
            permission: [1, 2, 3]
        },
        {
            path: '/user-manage', //路径不渲染但是要做key值
            name: '人员管理',
            permission: [3],
            children: [
                {
                path: '/user-manage/rights',
                name: '权限列表',
                permission: [3],
                }, 
                {
                path: '/user-manage/users',
                name: '用户列表',
                permission: [3]
            }, ]
        },
        {
            path: '/movie-manage', //路径不渲染但是要做key值
            name: '电影管理',
            permission: [3],
            children: [{
                path: '/movie-manage/manage',
                name: '电影',
                permission: [3]
            }, 
            {
                path: '/movie-manage/list',
                name: '电影列表',
                permission: [3]
            },
        ]
        },
        {
            path: '/statistical-analysis', //路径不渲染但是要做key值
            name: '统计分析',
            permission: [3],
            children: [{
                    path: '/statistical-analysis/pai',
                    name: '图',
                    permission: [3]
                },
                {
                    path: '/statistical-analysis/bar',
                    name: '表',
                    permission: [3]
                },
            ]
        }
    ]
 class SideBar extends Component {
    /* state={
        collapsed:false
    } */
    render() {
         let openKeys = ['/' + this.props.location.pathname.split('/')[1]]
         let selectKeys = [this.props.location.pathname]
        return (
            <Sider className="site-layout-background" width={200} collapsible collapsed={this.props.collapsed}>
            <Menu
                mode="inline"
                defaultOpenKeys = {
                    openKeys
                }
                selectedKeys = {
                    selectKeys
                }
                style={{ height: '100%' }}
            >
                {/* <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                    <Menu.Item key="4">option4</Menu.Item>
                </SubMenu> */}
                {
                    this.menuAction(menus)
                }
            </Menu>
            </Sider>

        )
    }
    menuAction(menus) {
        return menus.map(item=>{
            if (item.children){
                return <SubMenu key = {
                    item.path
                }
                icon = {
                        <UserOutlined
                />} title={item.name}>
                            {
                                this.menuAction(item.children)
                            }
                        </SubMenu>
            }
            return(
                <Menu.Item key={item.path} onClick={()=>{this.props.history.push(
                    item.path
                )}}>{item.name} </Menu.Item>
            )
        })
        

    }
}

const mapStateToProps = (storeState)=>{
    return {
        collapsed :storeState.CollapsedReducer.isCollapsed
    }
}

export default withRouter(connect(mapStateToProps)(SideBar))
