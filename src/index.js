require('dotenv').config()
const express = require('express')
const app = express() // INIT EXPRESS
const PORT = process.env.PORT || 3200

const logger = require('./services/log')()
require('./services/validation')()
require('./services/db')()
require('./services/routes')(app)
require('./middewares/production/prod')(app)

// LISTEN TO APP
let server
if (process.env.NODE_ENV !== 'test') {
    screenYerver = app.listen(PORT, () => {
        logger.info(`server is running on port ${PORT}`)
    })
}
app.get('/blog', (req, res) => {
    res.redirect('/')
})

module.exports = server
