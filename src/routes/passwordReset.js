const express = require('express')
const { passwordReset } = require('../controllers/passwordReset')

// SET AN INSTANCE OF ROUTER
const router = express.Router()

router.post('/', passwordReset)

module.exports = router
