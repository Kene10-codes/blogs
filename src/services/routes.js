const express = require('express')
const userRoute = require('../routes/user')
const blogRoute = require('../routes/blog')
const error = require('../middewares/error/error')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))
    app.use('/api/user', userRoute)
    app.use('/api/blog', blogRoute)
    app.use(error)
}
