const winston = require('winston')

module.exports = function () {
    // SET UP LOGGER
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.Console({
                colorize: true,
                prettyPrint: true,
            }),
            new winston.transports.File({
                filename: 'error.log',
                level: 'error',
            }),
        ],
    })

    process.on('uncaughtException', (ex) => {
        logger.error(ex.message, ex)
    })

    process.on('unhandledRejection', (ex) => {
        logger.error(ex.message, ex)
    })

    if (process.env.NODE_ENV != 'production') {
        logger.add(
            new winston.transports.Console({
                format: winston.format.simple(),
                colorize: true,
                prettyPrint: true,
            })
        )
    }

    return logger
}
