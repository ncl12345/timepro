import React, { Component } from 'react'
import NclRoute from './router/index'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css'
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux'
import {
  PersistGate
} from 'redux-persist/integration/react'
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        </PersistGate>
      </Provider>
    )
  }
}
