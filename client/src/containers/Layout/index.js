import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Topbar from './topbar'
import Sidebar from './sidebar'
import { changeMobileSidebarVisibility, changeSidebarVisibility } from '../../stores/Sidebar/actions'
import { changeThemeToDark, changeThemeToLight } from '../../stores/Theme/actions'

class Layout extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  changeSidebarVisibility = () => {
    const { changeSidebarVisibility } = this.props
    changeSidebarVisibility()
  }

  changeMobileSidebarVisibility = () => {
    const { changeMobileSidebarVisibility } = this.props
    changeMobileSidebarVisibility()
  }

  changeToDark = () => {
    const { changeThemeToDark } = this.props
    changeThemeToDark()
  }

  changeToLight = () => {
    const { changeThemeToLight } = this.props
    changeThemeToLight()
  }

  render() {
    const { sidebar, user } = this.props
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': sidebar.collapse,
    })

    return (
      <div className={layoutClass}>
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
          user={user}
        />
        <Sidebar
          sidebar={sidebar}
          changeToDark={this.changeToDark}
          changeToLight={this.changeToLight}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    )
  }
}

const state = ({ auth, sidebar, theme }) => ({
  user: auth.user,
  sidebar: sidebar,
  theme: theme
})

const actions = ({
  changeMobileSidebarVisibility: changeMobileSidebarVisibility,
  changeSidebarVisibility: changeSidebarVisibility,
  changeThemeToDark: changeThemeToDark,
  changeThemeToLight: changeThemeToLight
})

export default connect(state, actions)(Layout)
