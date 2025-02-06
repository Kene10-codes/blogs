const express = require('express')
const { registerUser, getUsers, deleteUser } = require('../controllers/user')
const { loginUser, logoutUser } = require('../controllers/auth')
const router = express.Router()

router.get('/get-users', getUsers)
router.get('/logout-user', logoutUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)

module.exports = router
