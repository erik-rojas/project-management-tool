import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Carousel from '../../../components/carousel/CarouselSingle'

class TaskCommentBox extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired
  }

  getCommentList = (comments) => {
    return comments.map((item, index) => {
      return (
        <div key={index} className='comment-text'>{item.comment}</div>
      )
    })
  }

  render() {
    const { comments } = this.props
    
    return (
      <div className='comment-content'>
        <div className='comment-box'>
          {comments.length ? <Carousel>
            {this.getCommentList(comments)}
          </Carousel> : <div></div>}
        </div>
        <div className='view-all'>
          <Link to={``}>
            view all
          </Link>
        </div>
      </div>
    )
  }
}

export default TaskCommentBox
