import React from 'react'
import MyRouter from './router/index.js'
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../App.less'
import 'antd/dist/antd.dark.css';
// import 'antd/dist/antd.compact.css';
class App extends React.Component {

    render(){
        return (
             < MyRouter >
            </MyRouter>
        )
           
    }
}
export default App 
