import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import TaskCard from './components/TaskCard'
import './style.scss'

class Task extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={12}>
            <h3 className="page-title">{'Tasks List'}</h3>
          </Col>
        </Row>
        <Row>
          <TaskCard />
        </Row>
      </Container>
    )
  }
}

export default Task
