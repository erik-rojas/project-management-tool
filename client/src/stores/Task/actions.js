import actionTypes from '../../constants/actionTypes'
import { api } from '../api'

export const getTasks = () => api(
  {
    type: actionTypes.GET_TASKS,
    data: {}
  }
)

export const addNewTask = (newTask) => api(
  {
    type: actionTypes.ADD_NEW_TASK,
    data: { newTask }
  }
)

export const deleteTask = (taskId) => api(
  {
    type: actionTypes.DELETE_TASK,
    data: { taskId }
  }
)

export const updateTaskStatus = (taskId, key, value) => api(
  {
    type: actionTypes.UPDATE_TASK,
    data: {
      taskId,
      key,
      value
    }
  }
)
