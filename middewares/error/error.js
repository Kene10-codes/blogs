const logger = require('../../services/log')()

module.exports = function (err, req, res) {
    logger.error(err.message, err)
    res.status(500).send('Somethign went wrong!')
}
