const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const api = middleware.api
const controller = require('../controller/auth')

router.post('/login', api(controller.login))
router.post('/register', api(controller.register))

module.exports = router
