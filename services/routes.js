const express = require('express')
const userRoute = require('../routes/user')
const blogRoute = require('../routes/blog')
const error = require('../middewares/error/error')
const passwordResetRoute = require('../routes/passwordReset')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))
    app.use('/api/user', userRoute)
    app.use('/api/blog', blogRoute)
    app.use('/api/password-reset', passwordResetRoute)
    app.use(error)
}
