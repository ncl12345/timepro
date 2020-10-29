import React, { Component, } from 'react'

import {
    HashRouter as Myrouter,
    Route,
    Redirect,
    Switch
}from 'react-router-dom'
import Login from '../views/login/Login'

import Dashbord from '../views/dashbord/Dashbord'
export default class MyRouter extends Component {
    render() {
        return (
            <Myrouter >
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Dashbord}/>
                    {/* // render={()=>
                    // localStorage.getItem('token')?
                    // <Dashbord></Dashbord>: <Redirect from="*" to="/login
                    // "/>
                    // }/> */}
                    <Redirect from="*" to="/login"/>
                </Switch>
                {this.props.children}
            </Myrouter>
        )
    }
}
// HashRouter/BroswrRouter