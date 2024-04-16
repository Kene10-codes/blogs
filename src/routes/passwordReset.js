const express = require('express')
const {
    passwordReset,
    passwordNewReset,
} = require('../controllers/passwordReset')

// SET AN INSTANCE OF ROUTER
const router = express.Router()

router.post('/', passwordReset)
router.post('/:userId/:token', passwordNewReset)

module.exports = router
