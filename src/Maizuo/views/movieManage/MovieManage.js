import React, { Component } from 'react'
import moment from 'moment';
import axios from 'axios'
import {
    message,
    Form,
    Select,
    InputNumber,
    Switch,
    Button,
    Upload,
    Rate,
    Input,
    DatePicker,
    Modal
} from 'antd';

import {
    InboxOutlined,
    PlusOutlined

} from '@ant-design/icons';
import MovieModel from './MovieModel';
const {
    Option
} = Select;
const {
    TextArea
} = Input;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    },
};
var lodash = require('lodash');
const config = {
    rules: [{
        type: 'object',
        required: true,
        message: 'Please select time!'
    }],
};
const typeValue=[
    {
        name: '动作',
        value: 'isAction'
    },
    {
        name: '剧情',
        value: 'isPlot'
    },
    {
        name: '运动',
        value: 'isSport'
    },
    {
        name: '战争',
        value: 'isWarfare'
    },
    {
        name: '爱情',
        value: 'isLove'
    }
    
]
const infoValue = [
{
    name: '3D',
    value: 'is3D'
},
{
    name: 'DMAX',
    value: 'isDMAX'
},
{
    name: 'EggHunt',
    value: 'isEggHunt'
},
{
    name: 'IMAX',
    value: 'isIMAX'
},
{
    name: 'IMAX3D',
    value: 'isIMAX3D'
},
{
    name: 'Ticket',
    value: 'isTicket'
}
]


