import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Progress } from 'reactstrap'
import { } from '../../../stores/Task/actions'

import './style.scss'

class TimeProgressBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stepTime: 0,
      curTime: 0,
      timer: -1
    }
  }

  componentDidMount() {
    const { user, userName, endTime, startTime, inProgress } = this.props
    this.setState({ stepTime: endTime / 100, curTime: startTime })

    if (user.username === userName && inProgress) {
      const timer = setInterval(this.intervalTimeFunc, 1000)
      this.setState({ timer })
    }
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.state
    const { user, userName, startTime, inProgress } = this.props

    if (prevProps !== this.props) {
      if (user.username === userName && inProgress) {
        if (timer === -1) {
          const newTimer = setInterval(this.intervalTimeFunc, 1000)
          this.setState({ timer: newTimer })
        }
      } else {
        this.clearTimer()
      }

      this.setState({ curTime: startTime })
    }
  }

  componentWillUnmount() {
    const { inProgress } = this.props

    if (inProgress) {
      this.clearTimer()
    }
  }

  intervalTimeFunc = () => {
    let { curTime } = this.state
    const { taskId, endTime, hookAfterTimerFinished } = this.props

    curTime ++

    if (curTime > endTime) {
      clearInterval(this.timer)
      hookAfterTimerFinished(taskId)
    }

    this.setState({ curTime })
  }

  clearTimer = () => {
    const { timer } = this.state
    clearInterval(timer)
    this.setState({ timer: -1 })
  }

  getTimeLabel = (curTime) => {
    const hour = parseInt(curTime / 3600) < 10 ? '0' + parseInt(curTime / 3600) : parseInt(curTime / 3600)
    const minute = parseInt(curTime % 3600 / 60) < 10 ? '0' + parseInt(curTime % 3600 / 60) : parseInt(curTime % 3600 / 60)
    const second = (curTime % 60) < 10 ? '0' + (curTime % 60) : (curTime % 60)

    return hour + ':' + minute + ':' + second
  }

  render() {
    const { stepTime, curTime } = this.state

    const curPercent = parseInt(curTime / stepTime)

    const timeLabel = this.getTimeLabel(curTime)

    return (
      <div className='time-progress-bar'>
        <div className='time-label'>{timeLabel}</div>
        <div className='progress-bar-content'>
          <div className='title'>Time</div>
          <div className='progress-wrap progress-wrap--big'>
            <Progress value={curPercent} />
          </div>
        </div>
      </div>
    )
  }
}

TimeProgressBar.propTypes = {
  taskId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  inProgress: PropTypes.bool.isRequired,
  hookAfterTimerFinished: PropTypes.func.isRequired,
}

const state = ({ auth }) => ({
  user: auth.user
})

const actions = ({

})

export default connect(state, actions)(TimeProgressBar)
