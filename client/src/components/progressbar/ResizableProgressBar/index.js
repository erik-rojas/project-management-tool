import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ResizableBox } from 'react-resizable'

import './style.scss'

class ResizableProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      maxWidth: 800,
      resizableInfo: {
        width: 300,
        height: 16,
        axis: 'x',
        handle: (<strong className='resize-handler' />),
        minConstraints: [0, Infinity],
        maxConstraints: [Infinity, Infinity],
        onResizeStop: this.resize
      }
    }
  }

  resize = (e, data) => {
    const { maxWidth } = this.state
    const { taskId, resizeFunc } = this.props
    const curPercent = data.size.width / maxWidth * 100

    resizeFunc(taskId, curPercent)
  }

  /**
   * Calculate ResizableBox width
   */
  updateDimensions() {
    let { resizableInfo } = this.state
    const maxWidth = window.innerWidth - 770

    resizableInfo.maxConstraints = [maxWidth, Infinity]
    this.setState({ maxWidth, resizableInfo })
  }

  /**
   * Add window resize event listener
   */
  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions.bind(this))

    const { resizableInfo } = this.state
    const { user, userName } = this.props

    if (userName !== user.username) {
      resizableInfo.handle = (<strong className='resize-handler disable' />)
    }
  }

  /**
   * Remove window resize event listener
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }

  render() {
    const { resizableInfo, maxWidth } = this.state
    const { percent } = this.props

    resizableInfo.width = maxWidth * percent / 100

    return (
      <div className='resizable-progress-bar'>
        <div className='progress-bar-content'>
          <div className='progress-bar__title'>Progress</div>
          <div className='progress-bar__container'>
            <ResizableBox className='resizable-bar' {...resizableInfo} />
          </div>
          {/* <div className='percent-value'>{Number(width / maxWidth * 100).toFixed(2)} %</div> */}
        </div>
      </div>
    )
  }
}

ResizableProgressBar.propTypes = {
  taskId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired
}

const state = ({ auth }) => ({
  user: auth.user
})

export default connect(state)(ResizableProgressBar)
