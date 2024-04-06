const logger = require('../../services/log')()
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res)
        } catch (e) {
            logger.error(e.message)
            next(e)
        }
    }
}
