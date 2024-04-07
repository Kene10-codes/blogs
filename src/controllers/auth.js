const bcryptjs = require('bcryptjs')
const User = require('../models/users')
const logger = require('../services/log')()
const { validateLoginUser } = require('../validator/validate')

async function loginUser(req, res) {
    try {
        const { error } = validateLoginUser.validate(req.body)
        if (error) return res.status(500).send(error.details[0].message)
        // CHECK IF USER CREDENTIALS EXISTS
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(500).send('Invalid email or password')

        // COMPARE USER PASSWORD
        const isValid = bcryptjs.compare(req.body.password, user.password)
        if (!isValid) return res.status(500).send('Password is incorrect')

        const token = user.generateToken()
        res.header('x-auth-token', token)
            .status(201)
            .send('User successfully logged in')
    } catch (ex) {
        logger.error(ex.message)
    }
}

module.exports = {
    loginUser,
}
