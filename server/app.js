const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const tasksRoute = require('./routes/task')
const authRoute = require('./routes/auth')

let app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.options('*', cors())

app.use('/', routes)
app.use('/task', bodyParser.json(), tasksRoute)
app.use('/auth', bodyParser.json(), authRoute)

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
