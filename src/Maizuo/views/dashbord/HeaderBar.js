import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import CollapsedAction from '../../redux/actionCreator/CollapsedAction'
import {
    Layout,
    Menu,
    Dropdown,
    Avatar
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

const {
    Header,
} = Layout;

 class HeaderBar extends Component {
    render() {
       let {rolename} = JSON.parse(localStorage.getItem('token'))
        const menu = (
        <Menu>
            <Menu.Item>
            {rolename}
            </Menu.Item>
            <Menu.Item danger onClick={()=>{
                localStorage.removeItem('token')
                this.props.history.replace('/login')//把当前路径替换成/login
            }}>退出</Menu.Item>
        </Menu>
        );
        return (
                <Header className="site-layout-background" style={{ padding: '10px' }} >
                    {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: ()=>{this.toggle()},
                    })}
                   <div style={{float:"right"}}>
                        <Dropdown overlay={menu}>
                            {/* Avatar为头像 */}
                            <Avatar size="large" icon={<UserOutlined />} />
                        </Dropdown>
                    </div>
                </Header>
            )
    }
    toggle(){
        this.props.CollapsedAction()
    }
    
}

const mapStateToProps =(storeState)=>{
    return {
        collapsed : storeState.CollapsedReducer.isCollapsed
    }
}
const mapDispatchToProps = {
    CollapsedAction : CollapsedAction
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderBar))
