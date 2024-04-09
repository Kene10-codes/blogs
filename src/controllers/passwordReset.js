const crypto = require('crypto')
const { Token } = require('../models/token')
const { User } = require('../models/users')
const {
    validatePasswordReset,
    validateNewPassword,
} = require('../validator/validate')
const logger = require('../services/log')()
const sendEmail = require('../services/email')

async function passwordReset(req, res) {
    try {
        const { error } = validatePasswordReset.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('Email is not in our database')
        console.log(user)
        const token = await Token.findOne({ userId: user._id })

        if (!token) return res.status(400).send('Token is wrong!')

        token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString('hex'),
        })

        await token.save()

        const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
        sendEmail(user.email, 'Password Reset', link)
    } catch (ex) {
        logger.error(ex.message)
    }
}

async function passwordNewReset(req, res) {
    try {
        const { error } = validateNewPassword.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const user = await User.findById(req.params.userId)
        if (!user) return res.status(400).send('invalid link or expired')

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        })

        if (!token) return res.status(400).send('Invalid link or expired')

        user.password = req.body.password

        await user.save()
        await token.delete()

        res.status(200).send('Password reset was successful')
    } catch (ex) {
        logger.error(ex.message)
    }
}
module.exports = {
    passwordReset,
    passwordNewReset,
}
