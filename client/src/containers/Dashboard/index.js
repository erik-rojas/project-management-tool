import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'

class Dashboard extends Component {
  render() {
    const { auth } = this.props

    if (!auth.login) return (<Redirect from='/dashboard' to='/log_in' />)

    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{'Dashboard'}</h3>
          </Col>
        </Row>
        <Row>

        </Row>
      </Container>
    )
  }
}

const state = ({ auth }) => ({
  auth: auth
})

export default connect(state)(Dashboard)
