import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../stores/store'
import Router from './Router'
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
