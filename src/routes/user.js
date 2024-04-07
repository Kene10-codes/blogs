const express = require('express')
const { registerUser, getUsers } = require('../controllers/user')
const { loginUser } = require('../controllers/auth')
const router = express.Router()

router.get('/get-users', getUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router
