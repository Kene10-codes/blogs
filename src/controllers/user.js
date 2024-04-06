const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const asyncMiddleWare = require('../middewares/async')
const User = require('../models/users')
const { validateUser } = require('../validator/validate')

async function registerUser(req, res) {
    try {
        const { error } = validateUser.validate(req.body)
        if (error) return res.status(500).send('Something went wrong!')

        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) return res.status(500).send('Email exists already!')

        const user = new User(_.pick(req.body, ['name', 'email', 'password']))
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)

        await user.save()
    } catch (e) {
        console.log(e)
    }
    // asyncMiddleWare(async (req, res) => {

    // })
}

module.exports = {
    registerUser,
}
