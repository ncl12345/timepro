import React, { Component } from 'react'
import {
    Modal,Form,
    Input,
    Button
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './MovieModel.css'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};


export default class MovieModel extends Component {
    state = {
        visible: false,
        type:1
    }
    formRef = React.createRef();
    render() {
        return (
            <Modal
                title="人员添加"
                visible={this.state.visible}
                onOk={()=>{this.handleOk()}}
                onCancel={()=>{
                    this.cancel()
                }}
            >
                < Form name = "dynamic_form_item" {
                    ...formItemLayoutWithOutLabel
                }
                ref = {
                    this.formRef
                } 
                id="form"
                >
                    <Form.List
                        name="names"
                        rules={[
                        {
                            validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 2 passengers'));
                            }
                            },
                        },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label = {
                                    index === 0 ? (this.state.type ==1?'演员':'导演') : ''
                                }
                                required={false}
                                key={field.key}
                            >
                                <Form.Item
                                {...field}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input passenger's name or delete this field.",
                                    },
                                ]}
                                noStyle
                                >
                                <Input placeholder="passenger name" style={{ width: '60%' }} />
                                </Form.Item>
                                {fields.length > 1 ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                />
                                ) : null}
                            </Form.Item>
                            ))}
                            <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                add('', 0);
                                }}
                                style={{ width: '60%', marginTop: '20px' }}
                                icon={<PlusOutlined />}
                            >
                                添加
                            </Button>
                            <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                        )}
                    </Form.List>
                    </Form>
        </Modal>
        )
    }
    componentDidMount() {
        console.log(this.props)
        this.setState({
            visible: true,
            type: this.props.type
        })

    }
    cancel(){
        this.setState({
            visible:false
        })
        this.props.handleMovieModel()
        
    }
    handleOk(){
        this.formRef.current.validateFields().then(values => {
            
            console.log(values, 'values')
            this.props.handleMovieModel(values.names,this.state.type)
        })
    }
    componentWillUnmount(){
        console.log('sdc')
    }
    
}
