import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainWrapper from '../MainWrapper/index'
import LogIn from '../../Login'
import Register from '../../Register'
import WrappedRoutes from './WrappedRoutes'


const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path='/log_in' component={LogIn} />
        <Route path='/register' component={Register} />
        <Route path='/' component={WrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
)

export default Router
