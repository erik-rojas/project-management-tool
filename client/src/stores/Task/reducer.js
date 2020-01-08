import actionTypes from '../../constants/actionTypes'
import { createProducer } from '../reducers/utilities'

let initialState = {
  loading: false,
  action: '',
  data: []
}

export default createProducer(initialState, {
  [actionTypes.GET_TASKS_START]: (task, { data }) => {
    task.loading = true
    task.action = 'get'
  },

  [actionTypes.GET_TASKS_SUCCESS]: (task, { data }) => {
    const { tasks } = data

    task.loading = false
    task.data = tasks
  },

  [actionTypes.ADD_NEW_TASK_START]: (task, { data }) => {
    task.loading = true
    task.action = 'add'
  },

  [actionTypes.ADD_NEW_TASK_SUCCESS]: (task, { data }) => {
    const { newTask, error } = data

    task.loading = false
    if (!error) task.data.push(newTask)
  },

  [actionTypes.DELETE_TASK_START]: (task, { data }) => {
    task.loading = true
    task.action = 'delete'
  },

  [actionTypes.DELETE_TASK_SUCCESS]: (task, { data }) => {
    const { taskId, error } = data

    task.loading = false
    if (!error) {
      const index = task.data.findIndex(item => item.id === taskId)
      task.data[index].status = 'deleted'
    }
  },

  [actionTypes.UPDATE_TASK_START]: (task, { data }) => {
    task.loading = true
    task.action = 'update'
  },

  [actionTypes.UPDATE_TASK_SUCCESS]: (task, { data }) => {
    const { updatedTask, error } = data

    task.loading = false
    if (!error) {
      const index = task.data.findIndex(item => item.id === updatedTask.id)
      task.data[index] = updatedTask
    }
  }
})
