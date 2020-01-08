import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingIcon from 'mdi-react/LoadingIcon'
import LogInForm from './LogInForm'
import FacebookAuthBtn from './AuthBtn/fbAuthBtn'
import GoogleAuthBtn from './AuthBtn/googleAuthBtn'
import { authLogin } from '../../stores/Auth/actions'

class Login extends Component {
  onLogin = async (values) => {
    const { authLoginAction } = this.props

    authLoginAction({
      username: values.username,
      password: values.password
    })
  }

  render() {
    const { auth } = this.props

    if (auth.login) {
      return (<Redirect from='/log_in' to='/dashboard' />)
    }

    return (
      <div className='account account--not-photo'>
        {auth.action === 'login' && auth.loading && <div className='loading'><LoadingIcon /></div>}
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'>Welcome to
                <span className='account__logo'> Easy
                  <span className='account__logo-accent'>DEV</span>
                </span>
              </h3>
              <h4 className='account__subhead subhead'>Start your business easily</h4>
            </div>
            <LogInForm
              onSubmit={this.onLogin}
            />
            <div className='account__or'>
              <p>Or Easily Using</p>
            </div>
            <div className='account__social'>
              <FacebookAuthBtn />
              <GoogleAuthBtn />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const state = ({ auth }) => ({
  auth: auth
})

const actions = ({
  authLoginAction: authLogin
})

export default connect(state, actions)(Login)
