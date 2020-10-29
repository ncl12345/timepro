import React, { Component } from 'react'
import Particles from 'react-particles-js';
import {
    Form,
    Input,
    Button,
    Checkbox
} from 'antd';

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    },
};
export default class Login extends Component {
    state={
        height:6
    }
    render() {
        return (
            <div style={{position:"relative"}}>
            <Particles 
                params={{
                        particles: {
                            line_linked: {
                                shadow: {
                                    enable: true,
                                    color: "#3CA9D1",
                                    blur: 5
                                }
                            }
                        }
                    }}
                style={{
                    width: '100%',
                    height: this.state.height
                    // backgroundImage: `url(${logo})` 
                }}
            />
                <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                style={{position:"absolute",
                right: '0', width: '25rem',top:'5rem',bottom:'0',left:'0',margin:'0 auto'
                }
            }
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                        <Checkbox  style={{flex:'1'}}>Remember me</Checkbox>
                        <a style={{textAlign:'right'}}>注册</a>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button  htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
    componentDidMount() {
        this.setState({
            height:window.innerHeight-15+'px'
        })
    }
    
}
