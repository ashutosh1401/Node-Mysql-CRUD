const express = require('express')
const router = express.Router()
const { isAuth } = require('../middleware/utils')
const { register, login, getUserdetails } = require('../controllers/user.controller')

router.post('/register', register)

router.post('/login', login)

router.get('/', isAuth, getUserdetails)

module.exports = router;