const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const api = middleware.api
const controller = require('../controller/task')

router.post('/get', api(controller.get))
router.post('/add', api(controller.add))
router.post('/delete', api(controller.delete))
router.post('/update', api(controller.update))

module.exports = router
