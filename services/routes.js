const express = require('express')
const userRoute = require('../routes/user')
const blogRoute = require('../routes/blog')
const error = require('../middewares/error/error')
const passwordResetRoute = require('../routes/passwordReset')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))
    app.use('/api/v1/user', userRoute)
    app.use('/api/v1/blog', blogRoute)
    app.use('/api/v1/password-reset', passwordResetRoute)
    app.use(error)
}
