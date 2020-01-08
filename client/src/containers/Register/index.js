import React, { PureComponent } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LoadingIcon from 'mdi-react/LoadingIcon'
import RegisterForm from './RegisterForm'
import { authRegister } from '../../stores/Auth/actions'

class Register extends PureComponent {
  state = {
    error: '',
  }

  onRegister = (values) => {
    const { authRegisterAction } = this.props

    authRegisterAction(values)
  }

  render() {
    const { auth } = this.props

    if (auth.action === 'register' && !auth.error) {
      return (<Redirect from='/register' to='/log_in' />)
    }

    return (
      <div className='account account--not-photo'>
        {auth.action === 'register' && auth.loading && <div className='loading'><LoadingIcon /></div>}
        <div className='account__wrapper'>
          <div className='account__card'>
            <div className='account__head'>
              <h3 className='account__title'>Welcome to
                <span className='account__logo'> Easy
                  <span className='account__logo-accent'>DEV</span>
                </span>
              </h3>
              <h4 className='account__subhead subhead'>Create an account</h4>
            </div>
            <RegisterForm onSubmit={this.onRegister} />
            <div className='account__have-account'>
              <p>Already have an account? <Link to='/log_in'>Login</Link></p>
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
  authRegisterAction: authRegister
})

export default connect(state, actions)(Register)
