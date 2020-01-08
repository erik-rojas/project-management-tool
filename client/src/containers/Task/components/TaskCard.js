import React, { Component } from 'react'
import { Card, Col, CardBody } from 'reactstrap'
import Task from './Task'

class TaskCard extends Component {
  render() {
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <Task />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default TaskCard
