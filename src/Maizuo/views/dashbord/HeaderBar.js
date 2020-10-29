import React, { Component } from 'react'
import {connect} from 'react-redux'
import CollapsedAction from '../../redux/actionCreator/CollapsedAction'
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

 class HeaderBar extends Component {
    render() {
        return (
                <Header className="site-layout-background" style={{ padding: '10px' }} >
                    {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: ()=>{this.toggle()},
                    })}
                    <span style={{float:'right'}}>iodsn</span>
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

export default connect(mapStateToProps,mapDispatchToProps)(HeaderBar)