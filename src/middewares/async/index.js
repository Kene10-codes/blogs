const logger = require('../../services/log')()
module.exports = function (handler) {
    return async function (req, res, next) {
        try {
            await handler(req, res)
        } catch (ex) {
            logger.error(ex.message)
            next(ex)
        }
    }
}
