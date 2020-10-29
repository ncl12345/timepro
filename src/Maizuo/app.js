import React from 'react'
import MyRouter from './router/index.js'
import store from './redux/store'
import {Provider} from 'react-redux'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../App.less'
import 'antd/dist/antd.dark.css';
// import 'antd/dist/antd.compact.css';
class App extends React.Component {

    render(){
        return (
            <Provider store={store}>
                < MyRouter >
                </MyRouter>
            </Provider>
        )
           
    }
}
export default App 
