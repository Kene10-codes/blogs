require('dotenv').config()
const express = require('express')
const app = express() // INIT EXPRESS

const logger = require('./services/log')()
require('./services/validation')()
require('./services/db')()
require('./services/routes')(app)

const PORT = process.env.PORT || 3200

// LISTEN TO APP
app.listen(PORT, () => {
    logger.info(`server is running on port ${PORT}`)
})

app.get('/blog', (req, res) => {
    res.redirect('/')
})
