import React, {
    Component,
    createElement,
    useState
} from 'react'

import {
    Comment,
    Tooltip,
    Avatar
} from 'antd';
import moment from 'moment';
import {
    DislikeOutlined,
    LikeOutlined,
    DislikeFilled,
    LikeFilled
} from '@ant-design/icons';
export default class MsgList extends Component {
    state={
        info:[{
            author: 'xiaommm',
            src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            com: `We supply a series of design principles, practical patterns and high quality designresources (Sketch and Axure), to help people create their product prototypes beautifullyand efficiently.`
        }]
    }
    render() {
        return (
            <div>
                {
                    this.state.info&&this.state.info.map(item=>{
                    return   <Comment
                    // actions={actions}
                    author = {
                            <a>{item.author}</a>}
                    avatar={
                        <Avatar
                            src={item.src}
                            alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                        {item.com}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                    />
                    })
                }
                
            </div>
        )
    }
}
