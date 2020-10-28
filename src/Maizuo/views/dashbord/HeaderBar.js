import React, { Component } from 'react'
import {
    Layout,
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';

const {
    Header,
} = Layout;
export default class HeaderBar extends Component {
    state = {
        collapsed: true
    }
    render() {
        return (
                <Header className="site-layout-background" style={{ padding: '10px',background:"#ccc" }} >
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: ()=>{this.toggle()},
                    })}
                    <span style={{float:'right'}}>iodsn</span>
                </Header>
            )
    }
    toggle(){
        this.setState({
            collapsed:!this.state.collapsed
        })
    }
    
}
