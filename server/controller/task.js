const tasks = [
  {
    id: 'aaaaa',
    username: 'anton',
    status: '',   // backlog, progress, done, completed
    timeStatus: 1,  // 0: play, 1: pause, 2: end

    // TimeProgressBar Props
    startTime: 0,
    endTime: 60,
    systemTime: 0,

    // ResizableProgressBar Props
    progressPercent: 0,

    // comments
    comments: [
      {
        comment: 'making database',
        dateTime: '2019/11/19'
      },
      {
        comment: 'creating tables',
        dateTime: '2019/11/19'
      },
    ]
  },
  {
    id: 'bbbbb',
    username: 'xian123',
    status: '',
    timeStatus: 1,
    startTime: 0,
    endTime: 60,
    systemTime: 0,
    progressPercent: 0,
    comments: [
      {
        comment: 'editing',
        dateTime: '2019/11/19'
      },
      {
        comment: 'updating',
        dateTime: '2019/11/19'
      },
    ]
  },
  {
    id: 'ccccc',
    username: 'lightFury',
    status: '',
    timeStatus: 1,
    startTime: 0,
    endTime: 200,
    systemTime: 0,
    progressPercent: 0,
    comments: [
      {
        comment: 'debugging',
        dateTime: '2019/11/19'
      },
      {
        comment: 'developing',
        dateTime: '2019/11/19'
      },
    ]
  },
  {
    id: 'ddddd',
    username: 'lightFury',
    status: '',
    timeStatus: 1,
    startTime: 0,
    endTime: 1000,
    systemTime: 0,
    progressPercent: 0,
    comments: [
      {
        comment: 'in progress',
        dateTime: '2019/11/19'
      },
      {
        comment: 'completed',
        dateTime: '2019/11/19'
      },
    ]
  }
]

exports.get = async function (data) {
  const resp = {
    tasks: null
  }

  resp.tasks = tasks.map(item => {
    let startTime = item.startTime
    let timeStatus = item.timeStatus
    if (item.timeStatus === 0) {
      startTime = startTime + parseInt((new Date().getTime() - item.systemTime) / 1000)
      if (startTime >= item.endTime) {
        startTime = item.endTime
        timeStatus = 2
      }
    }
    return {
      ...item,
      startTime,
      timeStatus
    }
  })

  return { data: resp }
}

exports.add = async function (data) {
  const { newTask } = data
  const resp = {
    newTask: null,
    error: ''
  }
  
  tasks.push(newTask)
  resp.newTask = newTask

  return { data: resp }
}

exports.delete = async function (data) {
  const { taskId } = data
  const resp = {
    taskId: '',
    error: ''
  }
  
  const index = tasks.findIndex(item => item.id === taskId)
  tasks.splice(index, 1)
  resp.taskId = taskId

  return { data: resp }
}

exports.update = async function (data) {
  const { taskId, key, value } = data
  const resp = {
    updatedTask: null,
    error: ''
  }
  
  const index = tasks.findIndex(item => item.id === taskId)

  switch (key) {
    case 'timeStatus':
      {
        switch (value) {
          case 0:
            {
              tasks[index].systemTime = new Date().getTime()
              tasks[index].timeStatus = 0
            }
            break
          case 1:
            {
              const time_now = new Date().getTime()
              tasks[index].startTime = tasks[index].startTime + parseInt((time_now - tasks[index].systemTime) / 1000)
              tasks[index].timeStatus = 1
              if (tasks[index].startTime >= tasks[index].endTime) {
                tasks[index].startTime = tasks[index].endTime
                tasks[index].timeStatus = 2
                tasks[index].systemTime = 0
              }
            }
            break
          case 2:
            {
              tasks[index].startTime = tasks[index].endTime
              tasks[index].timeStatus = 2
              tasks[index].systemTime = 0
            }
            break
        }
      }
      break
    default:
      {
        tasks[index][key] = value
      }
      break
  }

  resp.updatedTask = tasks[index]

  return { data: resp }
}