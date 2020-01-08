import React, { Component } from 'react'
import PropTypes from 'prop-types'

import icon from '../../../assets/icons/burger.svg'

class TopbarSidebarButton extends Component {
  static propTypes = {
    changeMobileSidebarVisibility: PropTypes.func.isRequired,
    changeSidebarVisibility: PropTypes.func.isRequired,
  }

  render() {
    const { changeMobileSidebarVisibility, changeSidebarVisibility } = this.props

    return (
      <div>
        <button className="topbar__button topbar__button--desktop" type="button" onClick={changeSidebarVisibility}>
          <img src={icon} alt="" className="topbar__button-icon" />
        </button>
        <button className="topbar__button topbar__button--mobile" type="button" onClick={changeMobileSidebarVisibility}>
          <img src={icon} alt="" className="topbar__button-icon" />
        </button>
      </div>
    )
  }
}

export default TopbarSidebarButton
