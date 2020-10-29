import React, {
    Component
} from 'react'
import {
    Redirect,
    Route,
    Switch
} from 'react-router-dom'
import './Dashbord.css'
import TopHeader from './HeaderBar'
import SideBar from './SideBar'
import Rights from '../userManage/Rigins'
import NotFound from '../notFound/NotFound'
import Users from '../userManage/Users'
import Home from '../home/Home'
import Movies from '../movieManage/MovieManage'
import MovieList from '../movieManage/MovieList'
import Pai from '../echarts/Pai'
import Bar from '../echarts/Bar'
import MovieUpdata from '../movieManage/MovieUpdate'
import {
    Layout
} from 'antd';
const {
    Content
} = Layout;
const routes = [
    {
        path: "/home",
        component: Home,
        permission: [1, 2, 3]
    },
    {
        path: "/user-manage/users",
        component: Users,
        permission: [3]
    },
    {
        path: "/user-manage/rights",
        component: Rights,
        permission: [3]
    },
    {
        path: "/movie-manage/manage",
        component: Movies,
        permission: [3]
    },
    {
        path: "/movie-manage/list",
        component: MovieList,
        permission: [3]
    }, {
        path: "/movie-manage/updata",
        component: MovieUpdata,
        permission: [3]
    },
    {
        path: "/statistical-analysis/pai",
        component: Pai,
        permission: [3]
    }, {
        path: "/statistical-analysis/bar",
        component: Bar,
        permission: [3]
    },
 
]
    
export default class Dashbord extends Component {

    render() {
        
        // let {
        //     roleType
        // } = JSON.parse(localStorage.getItem('token'))
        return (
                <Layout style={{height:'100%'}}>
                <SideBar></SideBar>
                        <Layout className="site-layout">
                            <TopHeader></TopHeader>
                            < Content style = {
                                {
                                    padding: '10px',
                                    // background: "#91d5ff"
                                }
                            } >
                                <Switch>
                                    {
                                        routes.map((item, i) => <Route key={i} path={item.path}  component={item.component}></Route>)
                                    
                                    }
                                    {/* {
                                        routes.map((item,i)=> 
                                        <Route key={i} path={item.path}  render={()=>{
                                            return  item.permission.includes(roleType)?
                                            <Route path={item.path} key={item.path} component={item.component}></Route>
                                            :
                                            null
                                        }
                                        }/>
                                        )
                                    } */}
                                    <Redirect from="/" to='/home' exact></Redirect>
                                    <Route path="*" component={NotFound}></Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
        )
    }
}
