import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap'
import ChevronDownIcon from 'mdi-react/ChevronDownIcon'
import LoadingIcon from 'mdi-react/LoadingIcon'
import AutorenewIcon from 'mdi-react/AutorenewIcon'
import CommentBox from './TaskCommentBox'
import ResizableProgressBar from '../../../components/progressbar/ResizableProgressBar'
import TimeProgressBar from '../../../components/progressbar/TimeProgressBar'
import { getTasks, addNewTask, deleteTask, updateTaskStatus } from '../../../stores/Task/actions'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  componentDidMount() {
    const { getTasksAction } = this.props

    getTasksAction()
  }

  componentDidUpdate(prevProps, prevStete) {
    const { tasks } = this.props

    if (prevProps.tasks.data !== tasks.data) {
      this.setState({ items: tasks.data })
    }
  }

  resizeProgressBarFunc = (taskId, curPercent) => {
    const { updateTaskStatusAction } = this.props

    updateTaskStatusAction(taskId, 'progressPercent', curPercent)
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    )

    this.setState({
      items
    })
  }

  onTimerStart = (taskId) => {
    const { tasks, updateTaskStatusAction } = this.props
    const index = tasks.data.findIndex(item => { return item.id === taskId })
    updateTaskStatusAction(tasks.data[index].id, 'timeStatus', tasks.data[index].timeStatus ? 0 : 1)
  }

  onTimerFinished = (taskId) => {
    const { tasks, updateTaskStatusAction } = this.props

    const index = tasks.data.findIndex(item => { return item.id === taskId })
    updateTaskStatusAction(tasks.data[index].id, 'timeStatus', 2)
  }

  onReloadTasks = () => {
    const { getTasksAction } = this.props

    getTasksAction()
  }

  onAddNewTask = () => {
    const { user, addNewTaskAction } = this.props
    const curTime = new Date().getTime()
    const newTask = {
      id: 'newTask_' + curTime,
      username: user.username,
      status: 'backlog',
      timeStatus: 1,
      isShow: true,
      startTime: 0,
      endTime: 3600,
      systemTime: -1,
      progressPercent: 0,
      comments: []
    }

    addNewTaskAction(newTask)
  }

  onDeleteTask = (taskId) => {
    const { tasks, deleteTaskAction } = this.props

    const index = tasks.data.findIndex(item => { return item.id === taskId })
    if (!tasks.data[index].timeStatus) {
      alert(`Sorry, can't delete the task in progress. Please stop the task first.`)
      return
    }

    deleteTaskAction(taskId)
  }

  render() {
    const { user, tasks } = this.props
    const progressbarInfo = {
      resizeFunc: this.resizeProgressBarFunc
    }

    return (
      <div className='task'>
        {tasks.loading && <div className='loading'><LoadingIcon /></div>}
        <div className='task-content'>
          <div className='task-content-header'>
            <Button className='btn-refresh' onClick={this.onReloadTasks}><AutorenewIcon /></Button>
            <Button className='btn-add-task' onClick={this.onAddNewTask}>Add Task</Button>
          </div>
          <div className='drag-drop-context'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {this.state.items && this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            className='item-content'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <div className='progress-bar-group'>
                              <div className='progress-bar-group-header'>
                                <Button
                                  color='danger'
                                  disabled={user.username !== item.username || item.timeStatus === 2}
                                  className='btn-timer'
                                  onClick={() => this.onTimerStart(item.id)}
                                >
                                  {item.timeStatus ? 'Start' : 'Stop'}
                                </Button>
                                <div className='header-title' {...provided.dragHandleProps}>Title - junefox chat</div>
                                <UncontrolledDropdown>
                                  <DropdownToggle className="icon icon--right" outline color="primary">
                                    <p>Action <ChevronDownIcon /></p>
                                  </DropdownToggle>
                                  <DropdownMenu className="dropdown__menu">
                                    <DropdownItem onClick={() => this.onDeleteTask(item.id)}>Delete</DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </div>
                              <div className='progress-bar-group-content'>
                                <div className='progressbar-content'>
                                  <div {...provided.dragHandleProps}>
                                    <TimeProgressBar
                                      taskId={item.id}
                                      userName={item.username}
                                      startTime={item.startTime}
                                      endTime={item.endTime}
                                      inProgress={!item.timeStatus}
                                      hookAfterTimerFinished={this.onTimerFinished}
                                    />
                                  </div>
                                  <ResizableProgressBar
                                    taskId={item.id}
                                    userName={item.username}
                                    percent={item.progressPercent}
                                    {...progressbarInfo}
                                  />
                                </div>
                                <CommentBox comments={item.comments} />
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    )
  }
}

const state = ({ auth, tasks }) => ({
  user: auth.user,
  tasks: tasks
})

const actions = ({
  getTasksAction: getTasks,
  addNewTaskAction: addNewTask,
  deleteTaskAction: deleteTask,
  updateTaskStatusAction: updateTaskStatus
})

export default connect(state, actions)(Task)
