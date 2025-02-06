const mongoose = require('mongoose')
const logger = require('./log')()

const dbURL = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@nodetut.n6pqp.mongodb.net/blogs-data?retryWrites=true&w=majority`

module.exports = async function () {
    await mongoose
        .connect(dbURL)
        .then(() => {
            logger.info('Database is connected successfully')
        })
        .catch((ex) =>
            logger.error(ex.message, 'Database connection was not successful')
        )
}
