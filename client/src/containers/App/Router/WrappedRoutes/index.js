import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Layout from '../../../Layout/index'
import Dashboard from '../../../Dashboard'
import Task from '../../../Task'
// import Account from './Account'

export default () => (
  <div>
    <Layout />
    <div className='container__wrap'>
      <Redirect from='/' to='/dashboard' />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/tasks' component={Task} />
      {/* <Route path='/account' component={Account} /> */}
    </div>
  </div>
)
