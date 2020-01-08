import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class MainWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

  render() {
    const {
      theme, children
    } = this.props

    const wrapperClass = classNames({
      wrapper: true
    })

    return (
      <div className={`${theme.className} ltr-support`}>
        <div className={wrapperClass}>
          {children}
        </div>
      </div>
    )
  }
}

const state = ({ theme }) => ({
  theme: theme
})

const actions = ({
})

export default connect(state, actions)(MainWrapper)
