const users = [
  {
    username: 'lightFury',
    email: 'blacktiny126@hotmail.com',
    pwd: '123',
    fullName: 'Li YinYong',
    avatar: '',
    role: 'developer'
  },
  {
    username: 'anton',
    email: '',
    pwd: '123456',
    fullName: 'Anton Kochetov',
    avatar: '',
    role: 'manager'
  },
  {
    username: 'xian123',
    email: '',
    pwd: 'dream123456',
    fullName: 'Xianru Xian',
    avatar: '',
    role: 'developer'
  }
]

exports.login = async function (data) {
  const { username, password } = data
  const resp = {
    user: null,
    error: ''
  }

  resp.user = users.find(item => item.username === username && item.pwd === password)
  if (!resp.user) {
    resp.error = 'wrong user and pwd'
  }

  return { data: resp }
}

exports.register = async function (data) {
  const { username, email, password } = data
  const resp = {
    error: ''
  }

  users.push({
    username,
    email,
    pwd: password,
    fullName: '',
    role: ''
  })

  return { data: resp }
}