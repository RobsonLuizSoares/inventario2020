const express = require('express')
const router = express.Router()

const User = require('../models/User')


const models = {
  User
}
const indexController = require('../controllers/index')

router.get('/', indexController.home)

router.get('/login', indexController.login)
router.get('/logout', indexController.logout)
router.post('/login', indexController.access.bind(null, models))

module.exports = router