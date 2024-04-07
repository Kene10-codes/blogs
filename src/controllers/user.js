const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const User = require('../models/users')
// const asyncMiddleWare = require('../middewares/async')
const { validateUser, validateLoginUser } = require('../validator/validate')
const logger = require('../services/log')()

async function getUsers(req, res) {
    try {
        const user = await User.find()
        if (user.length === 0) res.status(500).send('No user was found')

        res.status(200).send(user)
    } catch (ex) {
        logger.error(ex.message)
    }
}

// REGISTER USER
async function registerUser(req, res) {
    try {
        const { error } = validateUser.validate(req.body)
        if (error) return res.status(500).send(error.details[0].message)

        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) return res.status(500).send('Email exists already!')

        const user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)

        await user.save()

        const token = user.generateToken()
        res.header('x-auth-token', token).status(201).send(user)
    } catch (ex) {
        logger.error(ex.message)
    }
}

module.exports = {
    registerUser,
    getUsers,
}