const locationValue=[
    {
        name: '中国',
        value: 'China'
    },
    {
        name: '美国',
        value: 'America'
    },
    {
        name: '日本',
        value: 'Japan'
    },
    {
        name: '澳大利亚',
        value: 'Austrilia'
    },
    {
        name: '加拿大',
        value: 'Canada'
    },
    {
        name: '英国',
        value: 'Kingdom'
    }
]
// const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    
export default class MovieManage extends Component {
    uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
formRef = React.createRef();
    state={
        show:false,
        // actorsArr:[],
        // directorArr:[],
        directors:[],
        actors:[],
        modelType:1,
        image:'',
        imgId:'',
        fileList: [],
        previewVisible: false,
        previewImage: [{
            src: 'http://192.168.60.198:3005/uploads/2bf7b43c4b592736da4046b7862b310c.jpg',
            key: 1
        }],
        previewTitle: 'df',
    }
    render() {
        return (
            <div>
                <Form
                    ref = {
                        this.formRef
                    }
                    name="validate_other"
                    {...formItemLayout}
                    initialValues={{
                        'input-number': 3,
                        'checkbox-group': ['A', 'B'],
                        rate: 3.5,
                    }}
                    onFinish = {
                        this.onFinish
                    }
                    >
                    <Form.Item label="电影信息">
                        <span className="ant-form-text">新增</span>
                    </Form.Item>
                    < Form.Item label = "电影名称"
                        rules = {
                                [{
                                    required: true,
                                    message: '电影名称',
                                    type: 'string'
                                }]
                            }
                        name = "titleCn" >
                        < Input placeholder = "我和我的祖国"/ >
                    </Form.Item>
                    < Form.Item label = "时长(分钟)"
                        name = "runTime" >
                        <Input placeholder = "时长" / >
                    </Form.Item>

                    < Form.Item name = "date"
                    label = "上映时间" {
                        ...config
                    } >
                        
                        <DatePicker 
                        values = {
                                moment('2015-01-01', 'YYYY-MM-DD')}
                        />
                    </Form.Item>    
                    < Form.Item label = "影片详情"
                        name = "content" >
                        <TextArea
                            placeholder="input here"
                            className="custom"
                            style={{ height: 50 }}
                            // onKeyPress={handleKeyPress}
                        />
                    </Form.Item>
                    <Form.Item label="导演信息">
                        <span className="ant-form-text">
                            {
                                Object.assign(this.state.directors).join('/')
                            }
                        </span>
                    </Form.Item>
                    <Form.Item wrapperCol = {{span: 12,offset: 6}}>
                    <Button type="primary" onClick={()=>{
                        this.handleModelDireactorShow(2)}}>
                        添加导演
                    </Button>
                    </Form.Item>
                    <Form.Item label="演员信息">
                        <span className="ant-form-text">
                            {
                                Object.assign(this.state.actors).join('/')
                            }
                        </span>
                    </Form.Item>
                    <Form.Item wrapperCol = {{span: 12,offset: 6}}>
                        <Button type="primary" onClick={()=>{
                            this.handleModelShow(1)
                        }}>
                        添加演员
                        </Button>
                    </Form.Item>
                    <Form.Item
                        name="selectInfo"
                        label="影片信息"
                        rules = {
                            [{
                                required: true,
                                message: '影片信息',
                                type: 'array'
                            }]
                        }
                    >
                        < Select mode = "multiple"
                        placeholder = "影片信息" >
                            {
                                infoValue.map(item=>{
                                    return  <Option value={item.value} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name = "SelectType"
                        label = "电影类型"
                        rules = {
                            [{
                                required: true,
                                message: '电影类型',
                                type: 'array'
                            }]
                        }
                    >
                        < Select mode = "multiple"
                        placeholder = "电影类型" >
                            {
                                typeValue.map(item=>{
                                    return  <Option  value={item.name} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                

                <Form.Item label="影院">
                    < Form.Item name = "NearestCinemaCount"
                    noStyle >
                    <InputNumber min={1} max={300} />
                    </Form.Item>
                    <span className="ant-form-text">家影院上映</span>
                    < Form.Item name = "NearestShowtimeCount"
                    noStyle >
                    <InputNumber min={400} max={10000} />
                    </Form.Item>
                    <span className="ant-form-text">场</span>
                </Form.Item>

                <Form.Item name="switch" label="即将上映" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item name="r" label="排名">
                    < Rate allowHalf={true}/ >
                </Form.Item>
                {/* <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={this.normFile} noStyle>
                    < Upload.Dragger name = "file"
                    action = "/detail/addPic"
                    onChange={(id)=>{
                       this.handleChange(id)
                    }}>
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                    </Form.Item>
                </Form.Item> */}
                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={this.normFile} noStyle>
                        <Upload
                            action = "/detail/addPic"
                            listType="picture-card"
                            // fileList = {
                            //     this.state.fileList
                            // }
                            // onPreview={this.handlePreview}
                            // onChange={this.handleChange}
                            >
                            {/* {fileList.length >= 8 ? null : uploadButton} */}
                            {
                                this.uploadButton
                            }
                            </Upload>
                            <Modal
                            visible={this.state.previewVisible}
                            title={this.state.title}
                            // footer={null}
                            // onCancel={this.handleCancel}
                            >
                            {
                            this.state.previewImage.map(item => {
                                return <img alt="example" style={{ width: '5rem' }} src={item.src} key={item.key}/>
                            })
                        }
                        </Modal>
                    </Form.Item>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    < Button type = "primary"
                    htmlType = "submit"
                    >
                    Submit
                    </Button>
                </Form.Item>
                </Form>
                {this.state.show&&<MovieModel 
                    ishow = {
                        this.state.show
                    }
                    type = {
                        this.state.modelType
                    }
                    handleMovieModel = {
                            (res, type) => {
                        this.changeIt(res, type)
                        
                }}></MovieModel>}
            </div>
        )
    }
    handleChange(info){
        if (info.file.status !== 'uploading') {
            this.setState({
                imgId:info.file.response
            })
        }
    }
    changeIt(res,type){
        if(res){
            if(type===1){
                this.setState({
                actors: res
                })
            } else if (type === 2) {
                this.setState({
                    directors: res
                })
            }
            
        }
        this.setState({
            show:false
        })
    }
    handleModelShow(){
        this.setState({
            show: !this.state.show,
            modelType: 1
        })
    }
    handleModelDireactorShow() {
        this.setState({
            show: !this.state.show,
            modelType:2
        })
    }
    onFinish = values =>{
        console.log(values)
        var rmonth=moment(values.date._d).format("MM")
        var rDay = moment(values.date._d).format("DD")
        var releaseDate=moment(values.date._d).format('MM DD YYYY')+'上映'
        var info = infoValue.map(item => {
            return item.value
        })
        let arrTrue = []
        let arrFalse = []
        for (var i = 0; i < info.length; i++) {
            for (var j = 0; j < values.selectInfo.length; j++) {
                if (info[i] === values.selectInfo[j]) {
                    arrTrue.push(values.selectInfo[j])
                }
            }
        }
        arrFalse = lodash.differenceBy(info, values.selectInfo)
        let arrTures = arrTrue.map(item => true)
        let arrFalses = arrFalse.map(item => false)
        arrTrue = lodash.zipObject(arrTrue, arrTures)
        arrFalse = lodash.zipObject(arrFalse, arrFalses)
        let ms = {
            id: this.state.imgId,
            rDay,
            rmonth,
            releaseDate,
            title: values.titleCn,
            r: values.r*20,
            wantedCount:1243,
            // file: values.file,
            type: values.SelectType,
            directors: this.state.directors,
            actors: this.state.actors,
            ...arrTrue,
            ...arrFalse,
            runTime: values.runTime,
            NearestCinemaCount: values.NearestCinemaCount,
            NearestShowtimeCount: values.NearestShowtimeCount,
            switch: values.switch?1:0,
            content: values.content
        }
        axios.post('/detail/addDetail',ms,'').then(res => {
            console.log(res,'llll')
            if(res.data.code==1){
                message.success({
                    content: '提交成功!'
                })
            }else{
                message.success({
                    content: '提交失败!'
                })
            }
        })
        this.formRef.current.resetFields()
    }
    normFile = e => {
        this.setState({
            image: e
        })
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    arrToObj(arr) {
        function customizer(objValue, srcValue) {
            return lodash.isUndefined(objValue) ? srcValue : objValue;
        }
        var defaults = lodash.partialRight(lodash.assignWith, customizer);
        return defaults(...arr);
    }
}