import React, { PureComponent } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon'
import ArrowRightIcon from 'mdi-react/ArrowRightIcon'

class CarouselSingle extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  render() {
    const { children } = this.props
    // all settings: https://github.com/akiran/react-slick
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: (<ArrowLeftIcon color='#70bbfd' />),
      nextArrow: (<ArrowRightIcon color='#70bbfd' />)
    }

    return (
      <Slider {...settings} className="slick-slider--single">
        {children}
      </Slider>
    )
  }
}

export default CarouselSingle
