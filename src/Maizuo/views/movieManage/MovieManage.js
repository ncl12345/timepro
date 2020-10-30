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
} from 'antd';
import {
    InboxOutlined
} from '@ant-design/icons';
import MovieModel from './MovieModel';
const {
    Option
} = Select;

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
export default class MovieManage extends Component {
formRef = React.createRef();
    state={
        show:false,
        actorsArr:[],
        directorArr:[],
        directors:[],
        actors:[],
        modelType:1,
        image:''
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
                    < Form.Item label = "影片名"
                    name = "titleCn" >
                        < Input placeholder = "我和我的祖国"/ >
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
                        name = "location"
                        label="地区"
                        rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                    >
                        <Select mode="multiple" placeholder="Please select favourite colors">
                            {
                                locationValue.map(item=>{
                                    return <Option value={item.name} key={item.value}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="selectInfo"
                        label="详细信息"
                        rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                    >
                        <Select mode="multiple" placeholder="Please select favourite colors">
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
                        rules={[{ required: true, message: 'Please select your favourite colors!', type: 'array' }]}
                    >
                        <Select mode="multiple" placeholder="Please select favourite colors">
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
                    < Form.Item name = "dragger"
                    valuePropName = "fileList"
                    getValueFromEvent = {
                        this.normFile
                    }
                    name = 'file'
                    noStyle >
                    < Upload.Dragger >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                    </Form.Item>
                </Form.Item> */}
                <Form.Item label="Dragger">
                    < Form.Item name = "dragger"
                    valuePropName = "fileList"
                    getValueFromEvent = {
                        this.normFile
                    }
                    noStyle name = "file" >
                    < Upload.Dragger name = "file"
                    action = "/detail/addPic" >
                        <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
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
    changeIt(res,type){
        if(res){
            if(type===1){
                let actorsArr = []
                console.log(res,1)

                this.setState({
                actors: res
                })
                res.forEach(
                    (item, index) => {
                        actorsArr.push({
                            ['actor' + index]: item
                        })
                    }
                )
                actorsArr = this.arrToObj(actorsArr)
                console.log(actorsArr,1)
                this.setState({
                    actorsArr
                })
            } else if (type === 2) {
                let directorArr = []
                console.log(res, 2)
                this.setState({
                    directors: res
                })
                res.forEach(
                    (item, index) => {
                        directorArr.push({
                            ['director' + index]: item
                        })
                    }
                )
                directorArr = this.arrToObj(directorArr)
                console.log(directorArr, 2)
                this.setState({
                    directorArr
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
        const formData = new FormData();
    
            formData.append('file', this.image);
        console.log(formData)







                console.log(values,'搜索')
        var rmonth=moment(values.date._d).format("MM")
        var rDay = moment(values.date._d).format("DD")
        var releaseDate=moment(values.date._d).format('MM DD YYYY')+'上映'

                let type =  values.SelectType.join('/')
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
                console.log(arrFalse, '不同')
                let arrTures = arrTrue.map(item => true)
                let arrFalses = arrFalse.map(item => false)
                arrTrue = lodash.zipObject(arrTrue, arrTures)
                arrFalse = lodash.zipObject(arrFalse, arrFalses)
                if (!values.switch) {
                    let ms = {
                        ...arrTrue,
                        ...arrFalse,
                        t: values.titleCn,
                        r: values.r*20,
                        NearestCinemaCount: values.NearestCinemaCount,
                        NearestShowtimeCount: values.NearestShowtimeCount,
                        file: values.file
                    }
                // }
                console.log('ms2', ms)
                axios.post('/detail/addDetail', ms).then(res => {
                    message.success({content: '提交成功!'})
                })
            }else{
                let ms = {
                    rDay,
                    rmonth,
                    releaseDate,
                    type,
                    ...this.state.actorsArr,
                    ...this.state.directorArr,
                    ...arrTrue,
                    ...arrFalse,
                    title: values.titleCn,
                    r: values.r*20,
                    wantedCount:1243,
                    file: values.file
                    
                }
                console.log('ms1',ms)
                axios.post('/detail/addDetail',JSON.stringify(ms)).then(res => {
                    message.success({
                        content: '提交成功!'
                    })
                })
            }
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