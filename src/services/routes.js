const userRoute = require('../routes/user')
const express = require('express')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json({ limit: '10MB' }))

    app.use('/api/user', userRoute)
}
